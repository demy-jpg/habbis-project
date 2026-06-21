import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';

// Import newly developed modules
import MyCourses from './pages/MyCourses.jsx';
import Lessons from './pages/Lessons.jsx';
import Assignments from './pages/Assignments.jsx';
import Tests from './pages/Tests.jsx';
import Certificates from './pages/Certificates.jsx';
import Payments from './pages/Payments.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  const [user, setUser] = useState({ name: 'Treasure', isLoggedIn: true });
  const [activePage, setActivePage] = useState('Dashboard');
  const [courses, setCourses] = useState([
    { id: 'math', name: 'Mathematics', progress: 70, category: 'Science', lessons: 12 },
    { id: 'science', name: 'Science', progress: 50, category: 'Science', lessons: 10 },
    { id: 'english', name: 'English', progress: 80, category: 'Humanities', lessons: 15 },
    { id: 'physics', name: 'Physics', progress: 40, category: 'Science', lessons: 8 },
    { id: 'biology', name: 'Biology', progress: 30, category: 'Medical', lessons: 14 },
  ]);

  const handleProgressChange = (id, newProgress) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, progress: Math.min(100, Math.max(0, Number(newProgress))) } : c));
  };

  if (!user.isLoggedIn) return <Login onLogin={(name) => setUser({ name, isLoggedIn: true })} />;

  // Multi-page navigation router switch
  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard userName={user.name} courses={courses} onProgressChange={handleProgressChange} />;
      case 'My Courses':
        return <MyCourses courses={courses} />;
      case 'Lessons':
        return <Lessons courses={courses} />;
      case 'Assignments':
        return <Assignments />;
      case 'Tests':
        return <Tests />;
      case 'Certificates':
        return <Certificates />;
      case 'Payments':
        return <Payments />;
      case 'Settings':
        return <Settings user={user} setUser={setUser} />;
      default:
        return <Dashboard userName={user.name} courses={courses} onProgressChange={handleProgressChange} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={() => setUser({ name: '', isLoggedIn: false })} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar userName={user.name} />
        <main className="flex-1 overflow-y-auto p-8">{renderPage()}</main>
      </div>
    </div>
  );
}