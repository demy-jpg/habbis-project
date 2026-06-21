import React, { useState } from 'react';
import { Play, CheckCircle, Lock } from 'lucide-react';

export default function Lessons() {
  const videoModules = [
    { id: 1, title: 'Introduction to Linear Equations', duration: '14:20', status: 'completed' },
    { id: 2, title: 'Graphing Linear Functions & Slopes', duration: '22:15', status: 'current' },
    { id: 3, title: 'Systems of Equations Mastery', duration: '18:45', status: 'locked' },
    { id: 4, title: 'Quadratic Equations Deep Dive', duration: '31:10', status: 'locked' },
  ];
  const [activeVid, setActiveVid] = useState(videoModules[1]);

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Dynamic Main Player Video Area */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-slate-900 aspect-video rounded-2xl flex flex-col items-center justify-center text-white relative group overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          <button className="p-5 bg-blue-600 rounded-full hover:scale-105 transition-transform shadow-xl shadow-blue-600/30">
            <Play size={28} className="fill-current ml-0.5" />
          </button>
          <span className="absolute bottom-4 left-4 text-xs font-mono bg-black/60 px-2 py-1 rounded">Streaming: {activeVid.title}</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{activeVid.title}</h2>
          <p className="text-xs text-slate-400 mt-1">Mathematics Track • Topic 04 • Estimated duration: {activeVid.duration}</p>
        </div>
      </div>

      {/* Structured Modules Timeline */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm h-fit">
        <h3 className="font-bold text-slate-800 mb-3 text-sm">Course Content</h3>
        <div className="space-y-2">
          {videoModules.map((mod) => (
            <button
              key={mod.id}
              disabled={mod.status === 'locked'}
              onClick={() => setActiveVid(mod)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                activeVid.id === mod.id 
                  ? 'bg-blue-50/50 border-blue-200 text-blue-900' 
                  : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
              } ${mod.status === 'locked' && 'opacity-50 cursor-not-allowed'}`}
            >
              <div className="flex items-center gap-3">
                {mod.status === 'completed' && <CheckCircle size={16} className="text-emerald-500" />}
                {mod.status === 'current' && <Play size={16} className="text-blue-600 fill-current" />}
                {mod.status === 'locked' && <Lock size={16} className="text-slate-400" />}
                <div>
                  <p className="text-xs font-semibold max-w-[180px] truncate">{mod.title}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{mod.duration}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}