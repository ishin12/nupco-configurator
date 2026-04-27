import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Building2, PlusCircle, ArrowRight, CheckCircle, AlertTriangle, Clock } from "lucide-react";

export default async function ProjectsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const isAdmin = session.user.role === "ADMIN";
  const where = isAdmin ? {} : { userId: session.user.id };

  const projects = await prisma.project.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: { user: { select: { name: true } } },
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold">Projects</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {isAdmin ? `${projects.length} total projects` : `${projects.length} your projects`}
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <PlusCircle className="w-4 h-4" /> New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-16 text-center">
          <Building2 className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h2 className="text-white font-semibold text-lg mb-2">No projects yet</h2>
          <p className="text-slate-400 text-sm mb-6">Create your first hospital room configuration</p>
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> Create Project
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {projects.map((proj) => (
            <Link
              key={proj.id}
              href={`/dashboard/projects/${proj.id}`}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 bg-indigo-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-white font-semibold truncate">{proj.name}</h3>
                    {proj.compliant ? (
                      <span className="flex items-center gap-1 bg-emerald-950 text-emerald-400 text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                        <CheckCircle className="w-3 h-3" /> iHFG
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-red-950/50 text-red-400 text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                        <AlertTriangle className="w-3 h-3" /> Non-Compliant
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mt-0.5">
                    {proj.roomType} · {proj.budget.toLocaleString()} SAR
                    {isAdmin && ` · ${proj.user?.name}`}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-slate-500 text-xs">
                    <Clock className="w-3 h-3" />
                    {new Date(proj.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  proj.status === "Completed" ? "bg-emerald-950 text-emerald-400" :
                  proj.status === "In Progress" ? "bg-amber-950 text-amber-400" :
                  "bg-slate-800 text-slate-400"
                }`}>{proj.status}</span>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
