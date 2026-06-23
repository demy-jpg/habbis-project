import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
<<<<<<< HEAD
import { } from './pages/firebase.js';
=======
>>>>>>> daa9205f1c50887809fedad162c132985043e8c9

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

  // Lifted Tests State
  const [tests, setTests] = useState([
    { 
      id: 1, 
      title: 'Algebra Mid-term Review Exam', 
      subject: 'Mathematics', 
      duration: '45 mins', 
      totalQuestions: 3, 
      score: 'Open', 
      questions: [
        { q: "What is the value of x if 2x + 5 = 15?", options: ["3", "5", "10", "2"], answer: 1 },
        { q: "Solve for y: y² = 16.", options: ["2", "4 or -4", "8", "16"], answer: 1 },
        { q: "Find the slope of the line y = 3x - 7.", options: ["3", "-7", "7", "-3"], answer: 0 }
      ]
    },
    { 
      id: 2, 
      title: 'Cellular Division Quick Quiz', 
      subject: 'Biology', 
      duration: '20 mins', 
      totalQuestions: 3, 
      score: '88%', 
      questions: [
        { q: "What stage of mitosis involves chromosome separation?", options: ["Prophase", "Metaphase", "Anaphase", "Telophase"], answer: 2 },
        { q: "How many daughter cells are produced in meiosis?", options: ["2", "4", "8", "1"], answer: 1 },
        { q: "Which cell organelle contains chromosomes?", options: ["Mitochondria", "Nucleus", "Ribosome", "Lysosome"], answer: 1 }
      ]
    },
    { 
      id: 3, 
      title: 'Thermodynamics Assessment Evaluation', 
      subject: 'Physics', 
      duration: '60 mins', 
      totalQuestions: 3, 
      score: 'Open', 
      questions: [
        { q: "What is the First Law of Thermodynamics concerned with?", options: ["Conservation of energy", "Entropy Increase", "Absolute zero limit", "Heat engines"], answer: 0 },
        { q: "Which thermodynamic process occurs at a constant volume?", options: ["Isobaric", "Isochoric", "Isothermal", "Adiabatic"], answer: 1 },
        { q: "What happens to entropy in an isolated system over time?", options: ["Decreases", "Remains constant", "Increases", "Fluctuates"], answer: 2 }
      ]
    },
  ]);

  // Lifted Assignments State
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Calculus Problem Set #3', course: 'Mathematics', due: 'In 2 days', status: 'Pending', type: 'urgent' },
    { id: 2, title: 'Chemical Bonding Essay', course: 'Science', due: 'Completed', status: 'Graded (A)', type: 'done' },
    { id: 3, title: 'Newtonian Mechanics Lab Report', course: 'Physics', due: 'In 5 days', status: 'In Progress', type: 'active' },
  ]);

  // Lifted Invoices and Subscription State
  const [invoices, setInvoices] = useState([
    { invoice: '#INV-4820', date: 'June 01, 2026', desc: 'Premium Academic Access Tier (Monthly)', amount: '$29.00', status: 'Settled' },
    { invoice: '#INV-3104', date: 'May 01, 2026', desc: 'Premium Academic Access Tier (Monthly)', amount: '$29.00', status: 'Settled' },
  ]);
  const [isPremium, setIsPremium] = useState(true);

  // Dynamic Metrics Calculations (Linked to Courses Progress and Tests!)
  const lessonsCompleted = courses.reduce((sum, c) => sum + Math.round((c.lessons * c.progress) / 100), 0);
  const testsTaken = tests.filter(t => t.score !== 'Open').length;
  const studyTime = Math.round(courses.reduce((sum, c) => sum + c.progress * 0.35, 12)) + " hrs";

  // Dynamic Certificate Generation: Triggered automatically when progress reaches 100%!
  const earnedCertificates = [
    { title: 'Foundational English Grammar Excellence', id: 'LNF-84920', date: 'May 14, 2026' }
  ];
  courses.forEach(c => {
    if (c.progress === 100) {
      earnedCertificates.push({
        title: `${c.name} Master Certification`,
        id: `LNF-${c.id.toUpperCase()}-${10000 + c.lessons * 592}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      });
    }
  });

  const handleProgressChange = (id, newProgress) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, progress: Math.min(100, Math.max(0, Number(newProgress))) } : c));
  };

  const handleUpdateAssignment = (id, updates) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const handleAddInvoice = (newInvoice) => {
    setInvoices(prev => [newInvoice, ...prev]);
  };

  // Multi-page navigation router switch
  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return (
          <Dashboard 
            userName={user.name} 
            courses={courses} 
            lessonsCompleted={lessonsCompleted}
            testsTaken={testsTaken}
            studyTime={studyTime}
            onProgressChange={handleProgressChange}
            onContinueLearning={() => setActivePage('Lessons')}
          />
        );
      case 'My Courses':
        return <MyCourses courses={courses} />;
      case 'Lessons':
        return <Lessons courses={courses} />;
      case 'Assignments':
        return (
          <Assignments 
            assignments={assignments} 
            onUpdateAssignment={handleUpdateAssignment} 
          />
        );
      case 'Tests':
        return <Tests tests={tests} setTests={setTests} />;
      case 'Certificates':
        return <Certificates certs={earnedCertificates} userName={user.name} />;
      case 'Payments':
        return (
          <Payments 
            invoices={invoices} 
            onAddInvoice={handleAddInvoice} 
            isPremium={isPremium} 
            onTogglePremium={setIsPremium}
          />
        );
      case 'Settings':
        return <Settings user={user} setUser={setUser} />;
      default:
        return (
          <Dashboard 
            userName={user.name} 
            courses={courses} 
            lessonsCompleted={lessonsCompleted}
            testsTaken={testsTaken}
            studyTime={studyTime}
            onProgressChange={handleProgressChange}
            onContinueLearning={() => setActivePage('Lessons')}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={() => setUser({ name: 'Guest', isLoggedIn: true })} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar userName={user.name} onSwitchProfile={(name) => setUser({ name, isLoggedIn: true })} />
        <main className="flex-1 overflow-y-auto p-8">{renderPage()}</main>
      </div>
    </div>
  );
}