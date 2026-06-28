import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Lock, BookOpen, Clock, Check } from 'lucide-react';

export default function Lessons({ course, onProgressChange }) {
  // If no course is selected, fallback
  if (!course) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 max-w-xl mx-auto space-y-4">
        <h3 className="font-bold text-slate-800 text-lg">No Course Selected</h3>
        <p className="text-xs text-slate-400">Please choose a course from your courses list first.</p>
      </div>
    );
  }

  // Predefined playlists for default courses
  const coursePlaylists = {
    math: [
      { id: 1, title: 'Introduction to Linear Equations', duration: '14:20', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', poster: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop' },
      { id: 2, title: 'Graphing Linear Functions & Slopes', duration: '22:15', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', poster: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop' },
      { id: 3, title: 'Systems of Equations Mastery', duration: '18:45', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', poster: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop' },
      { id: 4, title: 'Quadratic Equations Deep Dive', duration: '31:10', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', poster: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop' },
    ],
    science: [
      { id: 1, title: 'Introduction to Chemical Bonds', duration: '12:30', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', poster: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=600&auto=format&fit=crop' },
      { id: 2, title: 'Covalent vs Ionic Compounds', duration: '19:40', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', poster: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=600&auto=format&fit=crop' },
      { id: 3, title: 'Balancing Chemical Reactions', duration: '15:15', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', poster: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=600&auto=format&fit=crop' },
    ],
    english: [
      { id: 1, title: 'English Sentence Structure', duration: '10:15', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', poster: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop' },
      { id: 2, title: 'Parts of Speech & Syntax', duration: '16:50', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', poster: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop' },
      { id: 3, title: 'Advanced Reading Comprehension', duration: '20:05', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', poster: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop' },
    ],
    physics: [
      { id: 1, title: "Newton's Laws of Motion", duration: '18:10', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop' },
      { id: 2, title: 'Work, Energy & Power', duration: '25:30', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop' },
      { id: 3, title: 'Rotational Dynamics Basics', duration: '21:15', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop' },
    ],
    biology: [
      { id: 1, title: 'Introduction to Cellular Biology', duration: '15:40', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', poster: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=600&auto=format&fit=crop' },
      { id: 2, title: 'Mitosis vs Meiosis Breakdown', duration: '22:00', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', poster: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=600&auto=format&fit=crop' },
      { id: 3, title: 'DNA Replication Mechanics', duration: '19:30', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', poster: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=600&auto=format&fit=crop' },
    ]
  };

  // Generate dynamic lectures list if not in predefined map
  const getLecturesList = () => {
    const defaultList = coursePlaylists[course.id];
    if (defaultList) return defaultList;

    // Generate dynamic mock lectures
    const list = [];
    const lectureCount = course.lessons || 5;
    for (let i = 1; i <= lectureCount; i++) {
      list.push({
        id: i,
        title: `Lecture 0${i}: Core Concept Studies of ${course.name}`,
        duration: `${12 + i * 2}:${15 + (i * 12) % 45}`,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        poster: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop'
      });
    }
    return list;
  };

  const lectures = getLecturesList();
  
  // Calculate completed lecture indices based on current course progress percentage
  const initialCompletedCount = Math.min(
    lectures.length,
    Math.round((course.progress / 100) * lectures.length)
  );

  // Local state for tracking lesson statuses
  const [completedLessons, setCompletedLessons] = useState({});

  // Sync with course progress prop changes
  useEffect(() => {
    const updated = {};
    for (let i = 0; i < lectures.length; i++) {
      if (i < initialCompletedCount) {
        updated[lectures[i].id] = true;
      }
    }
    setCompletedLessons(updated);
  }, [course.id, course.progress]);

  // Current selected video inside Lessons page
  const [activeVid, setActiveVid] = useState(lectures[0] || null);

  // Make sure activeVid updates if course changes
  useEffect(() => {
    if (lectures.length > 0) {
      setActiveVid(lectures[0]);
    }
  }, [course.id]);

  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectVideo = (lecture) => {
    setActiveVid(lecture);
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Complete a lesson and update progress
  const handleMarkComplete = (lectureId) => {
    const updated = { ...completedLessons, [lectureId]: true };
    setCompletedLessons(updated);
    
    // Calculate new progress
    const completedCount = Object.keys(updated).length;
    const newProgress = Math.min(100, Math.round((completedCount / lectures.length) * 100));
    
    // Trigger global update
    onProgressChange(course.id, newProgress);

    // Auto-advance to the next video if available
    const currentIndex = lectures.findIndex(l => l.id === lectureId);
    if (currentIndex !== -1 && currentIndex + 1 < lectures.length) {
      setActiveVid(lectures[currentIndex + 1]);
      setIsPlaying(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
        <div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md">
            Course Lessons
          </span>
          <h1 className="text-xl font-bold text-slate-800 mt-2">{course.name} Complete Track</h1>
          <p className="text-xs text-slate-400 mt-0.5">Category: {course.category} • Watch lectures to complete modules.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 font-semibold block">Class Progression</span>
            <span className="text-sm font-extrabold text-blue-600">{course.progress}% Completed</span>
          </div>
          <div className="w-24 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-50">
            <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-950 aspect-video rounded-3xl overflow-hidden relative flex items-center justify-center border border-slate-900 group shadow-lg">
            {isPlaying ? (
              <video
                key={activeVid.id}
                controls
                autoPlay
                className="w-full h-full object-contain bg-black"
              >
                <source src={activeVid.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-black/40 via-black/10 to-black/80">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {course.name}
                  </span>
                  {completedLessons[activeVid.id] && (
                    <span className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow">
                      <Check size={10} strokeWidth={3} /> Finished
                    </span>
                  )}
                </div>

                {/* Glowing Play Button */}
                <button
                  onClick={handleTogglePlay}
                  className="p-6 bg-blue-600 text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 cursor-pointer mx-auto block"
                >
                  <Play size={28} className="fill-current ml-1 text-white" />
                </button>

                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-400">Now Streaming</span>
                    <h3 className="text-base font-bold text-white leading-tight">{activeVid.title}</h3>
                  </div>
                  <span className="text-xs font-mono font-bold bg-black/60 px-2 py-0.5 rounded border border-slate-800/40 text-slate-300">
                    {activeVid.duration}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
            <div>
              <h2 className="text-base font-bold text-slate-800">{activeVid.title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Estimated Duration: {activeVid.duration}</p>
            </div>
            
            {completedLessons[activeVid.id] ? (
              <div className="bg-emerald-50 text-emerald-600 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 border border-emerald-100">
                <CheckCircle size={16} /> Lecture Completed
              </div>
            ) : (
              <button
                onClick={() => handleMarkComplete(activeVid.id)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-blue-500/10 cursor-pointer"
              >
                Mark as Completed
              </button>
            )}
          </div>
        </div>

        {/* Playlist Panel */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm h-fit space-y-4">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm">Course Curriculum</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Select and watch your target lectures.</p>
          </div>
          <div className="space-y-2">
            {lectures.map((lecture, idx) => {
              const isCompleted = completedLessons[lecture.id];
              const isActive = activeVid.id === lecture.id;
              const isLocked = idx > Object.keys(completedLessons).length;

              return (
                <button
                  key={lecture.id}
                  disabled={isLocked}
                  onClick={() => handleSelectVideo(lecture)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-blue-50/50 border-blue-200 text-blue-900 shadow-sm'
                      : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
                  } ${isLocked ? 'opacity-40 cursor-not-allowed bg-slate-50/50' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    {isLocked ? (
                      <Lock size={16} className="text-slate-400 shrink-0" />
                    ) : isCompleted ? (
                      <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                    ) : (
                      <Play size={14} className={`shrink-0 ${isActive ? 'text-blue-600 fill-current' : 'text-slate-400'}`} />
                    )}
                    <div>
                      <p className="text-xs font-bold leading-snug line-clamp-1">{lecture.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Duration: {lecture.duration}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}