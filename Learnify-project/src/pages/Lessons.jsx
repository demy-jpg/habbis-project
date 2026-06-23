import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Lock } from 'lucide-react';

export default function Lessons() {
  const videoModules = [
    {
      id: 0,
      title: 'Learnify Open Projects',
      duration: '00:30',
      status: 'completed',
      category: 'Learnify Platform',
      topic: 'Walkthrough',
      poster: '/Student.jpg',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
    },
    {
      id: 1,
      title: 'Introduction to Linear Equations',
      duration: '14:20',
      status: 'completed',
      category: 'Mathematics Track',
      topic: 'Topic 01',
      poster: '/Student 2.png',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
    },
    {
      id: 2,
      title: 'Graphing Linear Functions & Slopes',
      duration: '22:15',
      status: 'current',
      category: 'Mathematics Track',
      topic: 'Topic 02',
      poster: '/Student.jpg',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
    },
    {
      id: 3,
      title: 'Systems of Equations Mastery',
      duration: '18:45',
      status: 'completed',
      category: 'Mathematics Track',
      topic: 'Topic 03',
      poster: '/Student 2.png',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
    },
    {
      id: 4,
      title: 'Quadratic Equations Deep Dive',
      duration: '31:10',
      status: 'completed',
      category: 'Mathematics Track',
      topic: 'Topic 04',
      poster: '/Student.jpg',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
    },
  ];

  const slides = [
    {
      title: "Welcome to Learnify Hub",
      subtitle: "The Ultimate E-Learning Portal",
      description: "Learnify is a state-of-the-art virtual dashboard designed to help students track, manage, and accelerate their academic learning journey.",
      highlights: ["Unified Student Portal", "Responsive Modern Design", "Course Progress Syncing"],
      color: "from-blue-600 to-indigo-600"
    },
    {
      title: "Name-Based Authentication",
      subtitle: "Simple Student Sign-In",
      description: "Access your dashboard securely using only your student name. No password or email credentials required—just enter your name to authenticate.",
      highlights: ["No Password Required", "Custom Profile Setup", "Session Progress Saving"],
      color: "from-sky-600 to-blue-600"
    },
    {
      title: "Dynamic Dashboard Metrics",
      subtitle: "Progression & Study Statistics",
      description: "Instantly track courses enrolled, lectures completed, tests taken, and active study hours with auto-animating progression indicators.",
      highlights: ["Visual KPI Summary Cards", "Subject Progress Trackers", "Animated Progress Percentages"],
      color: "from-emerald-600 to-teal-600"
    },
    {
      title: "Simulation Controller Deck",
      subtitle: "Tweak Custom UI Parameters",
      description: "Use the live range sliders at the bottom of the dashboard to dynamically control and view chart adjustments in real-time.",
      highlights: ["React State Data Binding", "Interactive Simulation Panel", "Immediate Interface Feedback"],
      color: "from-amber-600 to-orange-600"
    },
    {
      title: "Quizzes, Assignments & Certificates",
      subtitle: "Complete Curriculum Lifecycle",
      description: "Access quiz decks, review upcoming assignment deadlines, and download officially generated completion certificates upon mastering your track.",
      highlights: ["Homework Trackers", "Interactive Quiz Boards", "Official Seal Certifications"],
      color: "from-purple-600 to-pink-600"
    }
  ];

  const [activeVid, setActiveVid] = useState(videoModules[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);

  // Playback timer effect for the Learnify Open Projects presentation (ID 0)
  useEffect(() => {
    let interval = null;
    if (isPlaying && activeVid.id === 0) {
      interval = setInterval(() => {
        setVideoTime((prev) => {
          if (prev >= 30) {
            return 0; // loop back to start
          }
          return prev + 1;
        });
      }, 1000);
    } else if (activeVid.id !== 0) {
      setVideoTime(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, activeVid.id]);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleSelectVideo = (mod) => {
    setActiveVid(mod);
    setIsPlaying(false);
    setVideoTime(0);
  };

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = Math.min(29, Math.floor(percentage * 30));
    setVideoTime(newTime);
  };

  const currentSlideIndex = Math.min(4, Math.floor(videoTime / 6));
  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Dynamic Main Player Video Area */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-slate-900 aspect-video rounded-2xl flex flex-col items-center justify-center text-white relative group overflow-hidden shadow-md">
          {isPlaying ? (
            activeVid.id === 0 ? (
              /* Custom Interactive Walkthrough Video Player for Slide 0 */
              <div className="w-full h-full flex flex-col justify-between bg-slate-950 p-6 relative overflow-hidden select-none">
                {/* Background Grid Lines & Gradients */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />
                <div className={`absolute -right-24 -top-24 w-72 h-72 rounded-full bg-gradient-to-br ${currentSlide.color} blur-3xl opacity-20 transition-all duration-1000 pointer-events-none`} />
                
                {/* Top header bar */}
                <div className="flex justify-between items-center z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Learnify Walkthrough</span>
                  </div>
                  <span className="text-[10px] font-semibold bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                    Topic {currentSlideIndex + 1} of 5
                  </span>
                </div>

                {/* Main Slide Content Area */}
                <div className="my-auto z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gradient-to-r ${currentSlide.color} text-white`}>
                      {currentSlide.subtitle}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight transition-all duration-300">
                      {currentSlide.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {currentSlide.description}
                    </p>
                  </div>
                  
                  {/* Highlights Bullet List & Graphic Block */}
                  <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 space-y-3 shadow-lg backdrop-blur-sm">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Features Covered</h4>
                    <div className="space-y-2">
                      {currentSlide.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${currentSlide.color}`} />
                          <span className="font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Video controls toolbar overlay */}
                <div className="z-10 space-y-3 mt-auto">
                  {/* Interactive Timeline Bar */}
                  <div 
                    onClick={handleTimelineClick}
                    className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden cursor-pointer relative group/timeline"
                  >
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-200 ease-out" 
                      style={{ width: `${(videoTime / 30) * 100}%` }}
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/timeline:opacity-100 transition-opacity pointer-events-none"
                      style={{ left: `calc(${(videoTime / 30) * 100}% - 6px)` }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {/* Play / Pause Toggle Button */}
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        {isPlaying ? (
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        ) : (
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        )}
                      </button>
                      
                      {/* Time display indicator */}
                      <span className="text-xs font-mono text-slate-400">
                        00:{videoTime < 10 ? '0' + videoTime : videoTime} / 00:30
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Volume icon placeholder */}
                      <svg className="w-5 h-5 text-slate-400 hover:text-white transition-colors cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                      {/* Fullscreen icon placeholder */}
                      <svg className="w-5 h-5 text-slate-400 hover:text-white transition-colors cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Regular HTML5 Video Player for other lessons */
              <video
                key={activeVid.id}
                controls
                autoPlay
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-contain bg-black"
              >
                <source src={activeVid.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )
          ) : (
            <>
              {/* Poster frame background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                style={{ 
                  backgroundImage: `url(${activeVid.poster || '/Student.jpg'})`,
                  filter: 'brightness(0.65)'
                }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              
              {/* Ready status badge */}
              <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Ready to Learn
              </div>

              {/* Glowing Play Button */}
              <button 
                onClick={handlePlayClick}
                className="relative z-10 p-6 bg-blue-600 rounded-full hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl shadow-blue-600/40 hover:shadow-blue-600/60 group-hover:bg-blue-500 cursor-pointer"
              >
                <Play size={32} className="fill-current ml-1 text-white" />
              </button>
              
              {/* Video metadata labels on poster */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">Now Playing</span>
                  <h4 className="text-md font-bold text-white leading-tight mt-0.5">{activeVid.title}</h4>
                </div>
                <span className="text-xs font-mono bg-black/75 px-2.5 py-1 rounded-md border border-slate-700/30 text-slate-300">
                  {activeVid.duration}
                </span>
              </div>
            </>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{activeVid.title}</h2>
          <p className="text-xs text-slate-400 mt-1">
            {activeVid.category} • {activeVid.topic} • Estimated duration: {activeVid.duration}
          </p>
        </div>
      </div>

      {/* Structured Modules Timeline */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm h-fit">
        <h3 className="font-bold text-slate-800 mb-3 text-sm">Course Content</h3>
        <div className="space-y-2">
          {videoModules.map((mod) => (
            <button
              key={mod.id}
              disabled={mod.status === 'locked'}
              onClick={() => handleSelectVideo(mod)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                activeVid.id === mod.id 
                  ? 'bg-blue-50/50 border-blue-200 text-blue-900' 
                  : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
              } ${mod.status === 'locked' && 'opacity-50 cursor-not-allowed'}`}
            >
              <div className="flex items-center gap-3">
                {mod.status === 'completed' && <CheckCircle size={16} className="text-emerald-500" />}
                {mod.status === 'current' && <Play size={16} className="text-blue-600 fill-current" />}
                {mod.status === 'locked' && <Lock size={16} className="text-slate-400" />}
                <div>
                  <p className="text-xs font-semibold max-w-[180px] truncate">{mod.title}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{mod.duration}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}