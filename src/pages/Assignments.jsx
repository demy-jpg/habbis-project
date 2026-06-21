import React from 'react';
import { Calendar, FileText } from 'lucide-react';


function Assignments() {
  const assignments = [
    { id: 1, title: 'Calculus Problem Set #3', course: 'Mathematics', due: 'In 2 days', status: 'Pending', type: 'urgent' },
    { id: 2, title: 'Chemical Bonding Essay', course: 'Science', due: 'Completed', status: 'Graded (A)', type: 'done' },
    { id: 3, title: 'Newtonian Mechanics Lab Report', course: 'Physics', due: 'In 5 days', status: 'In Progress', type: 'active' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Assignments Workspace</h1>
        <p className="text-sm text-slate-500">Track task assignment timelines and review instructor grades.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {assignments.map((task) => (
            <div key={task.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex gap-4 items-start">
                <div className={`p-3 rounded-xl h-fit ${task.type === 'urgent' ? 'bg-red-50 text-red-600' : task.type === 'done' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{task.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{task.course}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end text-xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-500"><Calendar size={14} /> {task.due}</span>
                <span className={`px-3 py-1 rounded-full font-semibold ${
                  task.type === 'urgent' ? 'bg-red-100 text-red-700' : task.type === 'done' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                }`}>{task.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Explicitly declare default export at the bottom
export default Assignments;