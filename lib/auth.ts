import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getMockUserForRole } from "@/lib/mock-data";
import { isMockMode } from "@/lib/mock-mode";
import { prisma } from "@/lib/prisma";
import { getDefaultRouteForRole } from "@/lib/role-routes";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        if (isMockMode()) {
          const email = credentials.email.toLowerCase();
          const role = email.includes("admin") ? "ADMIN" : email.includes("tutor") ? "TUTOR" : "STUDENT";
          const mockUser = getMockUserForRole(role);

          return {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
            image: mockUser.avatarUrl,
            role: mockUser.role,
          };
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user?.passwordHash) {
          return null;
        }

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatarUrl,
          role: user.role,
        };
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }

      if (isMockMode()) {
        if (!token.role) {
          const email = token.email?.toLowerCase() ?? "";
          token.role = email.includes("admin") ? "ADMIN" : email.includes("tutor") ? "TUTOR" : "STUDENT";
        }

        if (!token.sub) {
          token.sub = getMockUserForRole(token.role ?? "STUDENT").id;
        }

        return token;
      }

      if (!token.role && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { role: true, id: true },
        });

        if (dbUser) {
          token.role = dbUser.role;
          token.sub = dbUser.id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub && token.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      try {
        const redirectUrl = new URL(url);

        if (redirectUrl.origin === baseUrl) {
          return url;
        }
      } catch {}

      return `${baseUrl}${getDefaultRouteForRole("STUDENT")}`;
    },
  },
  events: {
    async createUser({ user }) {
      if (isMockMode()) {
        return;
      }

      await prisma.studentProfile.upsert({
        where: {
          userId: user.id,
        },
        update: {},
        create: {
          userId: user.id,
        },
      });
    },
  },
};

export default NextAuth(authOptions);
