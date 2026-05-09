"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Building2, ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { IHFG } from "@/lib/registry";
import Link from "next/link";

const BUDGETS = [
  { label: "100k", value: 100000 },
  { label: "250k", value: 250000 },
  { label: "500k", value: 500000 },
  { label: "750k", value: 750000 },
  { label: "1M", value: 1000000 },
  { label: "2M", value: 2000000 },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    roomType: "",
    purpose: "",
    budget: "250000",
  });

  const std = form.roomType ? IHFG[form.roomType] : null;
  const canSubmit = form.name && form.roomType && form.purpose && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, budget: parseInt(form.budget) }),
    });

    if (res.ok) {
      const project = await res.json();
      router.push(`/dashboard/projects/${project.id}`);
    } else {
      setLoading(false);
      alert("Failed to create project. Please try again.");
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link
        href="/dashboard/projects"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-400" /> New Room Configuration
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Define your clinical requirements. AI will generate an iHFG-compliant room layout.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">Project Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. King Fahad Hospital – Dental Wing"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">Room Type</label>
            <select
              value={form.roomType}
              onChange={(e) => setForm({ ...form, roomType: e.target.value })}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="">Select room type...</option>
              {Object.keys(IHFG).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {std && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 flex items-center gap-2 text-emerald-400 text-xs"
              >
                <Building2 className="w-3.5 h-3.5" />
                iHFG: {std.desc} · minimum {std.minArea}m² · {std.items.length} equipment items
              </motion.div>
            )}
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">Clinical Purpose</label>
            <textarea
              value={form.purpose}
              onChange={(e) => setForm({ ...form, purpose: e.target.value })}
              placeholder="Describe the clinical procedures and specialties this room will serve..."
              required
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">Project Budget (SAR)</label>
            <input
              type="number"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              min="1000"
              step="1"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {BUDGETS.map(({ label, value }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setForm({ ...form, budget: String(value) })}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    parseInt(form.budget) === value
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-slate-500 text-xs mt-1">
              {parseInt(form.budget || "0").toLocaleString()} SAR
            </p>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Creating project...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Generate iHFG Room Layout <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
