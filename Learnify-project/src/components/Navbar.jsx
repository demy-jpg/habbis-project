import React, { useState } from 'react';
import { Check, X, RefreshCw } from 'lucide-react';

export default function Navbar({ userName, onSwitchProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      onSwitchProfile(tempName.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempName(userName);
    setIsEditing(false);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-end select-none">
      <div className="flex items-center gap-4">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 shadow-sm transition-all duration-300">
            <input
              type="text"
              required
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter name..."
              className="text-xs font-semibold text-slate-700 bg-transparent border-none outline-none w-28 px-1 focus:ring-0"
              autoFocus
            />
            <button type="submit" className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer">
              <Check size={14} />
            </button>
            <button type="button" onClick={handleCancel} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              <X size={14} />
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <p className="text-sm font-bold text-slate-800">{userName}</p>
                <button 
                  onClick={() => { setTempName(userName); setIsEditing(true); }}
                  title="Switch Profile"
                  className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
                >
                  <RefreshCw size={12} />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase">Student Profile</p>
            </div>
            
            {/* Clickable Profile Avatar */}
            <div 
              onClick={() => { setTempName(userName); setIsEditing(true); }}
              title="Click to Switch Profile"
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-blue-500/20 cursor-pointer hover:scale-105 transition-transform"
            >
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}