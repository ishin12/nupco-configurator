import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Building2, FolderOpen, CheckCircle, AlertTriangle, PlusCircle, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const isAdmin = session.user.role === "ADMIN";
  const where = isAdmin ? {} : { userId: session.user.id };

  const [totalProjects, compliant, inProgress, recentProjects] = await Promise.all([
    prisma.project.count({ where }),
    prisma.project.count({ where: { ...where, compliant: true } }),
    prisma.project.count({ where: { ...where, status: "In Progress" } }),
    prisma.project.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: { user: { select: { name: true } } },
    }),
  ]);

  const stats = [
    { label: "Total Projects", value: totalProjects, icon: FolderOpen, color: "bg-indigo-500/10 text-indigo-400" },
    { label: "iHFG Compliant", value: compliant, icon: CheckCircle, color: "bg-emerald-500/10 text-emerald-400" },
    { label: "In Progress", value: inProgress, icon: Building2, color: "bg-amber-500/10 text-amber-400" },
    { label: "Non-Compliant", value: totalProjects - compliant, icon: AlertTriangle, color: "bg-red-500/10 text-red-400" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">
          Welcome back, {session.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {isAdmin ? "Administrator view — all projects visible" : "Your hospital room configurations"}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Recent Projects</h2>
              <Link href="/dashboard/projects" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {recentProjects.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No projects yet</p>
                <Link
                  href="/dashboard/projects/new"
                  className="inline-flex items-center gap-1.5 mt-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                >
                  <PlusCircle className="w-4 h-4" /> Create your first project
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {recentProjects.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/dashboard/projects/${proj.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-indigo-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate">{proj.name}</p>
                        <p className="text-slate-500 text-xs">{proj.roomType} {isAdmin && `· ${proj.user?.name}`}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {proj.compliant && (
                        <span className="bg-emerald-950 text-emerald-400 text-xs px-2 py-0.5 rounded-full">iHFG</span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        proj.status === "Completed" ? "bg-emerald-950 text-emerald-400" :
                        proj.status === "In Progress" ? "bg-amber-950 text-amber-400" :
                        "bg-slate-800 text-slate-400"
                      }`}>{proj.status}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-white font-semibold mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/dashboard/projects/new"
                className="flex items-center gap-3 w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-sm font-medium"
              >
                <PlusCircle className="w-4 h-4" /> New Room Configuration
              </Link>
              <Link
                href="/dashboard/projects"
                className="flex items-center gap-3 w-full p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300 text-sm font-medium"
              >
                <FolderOpen className="w-4 h-4" /> All Projects
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-white font-semibold mb-2">iHFG Standards</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              All room configurations follow the Australasian Health Facility Guidelines (iHFG),
              ensuring clinical safety and regulatory compliance for Saudi healthcare facilities.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-1.5 text-xs">
              {["Dental Clinic", "Operating Room", "ICU", "NICU", "Emergency Room", "Outpatient Ward"].map((t) => (
                <span key={t} className="bg-slate-800 text-slate-400 px-2 py-1 rounded text-center">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
