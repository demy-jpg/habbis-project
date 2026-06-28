import React, { useState } from 'react';
import { Award, Download, ExternalLink, X, Printer, ShieldCheck } from 'lucide-react';

export default function Certificates({ certs, userName }) {
  const [activeCert, setActiveCert] = useState(null);

  const handleOpenCertificate = (cert) => {
    setActiveCert(cert);
  };

  const handleClose = () => {
    setActiveCert(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative select-none">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Academic Certificates</h1>
        <p className="text-sm text-slate-500">Review, verify, and print credentials achieved upon milestone completions.</p>
      </div>

      {certs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((c, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-start gap-5 relative group hover:shadow-md transition-all">
              <div className="p-4 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 shadow-inner">
                <Award size={32} className="stroke-[1.5]" />
              </div>
              <div className="space-y-2 flex-1">
                <div>
                  <h3 className="font-bold text-slate-800 text-base leading-snug">{c.title}</h3>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">ID Reference: {c.id} • Issued {c.date}</p>
                </div>
                <div className="flex gap-4 pt-1 text-xs font-bold text-blue-600">
                  <button 
                    onClick={() => handleOpenCertificate(c)}
                    className="flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Download size={14} /> View & Print PDF
                  </button>
                  <button 
                    onClick={() => handleOpenCertificate(c)}
                    className="flex items-center gap-1 hover:underline text-slate-500 cursor-pointer"
                  >
                    <ExternalLink size={14} /> Verify
                  </button>
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

      {/* Certificate Print Preview Modal */}
      {activeCert && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in print:bg-white print:p-0">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-2xl w-full p-6 space-y-6 relative max-h-[95vh] overflow-y-auto print:shadow-none print:border-none print:max-h-full print:p-0">
            {/* Close Button - Hidden in Print */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:bg-slate-100 transition-all cursor-pointer print:hidden"
            >
              <X size={20} />
            </button>

            {/* Certificate Template Card */}
            <div className="border-8 md:border-[12px] border-double border-slate-800 rounded-xl p-4 md:p-8 bg-amber-50/20 flex flex-col justify-between items-center text-center relative overflow-hidden font-serif min-h-[420px] print:border-8">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-slate-800" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-800" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-slate-800" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-slate-800" />

              {/* Header */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">Official Credential Certification</span>
                <h2 className="text-2xl font-bold uppercase tracking-wide text-slate-800 font-serif print:text-xl">Certificate of Achievement</h2>
              </div>

              {/* Recipient */}
              <div className="space-y-1 my-4">
                <p className="text-xs italic text-slate-500">This credential is proudly awarded to</p>
                <h3 className="text-2xl font-black text-slate-900 border-b border-slate-300 pb-1 px-8 font-sans print:text-xl">{userName}</h3>
              </div>

              {/* Body */}
              <div className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed max-w-md font-sans">
                  for demonstrating outstanding academic performance and successfully mastering all syllabus requirements for
                </p>
                <h4 className="text-md font-bold text-blue-800 font-sans tracking-wide">{activeCert.title}</h4>
              </div>

              {/* Footer Credentials */}
              <div className="w-full flex justify-between items-end mt-8 border-t border-slate-200/60 pt-4 font-sans text-[10px] text-slate-500">
                <div className="text-left space-y-1">
                  <p className="font-semibold text-slate-700">Learnify Academic Registry</p>
                  <p>Issue Date: {activeCert.date}</p>
                </div>
                {/* Gold Seal */}
                <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-amber-200/50 relative">
                  <ShieldCheck size={24} className="stroke-[1.5]" />
                </div>
                <div className="text-right space-y-1">
                  <p className="font-mono">{activeCert.id}</p>
                  <p className="text-[9px] uppercase tracking-wide text-emerald-600 font-bold">✓ Verified Status</p>
                </div>
              </div>
            </div>

            {/* Print Dialog Actions - Hidden in Print */}
            <div className="pt-4 border-t border-slate-100 flex gap-3 justify-end print:hidden">
              <button 
                onClick={handleClose}
                className="px-4 py-2 border border-slate-200 text-slate-500 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Close View
              </button>
              <button 
                onClick={handlePrint}
                className="px-6 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-slate-900/10"
              >
                <Printer size={14} /> Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}