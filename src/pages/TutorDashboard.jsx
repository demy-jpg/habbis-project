import React, { useState } from 'react';
import { 
  BookOpen, Plus, Edit2, Trash2, Users, GraduationCap, 
  CheckSquare, Check, X, AlertCircle, Sparkles, Star, TrendingUp, FolderPlus
} from 'lucide-react';

export default function TutorDashboard({ 
  courses, 
  setCourses, 
  assignments, 
  onUpdateAssignment,
  onProgressChange
}) {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses', 'students', 'grading'
  
  // State for Add/Edit Course Modal
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [courseCategory, setCourseCategory] = useState('Science');
  const [courseLessons, setCourseLessons] = useState(10);
  const [courseProgress, setCourseProgress] = useState(50); // initial/average progress
  const [error, setError] = useState('');

  // State for Grading modal or input
  const [gradingItem, setGradingItem] = useState(null);
  const [gradeValue, setGradeValue] = useState('A+');
  const [gradeComment, setGradeComment] = useState('');

  // Calculate statistics
  const totalCourses = courses.length;
  const avgProgress = courses.length 
    ? Math.round(courses.reduce((sum, c) => sum + Number(c.progress), 0) / courses.length) 
    : 0;
  
  // Let's mock enrollment student counts per course
  const courseEnrollments = {
    math: 42,
    science: 28,
    english: 35,
    physics: 19,
    biology: 24
  };
  
  const getEnrollment = (id) => courseEnrollments[id] || 15;
  const totalStudents = courses.reduce((sum, c) => sum + getEnrollment(c.id), 0);
  
  // Pending review assignments
  const pendingAssignments = assignments.filter(a => a.status === 'Submitted (Pending Grade)' || a.status === 'Pending Review');

  // Mock Students Roster list matching existing courses
  const studentsList = [
    { id: 101, name: 'Alice Vance', email: 'alice.v@learnify.edu', courseId: 'math', courseName: 'Mathematics', progress: 75, grade: 'A' },
    { id: 102, name: 'Brad Cooper', email: 'brad.c@learnify.edu', courseId: 'science', courseName: 'Science', progress: 50, grade: 'B+' },
    { id: 103, name: 'Claire Danes', email: 'claire.d@learnify.edu', courseId: 'english', courseName: 'English', progress: 95, grade: 'A+' },
    { id: 104, name: 'Damian Lewis', email: 'damian.l@learnify.edu', courseId: 'physics', courseName: 'Physics', progress: 40, grade: 'B' },
    { id: 105, name: 'Emily Blunt', email: 'emily.b@learnify.edu', courseId: 'biology', courseName: 'Biology', progress: 30, grade: 'C' },
    { id: 106, name: 'Franklin Roosevelt', email: 'frank.r@learnify.edu', courseId: 'math', courseName: 'Mathematics', progress: 65, grade: 'B-' },
    { id: 107, name: 'Grace Hopper', email: 'grace.h@learnify.edu', courseId: 'science', courseName: 'Science', progress: 85, grade: 'A+' },
  ];

  // Handlers
  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseName('');
    setCourseCategory('Science');
    setCourseLessons(10);
    setCourseProgress(0);
    setError('');
    setShowCourseModal(true);
  };

  const handleOpenEditCourse = (course) => {
    setEditingCourse(course);
    setCourseName(course.name);
    setCourseCategory(course.category);
    setCourseLessons(course.lessons);
    setCourseProgress(course.progress);
    setError('');
    setShowCourseModal(true);
  };

  const handleSaveCourse = (e) => {
    e.preventDefault();
    if (!courseName.trim()) {
      setError('Course name is required');
      return;
    }

    if (editingCourse) {
      // Edit
      setCourses(prev => prev.map(c => c.id === editingCourse.id 
        ? { ...c, name: courseName, category: courseCategory, lessons: Number(courseLessons), progress: Number(courseProgress) }
        : c
      ));
    } else {
      // Create new
      const newId = courseName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || `course-${Date.now()}`;
      // Check if duplicate ID
      if (courses.some(c => c.id === newId)) {
        setError('A course with a similar name already exists.');
        return;
      }
      setCourses(prev => [
        ...prev,
        {
          id: newId,
          name: courseName,
          category: courseCategory,
          lessons: Number(courseLessons),
          progress: Number(courseProgress) || 0
        }
      ]);
    }

    setShowCourseModal(false);
  };

  const handleDeleteCourse = (id) => {
    if (confirm('Are you sure you want to delete this course? All associated data will be removed.')) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleOpenGrading = (task) => {
    setGradingItem(task);
    setGradeValue('A');
    setGradeComment('');
  };

  const handleSaveGrade = (e) => {
    e.preventDefault();
    onUpdateAssignment(gradingItem.id, {
      status: `Graded (${gradeValue})`,
      due: 'Completed',
      type: 'done'
    });
    setGradingItem(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-950 p-6 md:p-8 rounded-3xl text-white shadow-xl shadow-blue-950/10 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="absolute bottom-[-50%] left-[-10%] w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none z-0"></div>

        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full w-fit">
            <Sparkles size={12} className="text-yellow-400 fill-yellow-400 animate-pulse" />
            <span>Instructor Portal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Tutor Dashboard</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-lg">
            Manage your educational courses, track individual student metrics, and grade outstanding assessments.
          </p>
        </div>

        <button 
          onClick={handleOpenAddCourse}
          className="relative z-10 flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-fit"
        >
          <FolderPlus size={18} />
          Create New Course
        </button>
      </div>

      {/* Quick Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Stat 1 */}
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Courses Managed</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{totalCourses}</h3>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Enrolled Students</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{totalStudents}</h3>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Average Progress</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{avgProgress}%</h3>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-all relative overflow-hidden">
          <div className={`p-3 rounded-xl ${pendingAssignments.length > 0 ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'}`}>
            <CheckSquare size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Pending Review</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{pendingAssignments.length}</h3>
          </div>
          {pendingAssignments.length > 0 && (
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          )}
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none whitespace-nowrap">
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-4 px-6 font-semibold text-sm transition-all relative shrink-0 ${
            activeTab === 'courses' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          Manage Courses
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`pb-4 px-6 font-semibold text-sm transition-all relative shrink-0 ${
            activeTab === 'students' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          Student Roster ({studentsList.length})
        </button>
        <button
          onClick={() => setActiveTab('grading')}
          className={`pb-4 px-6 font-semibold text-sm transition-all relative flex items-center gap-1.5 shrink-0 ${
            activeTab === 'grading' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          Grading Workspace
          {pendingAssignments.length > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0">
              {pendingAssignments.length}
            </span>
          )}
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                      {course.category}
                    </span>
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenEditCourse(course)}
                        title="Edit course"
                        className="p-1.5 bg-slate-50 text-slate-500 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteCourse(course.id)}
                        title="Delete course"
                        className="p-1.5 bg-slate-50 text-slate-500 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-800 text-base leading-tight group-hover:text-blue-600 transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      ID: <span className="font-mono text-slate-500">{course.id}</span>
                    </p>
                  </div>

                  {/* Course stats */}
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4 text-xs font-semibold text-slate-500">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wide">Lectures</span>
                      <span className="text-slate-800 font-bold">{course.lessons} Lectures</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wide">Enrolled Students</span>
                      <span className="text-slate-800 font-bold">{getEnrollment(course.id)} Students</span>
                    </div>
                  </div>
                </div>

                {/* Progress tracking */}
                <div className="space-y-2 pt-2 border-t border-slate-50">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-400">Class Average Progress</span>
                    <span className="text-blue-600 font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${course.progress}%` }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STUDENTS ROSTER TAB */}
        {activeTab === 'students' && (
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="py-4 px-6">Student Name</th>
                    <th className="py-4 px-6">Enrolled Course</th>
                    <th className="py-4 px-6">Module Progress</th>
                    <th className="py-4 px-6">Estimated Grade</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {studentsList.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{student.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{student.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500">{student.courseName}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="w-8 font-bold text-slate-600">{student.progress}%</span>
                          <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${student.progress}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] ${
                          student.grade.startsWith('A') 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                            : student.grade.startsWith('B') 
                              ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                              : 'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}>
                          {student.grade}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button 
                          onClick={() => alert(`Sending a simulated message to ${student.name}`)}
                          className="px-3 py-1.5 border border-slate-200 text-[10px] font-bold rounded-lg text-slate-500 hover:bg-slate-50 cursor-pointer"
                        >
                          Message Student
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Card View */}
            <div className="block md:hidden divide-y divide-slate-100">
              {studentsList.map((student) => (
                <div key={student.id} className="p-4 space-y-3 hover:bg-slate-50/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{student.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{student.email}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] ${
                      student.grade.startsWith('A') 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                        : student.grade.startsWith('B') 
                          ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {student.grade}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                    <span>Course: {student.courseName}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{student.progress}%</span>
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${student.progress}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="pt-1">
                    <button 
                      onClick={() => alert(`Sending a simulated message to ${student.name}`)}
                      className="w-full text-center py-2 border border-slate-200 text-[10px] font-bold rounded-lg text-slate-500 hover:bg-slate-50 cursor-pointer"
                    >
                      Message Student
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GRADING WORKSPACE TAB */}
        {activeTab === 'grading' && (
          <div className="space-y-4">
            {pendingAssignments.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center space-y-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full w-fit mx-auto">
                  <Check size={28} />
                </div>
                <h3 className="font-extrabold text-slate-800 text-lg">All caught up!</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  There are no student assignment submissions waiting to be graded at this moment.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm divide-y divide-slate-100">
                {pendingAssignments.map((task) => (
                  <div key={task.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">
                        {task.course}
                      </span>
                      <h3 className="font-bold text-slate-800 text-sm">{task.title}</h3>
                      <p className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                        <AlertCircle size={12} /> Needs grading review
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleOpenGrading(task)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-500/5 cursor-pointer"
                      >
                        Review & Grade
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* COURSE CREATOR / EDITOR MODAL */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md w-full p-6 space-y-6 relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setShowCourseModal(false)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-800">
                {editingCourse ? 'Modify Course Details' : 'Design New Course'}
              </h3>
              <p className="text-xs text-slate-400">
                Specify academic details for student subscription and workspace creation.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-start gap-2.5 text-xs">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Course Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Advanced Calculus & Topology"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                  <select 
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option value="Science">Science</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Medical">Medical</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Arts">Arts</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Lectures</label>
                  <input 
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={courseLessons}
                    onChange={(e) => setCourseLessons(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
                  />
                </div>
              </div>

              {editingCourse && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <label>Average Student Progress</label>
                    <span className="text-blue-600">{courseProgress}%</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={courseProgress}
                    onChange={(e) => setCourseProgress(e.target.value)}
                    className="w-full accent-blue-600"
                  />
                </div>
              )}

              <div className="pt-4 flex gap-3 justify-end">
                <button 
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-500 text-xs font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-md shadow-blue-500/10"
                >
                  {editingCourse ? 'Save Changes' : 'Publish Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GRADING ACTION MODAL */}
      {gradingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md w-full p-6 space-y-6 relative">
            <button 
              onClick={() => setGradingItem(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>

            <div className="space-y-1">
              <span className="text-[9px] font-extrabold tracking-wider text-blue-600 uppercase bg-blue-50 px-2.5 py-0.5 rounded-full">
                Reviewing Submission
              </span>
              <h3 className="text-base font-bold text-slate-800 pt-1.5">{gradingItem.title}</h3>
              <p className="text-[11px] text-slate-400">Course: <span className="font-bold text-slate-600">{gradingItem.course}</span></p>
            </div>

            {/* Mock student solution text */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Student Answer Snippet</span>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                "I have compiled the required assignment notes. In section 1, the variables were defined and normalized. In section 2, I ran the simulation and outputted the tabular datasets as attached. The calculus formulas verify that the results hold within the standard error margins."
              </p>
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Assign Grade</label>
                  <select 
                    value={gradeValue}
                    onChange={(e) => setGradeValue(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option value="A+">A+ (97-100%)</option>
                    <option value="A">A (93-96%)</option>
                    <option value="A-">A- (90-92%)</option>
                    <option value="B+">B+ (87-89%)</option>
                    <option value="B">B (83-86%)</option>
                    <option value="C">C (70-79%)</option>
                    <option value="Pass">Pass</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
                  <input 
                    type="text"
                    disabled
                    value="Graded"
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-500 font-semibold cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Tutor Feedback (Optional)</label>
                <textarea 
                  rows={2}
                  placeholder="Excellent work, proof is clean and readable."
                  value={gradeComment}
                  onChange={(e) => setGradeComment(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex gap-3 justify-end">
                <button 
                  type="button"
                  onClick={() => setGradingItem(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-500 text-xs font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-md shadow-emerald-500/10"
                >
                  Submit Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Percentage Control Panel (Tutor Dashboard simulation sync) */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-6 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-md text-white flex items-center gap-2">
              <span className="animate-pulse">🎛️</span> Live Simulation Deck (Tutor Controller)
            </h3>
            <p className="text-xs text-slate-400 mt-1">Adjust progress manually or simulate test outcomes to update student grades dynamically.</p>
          </div>
          
          {/* Global Exam Pass Rate Link */}
          <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/30">
            <span className="text-xs font-semibold text-slate-300">Exam Pass Rate Simulator:</span>
            <input 
              type="range"
              min="0"
              max="100"
              defaultValue="70"
              onChange={(e) => {
                const val = Number(e.target.value);
                courses.forEach(c => onProgressChange(c.id, val));
              }}
              className="w-24 h-1 bg-blue-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-800/50 hover:border-slate-700 transition-all">
              <label className="block text-xs font-bold text-slate-300 mb-2 truncate">{course.name}</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={course.progress} 
                onChange={(e) => onProgressChange(course.id, e.target.value)}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between items-center mt-2 text-[10px]">
                <span className="text-slate-500 font-semibold">Progress</span>
                <span className="font-mono font-bold text-blue-400">{course.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
