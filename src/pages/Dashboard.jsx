import React from 'react';
import { BookOpen, CheckCircle, Clipboard, Clock } from 'lucide-react';

export default function Dashboard({ 
  userName, 
  courses, 
  lessonsCompleted, 
  testsTaken, 
  studyTime, 
  onProgressChange,
  onContinueLearning 
}) {
  
  // Find the course with the lowest progress that is still active to continue learning
  const activeCourse = [...courses]
    .sort((a, b) => a.progress - b.progress)
    .find(c => c.progress > 0 && c.progress < 100) || courses[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 select-none">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          Welcome back, {userName} <span className="animate-bounce">👋</span>
        </h1>
        <p className="text-sm text-slate-500">Keep learning and stay consistent.</p>
      </div>

      {/* Top Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><BookOpen size={20} /></div>
          <div>
            <p className="text-xs font-medium text-slate-400">Courses Enrolled</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{courses.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle size={20} /></div>
          <div>
            <p className="text-xs font-medium text-slate-400">Lessons Completed</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{lessonsCompleted}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Clipboard size={20} /></div>
          <div>
            <p className="text-xs font-medium text-slate-400">Tests Taken</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{testsTaken}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Clock size={20} /></div>
          <div>
            <p className="text-xs font-medium text-slate-400">Study Time</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{studyTime}</p>
          </div>
        </div>
      </div>

      {/* Main Content Sections split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Progress Tracker Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-slate-800">My Courses</h2>
            </div>

            <div className="space-y-5">
              {courses.map((course) => (
                <div key={course.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{course.name}</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Feature Panel: Quick Action Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-slate-800 mb-4">Continue Learning</h2>
            <div className="bg-blue-50/70 aspect-[16/10] rounded-xl flex items-center justify-center border border-blue-100/50 mb-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <BookOpen size={40} className="text-blue-300 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">
              {activeCourse ? `${activeCourse.name} Overview` : "Algebra Basics"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeCourse ? `${activeCourse.category} Track` : "Mathematics"}
            </p>
          </div>
          <button 
            onClick={onContinueLearning}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-3 px-4 rounded-xl shadow-md shadow-blue-600/10 transition-all active:scale-[0.98] cursor-pointer"
          >
            Continue Lesson
          </button>
        </div>
      </div>

      {/* Percentage Control Panel (The Interactive Real Website Factor) */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
        <h3 className="font-bold text-md mb-2">🎛️ Live Simulation Controller</h3>
        <p className="text-xs text-slate-400 mb-6">Adjust the range sliders below to control your subject percentage outputs dynamically inside the app UI charts above.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-300 mb-2">{course.name}</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={course.progress} 
                onChange={(e) => onProgressChange(course.id, e.target.value)}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-right block text-xs font-mono font-bold text-blue-400 mt-1">{course.progress}%</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}