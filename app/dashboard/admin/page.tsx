import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, FolderOpen, Settings, ShieldCheck, ArrowRight } from "lucide-react";

export default async function AdminPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/dashboard");

  const [totalUsers, totalProjects, compliant, equipment] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.project.count({ where: { compliant: true } }),
    prisma.equipment.count(),
  ]);

  const cards = [
    { href: "/dashboard/admin/users", label: "Users", value: totalUsers, icon: Users, color: "bg-violet-500/10 text-violet-400", desc: "Manage planners & admins" },
    { href: "/dashboard/projects", label: "All Projects", value: totalProjects, icon: FolderOpen, color: "bg-indigo-500/10 text-indigo-400", desc: `${compliant} iHFG compliant` },
    { href: "/dashboard/admin/equipment", label: "Equipment", value: equipment, icon: Settings, color: "bg-emerald-500/10 text-emerald-400", desc: "NUPCO registry items" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="w-6 h-6 text-violet-400" />
        <div>
          <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
          <p className="text-slate-400 text-sm">System management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-5 group transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{card.value.toLocaleString()}</p>
              <p className="text-white font-semibold text-sm">{card.label}</p>
              <p className="text-slate-400 text-xs mt-0.5">{card.desc}</p>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 mt-3 transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
