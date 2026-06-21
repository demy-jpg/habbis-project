import React from 'react';
import { CreditCard, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Payments() {
  const history = [
    { invoice: '#INV-4820', date: 'June 01, 2026', desc: 'Premium Academic Access Tier (Monthly)', amount: '$29.00', status: 'Settled' },
    { invoice: '#INV-3104', date: 'May 01, 2026', desc: 'Premium Academic Access Tier (Monthly)', amount: '$29.00', status: 'Settled' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Billing & Payment Invoices</h1>
        <p className="text-sm text-slate-500">Access billing methods, past transaction logs, and receipts.</p>
      </div>

      {/* Credit Card Detail Display Block */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xl max-w-sm flex flex-col justify-between aspect-[1.6/1] border border-slate-700/50">
        <div className="flex justify-between items-start">
          <CreditCard size={28} className="text-blue-400 stroke-[1.5]" />
          <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 bg-slate-700/50 rounded text-slate-300">Active Tier</span>
        </div>
        <div>
          <p className="text-lg font-mono tracking-wider font-semibold">•••• •••• •••• 9402</p>
          <div className="flex justify-between items-end mt-4">
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-medium">Cardholder</p>
              <p className="text-xs font-bold text-slate-200">Treasure Student</p>
            </div>
            <span className="text-xs font-mono text-slate-300">08/29</span>
          </div>
        </div>
      </div>

      {/* Payment Ledger Data List */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 font-bold text-slate-800 text-sm">Invoice Receipt History</div>
        <div className="divide-y divide-slate-100">
          {history.map((h, i) => (
            <div key={i} className="p-4 flex justify-between items-center text-xs font-medium text-slate-600 hover:bg-slate-50/50">
              <div className="space-y-1">
                <p className="font-bold text-slate-800">{h.desc}</p>
                <p className="text-slate-400 text-[10px] font-mono">{h.invoice} • {h.date}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-bold text-slate-900 text-sm">{h.amount}</p>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-0.5">
                  <CheckCircle2 size={10} /> {h.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}