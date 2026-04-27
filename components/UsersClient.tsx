"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, PlusCircle, Loader2, UserCheck, UserX, Trash2, ShieldCheck, User } from "lucide-react";

interface UserRow {
  id: string; email: string; name: string; role: string;
  active: boolean; createdAt: string;
  _count: { projects: number };
}

export function UsersClient({ initialUsers, currentUserId }: { initialUsers: UserRow[]; currentUserId: string }) {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState({ name: "", email: "", password: "", role: "USER" });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function toggleActive(id: string, active: boolean) {
    const res = await fetch(`/api/users/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active }) });
    if (res.ok) setUsers(prev => prev.map(u => u.id === id ? { ...u, active } : u));
  }

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true); setError("");
    const res = await fetch("/api/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newForm) });
    if (res.ok) {
      const user = await res.json();
      setUsers(prev => [{ ...user, _count: { projects: 0 } }, ...prev]);
      setShowNew(false); setNewForm({ name: "", email: "", password: "", role: "USER" });
    } else { setError("Failed to create user"); }
    setCreating(false);
  }

  async function deleteUser(id: string) {
    if (!confirm("Delete this user and all their projects?")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) setUsers(prev => prev.filter(u => u.id !== id));
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-violet-400" />
          <div>
            <h1 className="text-white text-xl font-bold">Users</h1>
            <p className="text-slate-400 text-sm">{users.length} accounts</p>
          </div>
        </div>
        <button onClick={() => setShowNew(!showNew)} className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <PlusCircle className="w-4 h-4" /> New User
        </button>
      </div>

      {showNew && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-700 rounded-xl p-5 mb-5">
          <h3 className="text-white font-semibold mb-4">Create New User</h3>
          <form onSubmit={createUser} className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Full Name</label>
              <input required value={newForm.name} onChange={e => setNewForm({ ...newForm, name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Email</label>
              <input type="email" required value={newForm.email} onChange={e => setNewForm({ ...newForm, email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Password</label>
              <input type="password" required value={newForm.password} onChange={e => setNewForm({ ...newForm, password: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Role</label>
              <select value={newForm.role} onChange={e => setNewForm({ ...newForm, role: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option value="USER">User (Planner)</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            {error && <div className="col-span-2 text-red-400 text-xs">{error}</div>}
            <div className="col-span-2 flex gap-2">
              <button type="submit" disabled={creating}
                className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                {creating ? "Creating…" : "Create User"}
              </button>
              <button type="button" onClick={() => setShowNew(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-4 py-3 text-left text-slate-500 text-xs font-semibold uppercase">User</th>
              <th className="px-4 py-3 text-left text-slate-500 text-xs font-semibold uppercase">Role</th>
              <th className="px-4 py-3 text-left text-slate-500 text-xs font-semibold uppercase">Projects</th>
              <th className="px-4 py-3 text-left text-slate-500 text-xs font-semibold uppercase">Status</th>
              <th className="px-4 py-3 text-left text-slate-500 text-xs font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-800 hover:bg-slate-800/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{user.name} {user.id === currentUserId && <span className="text-indigo-400 text-xs">(you)</span>}</p>
                      <p className="text-slate-400 text-xs">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-1 w-fit text-xs px-2 py-0.5 rounded-full font-medium ${user.role === "ADMIN" ? "bg-violet-950 text-violet-400" : "bg-slate-800 text-slate-400"}`}>
                    {user.role === "ADMIN" ? <ShieldCheck className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400 text-sm">{user._count.projects}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${user.active ? "bg-emerald-950 text-emerald-400" : "bg-red-950 text-red-400"}`}>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {user.id !== currentUserId && (
                      <>
                        <button onClick={() => toggleActive(user.id, !user.active)}
                          className={`p-1.5 rounded-lg transition-colors ${user.active ? "text-slate-400 hover:text-amber-400 hover:bg-amber-950/30" : "text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/30"}`}
                          title={user.active ? "Deactivate" : "Activate"}>
                          {user.active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                        <button onClick={() => deleteUser(user.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
