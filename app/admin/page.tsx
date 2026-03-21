import { UserRole } from "@prisma/client";
import { ApproveTutorForm } from "@/components/forms/ApproveTutorForm";
import { SectionHeader } from "@/components/SectionHeader";
import { getAdminDashboardData } from "@/lib/data";
import { requireAdmin } from "@/lib/rbac";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<{ role?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  await requireAdmin();
  const { role } = await searchParams;
  const selectedRole = role && role !== "ALL" ? (role as UserRole) : undefined;
  const { users, tutorProfiles, metrics } = await getAdminDashboardData(selectedRole);

  return (
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Users</p>
          <p className="mt-2 text-3xl font-semibold text-white">{metrics.users}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Bookings</p>
          <p className="mt-2 text-3xl font-semibold text-white">{metrics.bookings}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Revenue</p>
          <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(metrics.revenue)}</p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Users"
          description="Filter platform users by role and review associated profile state."
          action={
            <form>
              <select name="role" defaultValue={role ?? "ALL"} className="rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-sm text-white outline-none">
                <option value="ALL">All roles</option>
                <option value="STUDENT">Students</option>
                <option value="TUTOR">Tutors</option>
                <option value="ADMIN">Admins</option>
              </select>
              <button className="ml-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950">Filter</button>
            </form>
          }
        />
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{user.name ?? user.email}</p>
                  <p className="text-sm text-slate-300">{user.email}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200">{user.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader title="Tutor approvals" description="Approve or reject tutor applications through a single boolean state for the MVP." />
        <div className="space-y-3">
          {tutorProfiles.map((profile) => (
            <div key={profile.id} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-white">{profile.user.name}</p>
                <p className="text-sm text-slate-300">{profile.headline}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                  {profile.isApproved ? "Approved" : "Pending"}
                </span>
                <ApproveTutorForm tutorProfileId={profile.id} isApproved={profile.isApproved} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
