import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarCheck,
  CreditCard,
  Award,
  Bell,
  Building2,
  BookOpen,
  User,
  CheckSquare,
  FileSpreadsheet,
  ListFilter,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onCloseMobile,
}) => {
  const { role } = useApp();

  const getMenuItems = () => {
    switch (role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'students', label: 'Student Management', icon: Users },
          { id: 'teachers', label: 'Teacher Management', icon: UserCheck },
          { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
          { id: 'fees', label: 'Fees', icon: CreditCard },
          { id: 'results', label: 'Results', icon: Award },
          { id: 'notices', label: 'Notices', icon: Bell },
          { id: 'departments', label: 'Departments', icon: Building2 },
          { id: 'courses', label: 'Courses', icon: BookOpen },
        ];
      case 'student':
        return [
          { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
          { id: 'profile', label: 'My Profile', icon: User },
          { id: 'attendance', label: 'My Attendance', icon: CalendarCheck },
          { id: 'fees', label: 'My Fees', icon: CreditCard },
          { id: 'results', label: 'My Results', icon: Award },
          { id: 'notices', label: 'Notices', icon: Bell },
        ];
      case 'teacher':
        return [
          { id: 'dashboard', label: 'Teacher Dashboard', icon: LayoutDashboard },
          { id: 'profile', label: 'My Profile', icon: User },
          { id: 'students', label: 'Student List', icon: ListFilter },
          { id: 'attendance', label: 'Mark Attendance', icon: CheckSquare },
          { id: 'results', label: 'Add/Update Results', icon: FileSpreadsheet },
          { id: 'notices', label: 'Notices', icon: Bell },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-40 h-[calc(100vh-61px)] w-64 bg-slate-900 border-r border-slate-800 p-4 transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {role === 'admin' && 'Administrator Navigation'}
            {role === 'student' && 'Student Portal Navigation'}
            {role === 'teacher' && 'Faculty Navigation'}
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info card in sidebar */}
        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300">Apex College CMS</p>
          <p className="text-[11px] text-slate-400">Academic Year 2026-2027</p>
          <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400">
            <span>Status: Active</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </div>
      </aside>
    </>
  );
};
