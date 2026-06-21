import React, { useState } from 'react';
import { User, Bell, Shield } from 'lucide-react';

export default function Settings({ user, setUser }) {
  const [nameField, setNameField] = useState(user.name);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ ...user, name: nameField });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-sm text-slate-500">Control system configuration fields and user interface profile parameters.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800 pb-2 border-b border-slate-100">
            <User size={16} className="text-blue-600" /> Account Identity Information
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Display Profile Name</label>
            <input
              type="text"
              value={nameField}
              onChange={(e) => setNameField(e.target.value)}
              className="w-full max-w-md px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <p className="text-[11px] text-slate-400 mt-1.5">Changing this updates greeting strings in your dashboard navigation tabs instantly.</p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-5 rounded-xl shadow-sm transition-colors">
              Save Preferences
            </button>
            {saved && <span className="text-xs font-semibold text-emerald-600 animate-fade-in">✓ Profile logs updated successfully!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}