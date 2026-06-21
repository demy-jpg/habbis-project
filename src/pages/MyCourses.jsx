import React from 'react';
import { BookOpen, Folder, PlayCircle } from 'lucide-react';

function MyCourses({ courses }) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Enrolled Courses</h1>
        <p className="text-sm text-slate-500">Track and view detail analytics for all your active modules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full flex items-center gap-1">
                  <Folder size={12} /> {course.category}
                </span>
                <span className="text-xs font-bold text-blue-600">{course.progress}% Completed</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{course.name} Complete Track</h3>
              <p className="text-xs text-slate-400">Includes extensive modules, structural workspace projects, and comprehensive review tests.</p>
            </div>

            <div className="space-y-3">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }} />
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1"><BookOpen size={14} /> {course.lessons} Lectures</span>
                <button className="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700">
                  <PlayCircle size={16} /> Resume
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MyCourses