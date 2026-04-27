"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Sparkles, CheckCircle, AlertTriangle, RefreshCw,
  MessageSquare, X, Send, Loader2, Save, Trash2, RotateCw,
  Undo2, Info, Database, ChevronDown, ChevronUp
} from "lucide-react";
import Link from "next/link";
import { IHFG, POSITIONS, REGISTRY, matchItem } from "@/lib/registry";

interface LayoutItem {
  id: string; regId: string; name: string;
  x: number; y: number; w: number; h: number; rot: number;
  qty: number; price: number; status: string; inReg: boolean;
  cat: string; subcat: string; critical: boolean; code: string; reasoning: string;
}

interface Layout {
  items: LayoutItem[];
  budget: { allocated: number; used: number; pct: number };
  compliance: { std: string; minArea: number; pct: number; ok: boolean };
  issues: { sev: string; msg: string }[];
}

interface Project {
  id: string; name: string; roomType: string; purpose: string;
  budget: number; status: string; compliant: boolean; layoutJson: unknown;
}

interface ChatMsg { role: "user" | "assistant"; content: string; }

function recalc(items: LayoutItem[], allocated: number) {
  const used = items.reduce((s, i) => s + (i.price || 0) * i.qty, 0);
  return { allocated, used, pct: allocated > 0 ? (used / allocated) * 100 : 0 };
}

function generateLayout(proj: Project): Layout {
  const std = IHFG[proj.roomType];
  if (!std) throw new Error("Unknown room type");
  const pos = POSITIONS[proj.roomType] || [];
  const allocated = proj.budget || 250000;

  const items: LayoutItem[] = std.items.map((req, i) => {
    const found = matchItem(req.name, req.subcat);
    const p = pos[i] || { x: 22 + (i % 5) * 110, y: 340 + Math.floor(i / 5) * 58, w: 90, h: 52 };
    if (found) {
      return { id: "i" + i, regId: found.id, name: found.name, x: p.x, y: p.y, w: p.w, h: p.h, rot: 0, qty: req.qty, price: 0, status: "Active", inReg: true, cat: found.cat, subcat: found.subcat, critical: req.critical, code: req.code, reasoning: req.reasoning };
    }
    return { id: "i" + i, regId: "NOT-IN-REGISTRY", name: req.name, x: p.x, y: p.y, w: p.w, h: p.h, rot: 0, qty: req.qty, price: 0, status: "Missing", inReg: false, cat: "", subcat: req.subcat || "", critical: req.critical, code: req.code, reasoning: req.reasoning };
  });

  const critItems = items.filter((i) => i.critical);
  const critOk = critItems.filter((i) => i.inReg);
  const pct = critItems.length > 0 ? (critOk.length / critItems.length) * 100 : 100;

  const issues = items.reduce((acc: Layout["issues"], item) => {
    if (!item.inReg && item.critical) acc.push({ sev: "critical", msg: `${item.name} required by iHFG (${item.code}) but not found in NUPCO registry.` });
    else if (!item.inReg) acc.push({ sev: "warning", msg: `${item.name} recommended by iHFG but not matched in registry.` });
    return acc;
  }, []);

  return { items, budget: recalc(items, allocated), compliance: { std: std.desc, minArea: std.minArea, pct, ok: pct >= 100 }, issues };
}

