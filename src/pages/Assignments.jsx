import React, { useState } from 'react';
import { Calendar, FileText, CheckCircle2, Upload, X, Clock } from 'lucide-react';

export default function Assignments({ assignments, onUpdateAssignment }) {
  const [activeTask, setActiveTask] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenSubmit = (task) => {
    setActiveTask(task);
    setSubmissionText('');
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setActiveTask(null);
    setSubmissionText('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      onUpdateAssignment(activeTask.id, {
        status: 'Submitted (Pending Grade)',
        due: 'Submitted',
        type: 'pending'
      });
      setIsSubmitting(false);
      setActiveTask(null);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Assignments Workspace</h1>
        <p className="text-sm text-slate-500">Track task assignment timelines and review instructor grades.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {assignments.map((task) => (
            <div key={task.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex gap-4 items-start">
                <div className={`p-3 rounded-xl h-fit ${
                  task.type === 'urgent' 
                    ? 'bg-red-50 text-red-600' 
                    : task.type === 'done' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : task.type === 'pending'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-blue-50 text-blue-600'
                }`}>
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{task.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{task.course}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end text-xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-500"><Calendar size={14} /> {task.due}</span>
                <span className={`px-3 py-1 rounded-full font-semibold ${
                  task.type === 'urgent' 
                    ? 'bg-red-100 text-red-700' 
                    : task.type === 'done' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : task.type === 'pending'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-blue-100 text-blue-700'
                }`}>{task.status}</span>
                
                {task.type === 'done' ? (
                  <div className="flex items-center gap-1 text-emerald-600 font-bold px-3 py-2 bg-emerald-50 rounded-xl">
                    <CheckCircle2 size={14} /> Completed
                  </div>
                ) : task.type === 'pending' ? (
                  <div className="flex items-center gap-1 text-amber-600 font-bold px-3 py-2 bg-amber-50 rounded-xl">
                    <Clock size={14} /> Pending Grade
                  </div>
                ) : (
                  <button 
                    onClick={() => handleOpenSubmit(task)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-500/5 cursor-pointer"
                  >
                    Submit Assignment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assignment Upload Modal */}
      {activeTask && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full p-6 space-y-5 relative">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">{activeTask.course} Assignment</span>
              <h3 className="text-base font-bold text-slate-800">{activeTask.title}</h3>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">Write Essay Answer or Report Notes</label>
                <textarea
                  required
                  rows={4}
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Enter your submission answers here..."
                  className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Upload Graphic */}
              <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center space-y-2 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-all">
                <Upload size={24} className="mx-auto text-slate-400 stroke-[1.5]" />
                <div>
                  <p className="text-xs font-semibold text-slate-700">Attach Lab Code or File</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Drag & drop files or click to browse (Simulated)</p>
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
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Grading Submission...
                    </>
                  ) : 'Submit Homework'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}