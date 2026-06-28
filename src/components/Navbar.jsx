import React, { useState } from 'react';
import { Check, X, RefreshCw, LogOut, Menu } from 'lucide-react';

export default function Navbar({ userName, onSwitchProfile, onLogout, onOpenSidebar }) {
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
    <header className="h-16 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between md:justify-end select-none w-full">
      <button 
        onClick={onOpenSidebar}
        title="Open Navigation Menu"
        className="md:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all cursor-pointer mr-auto"
      >
        <Menu size={20} />
      </button>
      <div className="flex items-center gap-4">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 shadow-sm transition-all duration-300">
            <input
              type="text"
              required
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter name..."
              className="text-xs font-semibold text-slate-700 bg-transparent border-none outline-none w-24 md:w-28 px-1 focus:ring-0"
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
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="text-right max-w-[120px] md:max-w-none">
                <div className="flex items-center gap-1 md:gap-1.5 justify-end">
                  <p className="text-xs md:text-sm font-bold text-slate-800 truncate">{userName}</p>
                  <button 
                    onClick={() => { setTempName(userName); setIsEditing(true); }}
                    title="Switch Profile"
                    className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
                  >
                    <RefreshCw size={12} />
                  </button>
                </div>
                <p className="text-[9px] md:text-[10px] text-slate-400 font-semibold tracking-wide uppercase">Student Profile</p>
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

            {/* Logout / Login Again button */}
            <button
              onClick={onLogout}
              title="Logout & Login Again"
              className="p-2 border border-slate-100 hover:border-red-100 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-sm hover:shadow active:scale-95"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}