import React from 'react';

export default function Navbar({ userName, onLogout }) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-end">
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-700">{userName}</p>
          <p className="text-xs text-slate-400">Student Profile</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-inner">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}