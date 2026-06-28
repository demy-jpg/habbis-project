import React from 'react';
import { 
  LayoutDashboard, BookOpen, Video, FileText, 
  SquareCheck, Award, CreditCard, Settings, LogOut, GraduationCap, X 
} from 'lucide-react';

export default function Sidebar({ activePage, setActivePage, userRole, onLogout, isOpen, onClose }) {
  const menuItems = userRole === 'tutor'
    ? [
        { name: 'Tutor Dashboard', icon: GraduationCap },
        { name: 'Settings', icon: Settings },
      ]
    : [
        { name: 'Dashboard', icon: LayoutDashboard },
        { name: 'My Courses', icon: BookOpen },
        { name: 'Lessons', icon: Video },
        { name: 'Assignments', icon: FileText },
        { name: 'Tests', icon: SquareCheck },
        { name: 'Certificates', icon: Award },
        { name: 'Payments', icon: CreditCard },
        { name: 'Settings', icon: Settings },
      ];

  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 flex flex-col justify-between p-4 h-full z-50 transition-transform duration-300 md:relative md:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div>
        {/* Brand Logo */}
        <div className="flex items-center justify-between px-3 py-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <BookOpen size={20} className="fill-current" />
            </div>
            <span className="font-bold text-xl text-blue-600">Learnify</span>
          </div>
          <button 
            onClick={onClose} 
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Icon size={18} className={isActive ? 'stroke-[2.5]' : 'stroke-[2]'} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Action at Bottom */}
      <button 
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
