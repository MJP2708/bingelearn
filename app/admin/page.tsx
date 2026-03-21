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
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Admin Console</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">Platform operations at a glance</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Review users, approve tutors, and monitor marketplace health from one place.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Users</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{metrics.users}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Bookings</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{metrics.bookings}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Revenue</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{formatCurrency(metrics.revenue)}</p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Users"
          description="Filter platform users by role and review associated profile state."
          action={
            <form>
              <select name="role" defaultValue={role ?? "ALL"} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none">
                <option value="ALL">All roles</option>
                <option value="STUDENT">Students</option>
                <option value="TUTOR">Tutors</option>
                <option value="ADMIN">Admins</option>
              </select>
              <button className="ml-3 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Filter</button>
            </form>
          }
        />
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">{user.name ?? user.email}</p>
                  <p className="text-sm text-slate-600">{user.email}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-700">{user.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader title="Tutor approvals" description="Approve or reject tutor applications through a single boolean state for the MVP." />
        <div className="space-y-3">
          {tutorProfiles.map((profile) => (
            <div key={profile.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">{profile.user.name}</p>
                <p className="text-sm text-slate-600">{profile.headline}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
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
