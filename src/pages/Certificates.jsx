import React from 'react';
import { Award, Download, ExternalLink } from 'lucide-react';

function Certificates() {
  const certs = [
    { title: 'Foundational English Grammar Excellence', id: 'LNF-84920', date: 'May 14, 2026' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Academic Certificates</h1>
        <p className="text-sm text-slate-500">Review, verify, and print credentials achieved upon milestone completions.</p>
      </div>

      {certs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((c, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-start gap-5 relative group">
              <div className="p-4 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                <Award size={32} className="stroke-[1.5]" />
              </div>
              <div className="space-y-2 flex-1">
                <div>
                  <h3 className="font-bold text-slate-800 text-base leading-snug">{c.title}</h3>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">ID Reference: {c.id} • Issued {c.date}</p>
                </div>
                <div className="flex gap-4 pt-1 text-xs font-bold text-blue-600">
                  <button className="flex items-center gap-1 hover:underline"><Download size={14} /> PDF Download</button>
                  <button className="flex items-center gap-1 hover:underline text-slate-500"><ExternalLink size={14} /> Verify</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-400 text-sm">
          No certificates earned just yet. Finish a course track to 100% to generate yours.
        </div>
      )}
    </div>
  );
}

// Explicit default export
export default Certificates;