import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ArrowUpRight, X, Sparkles } from 'lucide-react';

export default function Payments({ invoices, onAddInvoice, isPremium, onTogglePremium }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpenCheckout = () => {
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setShowCheckout(true);
    setIsProcessing(false);
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.substring(i, i + 4));
    }
    setCardNumber(parts.join(' '));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 4);
    if (value.length > 2) {
      setCardExpiry(value.substring(0, 2) + '/' + value.substring(2));
    } else {
      setCardExpiry(value);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCardCvv(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing gateway
    setTimeout(() => {
      onAddInvoice({
        invoice: `#INV-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
        desc: 'Premium Academic Access Tier (Monthly)',
        amount: '$29.00',
        status: 'Settled'
      });
      onTogglePremium(true);
      setIsProcessing(false);
      setShowCheckout(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative select-none">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Billing & Payment Invoices</h1>
        <p className="text-sm text-slate-500">Access billing methods, past transaction logs, and receipts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Credit Card Detail Display Block */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xl w-full max-w-sm flex flex-col justify-between aspect-[1.6/1] border border-slate-700/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none" />
            <div className="flex justify-between items-start">
              <CreditCard size={28} className="text-blue-400 stroke-[1.5]" />
              <span className={`text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded ${
                isPremium ? 'bg-blue-600 text-white font-bold' : 'bg-slate-700/50 text-slate-300'
              }`}>
                {isPremium ? '★ Premium Tier' : 'Free Trial Tier'}
              </span>
            </div>
            <div>
              <p className="text-lg font-mono tracking-wider font-semibold">
                {isPremium ? '•••• •••• •••• 9402' : '•••• •••• •••• ••••'}
              </p>
              <div className="flex justify-between items-end mt-4">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-medium">Cardholder</p>
                  <p className="text-xs font-bold text-slate-200">
                    {isPremium ? 'Treasure Student' : 'Card Not Registered'}
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-300">{isPremium ? '08/29' : 'MM/YY'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isPremium ? (
              <button 
                onClick={handleOpenCheckout}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles size={14} /> Upgrade to Premium ($29/mo)
              </button>
            ) : (
              <button 
                onClick={() => onTogglePremium(false)}
                className="px-5 py-3 border border-red-200 text-red-500 hover:bg-red-50 font-semibold text-xs rounded-xl transition-all cursor-pointer"
              >
                Cancel Premium Subscription
              </button>
            )}
          </div>
        </div>

        {/* Upgrade Callout (if free) */}
        {!isPremium && (
          <div className="bg-gradient-to-tr from-blue-50/50 to-indigo-50/50 border border-blue-100 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-blue-900 text-sm flex items-center gap-1.5">
              <Sparkles size={16} className="text-blue-600" /> Unlock Premium Learning Benefits
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlock access to verified academic certificate printing, homework grading credentials, priority examination scorecards, and a full math curriculum.
            </p>
            <ul className="text-xs font-semibold text-blue-800 space-y-1.5">
              <li className="flex items-center gap-1.5">✓ Printable Completion Certificates</li>
              <li className="flex items-center gap-1.5">✓ Advanced Science & Physics Mock Tests</li>
              <li className="flex items-center gap-1.5">✓ Priority Grade Reviews on Assignments</li>
            </ul>
          </div>
        )}
      </div>

      {/* Payment Ledger Data List */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 font-bold text-slate-800 text-sm">Invoice Receipt History</div>
        <div className="divide-y divide-slate-100">
          {invoices.map((h, i) => (
            <div key={i} className="p-4 flex justify-between items-center text-xs font-medium text-slate-600 hover:bg-slate-50/50 transition-colors">
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

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full p-6 space-y-5 relative">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">Secure Billing Checkout</h3>
              <p className="text-xs text-slate-400">Upgrade to Premium Subscription for $29.00 / month.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">Cardholder Name</label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Treasure Student"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">Card Number</label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="4000 1234 5678 9010"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">Expiration (MM/YY)</label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    placeholder="08/29"
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">CVV</label>
                  <input
                    type="password"
                    required
                    value={cardCvv}
                    onChange={handleCvvChange}
                    placeholder="•••"
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3 justify-end">
                <button 
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-slate-200 text-slate-500 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-md shadow-blue-500/10"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authorizing Gateway...
                    </>
                  ) : 'Upgrade & Charge $29.00'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}