export function RoomConfigurator({ project, sessionRole }: { project: Project; sessionRole: string }) {
  const router = useRouter();
  const [layout, setLayout] = useState<Layout | null>(() => {
    if (project.layoutJson) return project.layoutJson as Layout;
    return null;
  });
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const [selected, setSelected] = useState<LayoutItem | null>(null);
  const [dragging, setDragging] = useState<LayoutItem | null>(null);
  const [dragOff, setDragOff] = useState({ x: 0, y: 0 });
  const [removed, setRemoved] = useState<LayoutItem | null>(null);
  const undoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [chatIn, setChatIn] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [showRegistry, setShowRegistry] = useState(false);
  const [regSearch, setRegSearch] = useState("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const autoSave = useCallback(async (l: Layout) => {
    setSaved(false);
    setSaving(true);
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: project.name, roomType: project.roomType, purpose: project.purpose,
          budget: l.budget.allocated, status: "In Progress", compliant: l.compliance.ok,
          layoutJson: l,
        }),
      });
      setSaved(true);
    } finally { setSaving(false); }
  }, [project.id, project.name, project.roomType, project.purpose]);

  useEffect(() => {
    if (!layout) return;
    const t = setTimeout(() => autoSave(layout), 1500);
    return () => clearTimeout(t);
  }, [layout, autoSave]);

  async function generate() {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 800));
    try {
      const l = generateLayout(project);
      setLayout(l);
    } catch (e) { alert(String(e)); }
    finally { setGenerating(false); }
  }

  function onMD(item: LayoutItem, e: React.MouseEvent) {
    if (!svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    setDragging(item);
    setDragOff({ x: e.clientX - r.left - item.x, y: e.clientY - r.top - item.y });
    setSelected(item);
  }

  function onMM(e: React.MouseEvent) {
    if (!dragging || !svgRef.current || !layout) return;
    const r = svgRef.current.getBoundingClientRect();
    const x = Math.max(20, Math.min(e.clientX - r.left - dragOff.x, 560 - dragging.w));
    const y = Math.max(20, Math.min(e.clientY - r.top - dragOff.y, 385 - dragging.h));
    setLayout((prev) => prev ? { ...prev, items: prev.items.map((i) => i.id === dragging.id ? { ...i, x, y } : i) } : prev);
  }

  function onMU() { setDragging(null); }

  function rotateItem(id: string) {
    setLayout((prev) => prev ? { ...prev, items: prev.items.map((i) => i.id === id ? { ...i, rot: (i.rot + 90) % 360 } : i) } : prev);
  }

  function removeItem(id: string) {
    if (!layout) return;
    const item = layout.items.find((i) => i.id === id);
    if (!item) return;
    setRemoved(item);
    setSelected(null);
    setLayout((prev) => {
      if (!prev) return prev;
      const items = prev.items.filter((i) => i.id !== id);
      return { ...prev, items, budget: recalc(items, prev.budget.allocated) };
    });
    if (undoTimer.current) clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => setRemoved(null), 5000);
  }

  function undoRemove() {
    if (!removed || !layout) return;
    setLayout((prev) => {
      if (!prev) return prev;
      const items = [...prev.items, removed];
      return { ...prev, items, budget: recalc(items, prev.budget.allocated) };
    });
    setRemoved(null);
    if (undoTimer.current) clearTimeout(undoTimer.current);
  }

  async function sendChat() {
    if (!chatIn.trim() || chatLoading || !layout) return;
    const userMsg = chatIn.trim();
    setChatIn("");
    const newMsgs: ChatMsg[] = [...msgs, { role: "user", content: userMsg }];
    setMsgs(newMsgs);
    setChatLoading(true);

    const context = {
      roomType: project.roomType, purpose: project.purpose,
      budget: layout.budget, compliance: layout.compliance,
      items: layout.items.map((i) => ({ name: i.name, regId: i.regId, critical: i.critical, inReg: i.inReg, qty: i.qty })),
    };

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMsgs, context }),
    });

    const data = await res.json();
    const reply = data.reply as string;

    // Parse ADD: commands from AI reply
    const addMatch = reply.match(/ADD:\s*([^\n.]+)/i);
    if (addMatch) {
      const itemName = addMatch[1].trim().toUpperCase();
      const found = REGISTRY.find((r) => r.name.includes(itemName) || itemName.includes(r.name.split(" ")[0]));
      if (found) {
        const ni: LayoutItem = {
          id: "chat-" + Date.now(), regId: found.id, name: found.name,
          x: 60 + Math.random() * 380, y: 60 + Math.random() * 220,
          w: 90, h: 65, rot: 0, qty: 1, price: 0, status: "Active",
          inReg: true, cat: found.cat, subcat: found.subcat,
          critical: false, code: "", reasoning: "Added via AI assistant",
        };
        setLayout((prev) => {
          if (!prev) return prev;
          const items = [...prev.items, ni];
          return { ...prev, items, budget: recalc(items, prev.budget.allocated) };
        });
      }
    }

    setMsgs([...newMsgs, { role: "assistant", content: reply }]);
    setChatLoading(false);
  }

  const filteredReg = REGISTRY.filter((r) =>
    !regSearch || r.name.toLowerCase().includes(regSearch.toLowerCase()) || r.id.includes(regSearch)
  ).slice(0, 200);

  function itemFill(item: LayoutItem) { return !item.inReg ? "#450a0a" : item.critical ? "#1e1b4b" : "#0c1a2e"; }
  function itemStroke(item: LayoutItem) { return !item.inReg ? "#ef4444" : item.critical ? "#818cf8" : "#3b82f6"; }

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/projects" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">{project.name}</h1>
            <p className="text-slate-400 text-xs mt-0.5">{project.roomType} · {project.purpose.slice(0, 60)}{project.purpose.length > 60 ? "…" : ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs">
            <div className={`w-2 h-2 rounded-full ${saving ? "bg-yellow-400" : "bg-emerald-400"}`} />
            <span className={saving ? "text-yellow-400" : "text-emerald-400"}>{saving ? "Saving…" : "Saved"}</span>
          </div>
          <button onClick={() => setShowRegistry(!showRegistry)} className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors">
            <Database className="w-3.5 h-3.5" /> Registry
          </button>
        </div>
      </div>

      {!layout ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center"
        >
          <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-white font-bold text-xl mb-2">Generate Room Layout</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Click generate to create an iHFG-compliant equipment layout for your {project.roomType}.
          </p>
          <button
            onClick={generate}
            disabled={generating}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {generating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating…</> : <><Sparkles className="w-5 h-5" /> Generate with iHFG Standards</>}
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className={`rounded-xl p-4 border ${layout.compliance.ok ? "bg-emerald-950/30 border-emerald-800" : "bg-red-950/30 border-red-800"}`}>
              <div className="flex items-center gap-2 mb-1">
                {layout.compliance.ok ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-red-400" />}
                <span className={`text-xs font-semibold ${layout.compliance.ok ? "text-emerald-400" : "text-red-400"}`}>
                  {layout.compliance.ok ? "COMPLIANT" : "NON-COMPLIANT"}
                </span>
              </div>
              <p className="text-white font-bold text-xl">{layout.compliance.pct.toFixed(0)}%</p>
              <p className="text-slate-400 text-xs">iHFG Score</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-slate-400 text-xs mb-1">Budget Used</p>
              <p className={`text-xl font-bold ${layout.budget.pct > 100 ? "text-red-400" : "text-white"}`}>
                {layout.budget.pct.toFixed(1)}%
              </p>
              <p className="text-slate-500 text-xs">{layout.budget.used.toLocaleString()} SAR</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-slate-400 text-xs mb-1">Equipment Items</p>
              <p className="text-xl font-bold text-white">{layout.items.length}</p>
              <p className="text-slate-500 text-xs">{layout.items.filter((i) => i.inReg).length} in registry</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-slate-400 text-xs mb-1">Min Area</p>
              <p className="text-xl font-bold text-white">{layout.compliance.minArea}m²</p>
              <p className="text-slate-500 text-xs">{layout.compliance.std}</p>
            </div>
          </div>

          {/* Budget bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Budget: {layout.budget.allocated.toLocaleString()} SAR</span>
              <span>Used: {layout.budget.used.toLocaleString()} SAR · Remaining: {(layout.budget.allocated - layout.budget.used).toLocaleString()} SAR</span>
            </div>
            <div className="bg-slate-800 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(layout.budget.pct, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-2 rounded-full ${layout.budget.pct > 100 ? "bg-red-500" : layout.budget.pct > 80 ? "bg-amber-500" : "bg-emerald-500"}`}
              />
            </div>
          </div>

          {/* Issues */}
          {layout.issues.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <h3 className="text-white font-semibold text-sm mb-2">Compliance Issues</h3>
              {layout.issues.map((iss, i) => (
                <div key={i} className={`flex gap-2 p-2.5 rounded-lg text-xs ${iss.sev === "critical" ? "bg-red-950/40 border border-red-800 text-red-300" : "bg-amber-950/40 border border-amber-800 text-amber-300"}`}>
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  {iss.msg}
                </div>
              ))}
            </div>
          )}

          {/* Floor plan + chat */}
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-sm">Floor Plan</h3>
                <div className="flex gap-2">
                  <button onClick={generate} disabled={generating} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg transition-colors">
                    <RefreshCw className="w-3 h-3" /> Regenerate
                  </button>
                  <button onClick={() => setShowChat(!showChat)} className="flex items-center gap-1.5 text-xs bg-indigo-700 hover:bg-indigo-600 text-white px-2.5 py-1.5 rounded-lg transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" /> AI Chat
                  </button>
                </div>
              </div>

              {removed && (
                <div className="flex items-center justify-between bg-amber-950/40 border border-amber-800 rounded-lg px-3 py-2 mb-3">
                  <span className="text-amber-300 text-xs">Removed: {removed.name}</span>
                  <button onClick={undoRemove} className="flex items-center gap-1 text-xs bg-amber-600 hover:bg-amber-500 text-white px-2 py-1 rounded">
                    <Undo2 className="w-3 h-3" /> Undo
                  </button>
                </div>
              )}

              <svg
                ref={svgRef}
                viewBox="0 0 600 410"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 select-none"
                style={{ cursor: dragging ? "grabbing" : "default" }}
                onMouseMove={onMM}
                onMouseUp={onMU}
                onMouseLeave={onMU}
              >
                <rect x="18" y="18" width="564" height="374" fill="none" stroke="#334155" strokeWidth="4" rx="3" />
                {[100, 200, 300, 400, 500].map((x) => <line key={"gx" + x} x1={x} y1="18" x2={x} y2="392" stroke="#1e293b" strokeWidth="1" />)}
                {[100, 200, 300].map((y) => <line key={"gy" + y} x1="18" y1={y} x2="582" y2={y} stroke="#1e293b" strokeWidth="1" />)}
                <text x="30" y="36" fill="#475569" fontSize="9" fontWeight="600">{project.roomType.toUpperCase()}</text>

                {layout.items.map((item) => {
                  const fill = itemFill(item);
                  const stroke = itemStroke(item);
                  const isSelected = selected?.id === item.id;
                  const words = item.name.split(" ");
                  const l1 = words.slice(0, 2).join(" ");
                  const l2 = words.length > 2 ? words.slice(2, 4).join(" ") : "";
                  return (
                    <g key={item.id}
                      transform={`rotate(${item.rot}, ${item.x + item.w / 2}, ${item.y + item.h / 2})`}
                      onMouseDown={(e) => { e.preventDefault(); onMD(item, e); }}
                      style={{ cursor: "grab" }}
                    >
                      <rect x={item.x} y={item.y} width={item.w} height={item.h} rx="4" fill={fill} stroke={isSelected ? "#f59e0b" : stroke} strokeWidth={isSelected ? 2.5 : 1.5} />
                      <rect x={item.x} y={item.y} width={3} height={item.h} fill={stroke} rx="2" />
                      <text x={item.x + item.w / 2 + 2} y={item.y + item.h / 2 + (l2 ? 3 : -1)} textAnchor="middle" fill="#e2e8f0" fontSize="6" fontWeight="600">{l1}</text>
                      {l2 && <text x={item.x + item.w / 2 + 2} y={item.y + item.h / 2 + 10} textAnchor="middle" fill="#94a3b8" fontSize="5">{l2}</text>}
                      {item.critical && <circle cx={item.x + item.w - 6} cy={item.y + 6} r="3" fill="#818cf8" />}
                      {!item.inReg && <circle cx={item.x + item.w - 6} cy={item.y + 6} r="3" fill="#f87171" />}
                    </g>
                  );
                })}
              </svg>

              <div className="flex gap-4 mt-3 text-xs text-slate-500">
                {[["#1e1b4b", "#818cf8", "Critical"], ["#0c1a2e", "#3b82f6", "Standard"], ["#450a0a", "#ef4444", "Not in Registry"]].map(([fill, stroke, label]) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-4 h-3 rounded-sm border" style={{ background: fill, borderColor: stroke }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment list / Chat panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
              <div className="flex border-b border-slate-800">
                <button onClick={() => setShowChat(false)} className={`flex-1 text-xs font-medium py-2.5 transition-colors ${!showChat ? "text-white bg-slate-800" : "text-slate-400 hover:text-white"}`}>
                  Equipment ({layout.items.length})
                </button>
                <button onClick={() => setShowChat(true)} className={`flex-1 text-xs font-medium py-2.5 transition-colors flex items-center justify-center gap-1.5 ${showChat ? "text-white bg-slate-800" : "text-slate-400 hover:text-white"}`}>
                  <Sparkles className="w-3 h-3" /> AI Chat
                </button>
              </div>

              {!showChat ? (
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {layout.items.map((item) => (
                    <div key={item.id}>
                      <div
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${selected?.id === item.id ? "bg-slate-700" : "hover:bg-slate-800"}`}
                        onClick={() => { setSelected(selected?.id === item.id ? null : item); setExpandedItem(expandedItem === item.id ? null : item.id); }}
                      >
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: itemStroke(item) }} />
                        <span className="text-slate-200 text-xs flex-1 truncate">{item.name}</span>
                        {!item.inReg && <span className="text-red-400 text-xs">!</span>}
                        {item.critical && <span className="text-indigo-400 text-xs">★</span>}
                        <div className="flex gap-1">
                          <button onClick={(e) => { e.stopPropagation(); rotateItem(item.id); }} className="text-slate-500 hover:text-white p-0.5" title="Rotate">
                            <RotateCw className="w-3 h-3" />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); removeItem(item.id); }} className="text-slate-500 hover:text-red-400 p-0.5" title="Remove">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        {expandedItem === item.id ? <ChevronUp className="w-3 h-3 text-slate-500" /> : <ChevronDown className="w-3 h-3 text-slate-500" />}
                      </div>
                      <AnimatePresence>
                        {expandedItem === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 pb-2 ml-4 text-xs text-slate-400 space-y-1 border-l border-slate-700 mt-1">
                              <p><span className="text-slate-500">Code:</span> {item.regId}</p>
                              <p><span className="text-slate-500">Category:</span> {item.cat} / {item.subcat}</p>
                              {item.reasoning && <p className="text-slate-500 leading-relaxed">{item.reasoning}</p>}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {msgs.length === 0 && (
                      <div className="text-center py-6">
                        <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                        <p className="text-slate-400 text-xs">Ask me about your room configuration</p>
                        <div className="mt-3 space-y-1.5">
                          {["What critical items are missing?", "Show budget summary", "Suggest improvements"].map((q) => (
                            <button key={q} onClick={() => setChatIn(q)} className="block w-full text-left text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors">{q}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {msgs.map((m, i) => (
                      <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-200"}`}>
                          {m.content}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-800 rounded-xl px-3 py-2">
                          <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                        </div>
                      </div>
                    )}
                    <div ref={chatEnd} />
                  </div>
                  <div className="p-2 border-t border-slate-800 flex gap-2">
                    <input
                      value={chatIn}
                      onChange={(e) => setChatIn(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
                      placeholder="Ask about equipment..."
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button onClick={sendChat} disabled={chatLoading || !chatIn.trim()} className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white p-2 rounded-lg transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Registry modal */}
      <AnimatePresence>
        {showRegistry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRegistry(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                <div>
                  <h2 className="text-white font-bold">NUPCO Equipment Registry</h2>
                  <p className="text-slate-400 text-xs mt-0.5">{REGISTRY.length.toLocaleString()} items</p>
                </div>
                <button onClick={() => setShowRegistry(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-4 py-3 border-b border-slate-800">
                <input
                  type="text"
                  placeholder="Search name or NUPCO code..."
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-slate-950">
                    <tr>
                      {["NUPCO Code", "Name", "Category", "Subcategory"].map((h) => (
                        <th key={h} className="px-4 py-2.5 text-left text-slate-500 text-xs font-semibold uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReg.map((item) => (
                      <tr key={item.id} className="border-t border-slate-800 hover:bg-slate-800/50">
                        <td className="px-4 py-2 text-slate-400 font-mono text-xs">{item.id}</td>
                        <td className="px-4 py-2 text-slate-200 text-xs">{item.name}</td>
                        <td className="px-4 py-2"><span className="bg-indigo-950 text-indigo-300 text-xs px-2 py-0.5 rounded-full">{item.cat}</span></td>
                        <td className="px-4 py-2"><span className="bg-emerald-950 text-emerald-300 text-xs px-2 py-0.5 rounded-full">{item.subcat}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
