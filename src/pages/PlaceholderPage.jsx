import React from 'react';

export default function PlaceholderPage({ title }) {
  return (
    <div className="max-w-6xl mx-auto h-[60vh] flex flex-col items-center justify-center bg-white border border-dashed border-slate-200 rounded-3xl p-12">
      <h2 className="text-xl font-bold text-slate-800 mb-1">{title} Section</h2>
      <p className="text-sm text-slate-400 max-w-sm text-center">
        This page navigation works correctly! You linked directly to the sub-route successfully.
      </p>
    </div>
  );
}