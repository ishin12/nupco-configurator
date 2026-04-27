"use client";
import { useState, useEffect, useCallback } from "react";
import { Settings, Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface EquipItem { id: string; name: string; cat: string; subcat: string; price: number; active: boolean; }

export function EquipmentAdmin() {
  const [items, setItems] = useState<EquipItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), ...(search ? { search } : {}) });
    const res = await fetch(`/api/equipment?${params}`);
    const data = await res.json();
    setItems(data.items); setTotal(data.total); setPages(data.pages);
    setLoading(false);
  }, [page, search]);

  useEffect(() => { const t = setTimeout(load, 300); return () => clearTimeout(t); }, [load]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-400" />
          <div>
            <h1 className="text-white text-xl font-bold">Equipment Registry</h1>
            <p className="text-slate-400 text-sm">{total.toLocaleString()} items</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name or NUPCO code..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-500"
            />
          </div>
          {loading && <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {["NUPCO Code", "Name", "Category", "Subcategory", "Price (SAR)"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-slate-500 text-xs font-semibold uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-slate-800/60 hover:bg-slate-800/30">
                  <td className="px-4 py-2.5 text-slate-400 font-mono text-xs whitespace-nowrap">{item.id}</td>
                  <td className="px-4 py-2.5 text-slate-200 text-xs">{item.name}</td>
                  <td className="px-4 py-2.5">
                    <span className="bg-indigo-950 text-indigo-300 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">{item.cat}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="bg-emerald-950 text-emerald-300 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">{item.subcat}</span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-400 text-xs">{item.price > 0 ? item.price.toLocaleString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800">
          <p className="text-slate-400 text-xs">Page {page} of {pages} · {total.toLocaleString()} items</p>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-40 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button disabled={page >= pages} onClick={() => setPage(p => p + 1)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-40 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
