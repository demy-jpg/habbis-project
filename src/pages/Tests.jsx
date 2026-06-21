import React from 'react';
import { HelpCircle, Clock, Award } from 'lucide-react';

export default function Tests() {
  const testSchedules = [
    { title: 'Algebra Mid-term Review Exam', subject: 'Mathematics', duration: '45 mins', totalQuestions: 30, score: 'Open' },
    { title: 'Cellular Division Quick Quiz', subject: 'Biology', duration: '20 mins', totalQuestions: 15, score: '88%' },
    { title: 'Thermodynamics Assessment Evaluation', subject: 'Physics', duration: '60 mins', totalQuestions: 40, score: 'Not Started' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Examination Platform</h1>
        <p className="text-sm text-slate-500">Take test assessments and look over your certified scorecards.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testSchedules.map((test, index) => (
          <div key={index} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">{test.subject}</span>
              <h3 className="font-bold text-slate-800 text-base">{test.title}</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-center text-xs text-slate-600 font-medium">
              <div className="flex flex-col items-center gap-1"><Clock size={14} className="text-slate-400" /> {test.duration}</div>
              <div className="flex flex-col items-center gap-1"><HelpCircle size={14} className="text-slate-400" /> {test.totalQuestions} Qs</div>
              <div className="flex flex-col items-center gap-1"><Award size={14} className="text-slate-400" /> {test.score}</div>
            </div>

            <button className={`w-full text-xs font-semibold py-2.5 rounded-xl transition-all ${
              test.score === 'Open' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-500 cursor-not-allowed'
            }`}>
              {test.score === 'Open' ? 'Begin Examination Now' : test.score.includes('%') ? 'View Exam Breakdown' : 'Exam Locked'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}