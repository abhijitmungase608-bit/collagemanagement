import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, GraduationCap, UserCheck, ArrowRight, BookOpenCheck } from 'lucide-react';

interface RoleSelectorProps {
  onSelectRole: (role: 'admin' | 'student-login' | 'teacher-login') => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelectRole }) => {
  const { loginAsAdmin } = useApp();

  const handleAdminAccess = () => {
    loginAsAdmin();
    onSelectRole('admin');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between relative overflow-hidden text-slate-100">
      {/* Dynamic background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="px-6 lg:px-12 py-6 flex items-center justify-between border-b border-slate-800/60 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-xl shadow-indigo-500/25">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Apex Institute</h1>
            <p className="text-xs text-slate-400">College Management Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <BookOpenCheck className="w-4 h-4 text-emerald-400" />
          <span>System Online • Fall Semester 2026</span>
        </div>
      </header>

      {/* Main Hero & Card selection */}
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10 flex-1 flex flex-col justify-center items-center">
        <div className="text-center max-w-2xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide">
            🎓 Integrated Educational Management System
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Welcome to <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Apex College Portal</span>
          </h2>
          <p className="text-slate-400 text-base">
            Select your role to access your dedicated dashboard and management suite.
          </p>
        </div>

        {/* 3 Portal Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Admin Card - Direct Access */}
          <div
            onClick={handleAdminAccess}
            className="group relative rounded-3xl bg-slate-900/80 border border-slate-800 p-8 hover:border-purple-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl hover:shadow-purple-500/10 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
                <Shield className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    Admin Portal
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase">
                    Direct Access
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Full control over student records, faculty, attendance, fees, courses, departments, and announcements.
                </p>
              </div>
            </div>

            <div className="pt-8 flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:text-purple-300">
              <span>Open Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Student Card */}
          <div
            onClick={() => onSelectRole('student-login')}
            className="group relative rounded-3xl bg-slate-900/80 border border-slate-800 p-8 hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Student Login
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase">
                    Portal Login
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Access your profile, attendance history, fee status, exam grades, CGPA transcript, and college notices.
                </p>
              </div>
            </div>

            <div className="pt-8 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
              <span>Go to Student Login</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Teacher Card */}
          <div
            onClick={() => onSelectRole('teacher-login')}
            className="group relative rounded-3xl bg-slate-900/80 border border-slate-800 p-8 hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                <UserCheck className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    Teacher Login
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
                    Faculty Login
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Mark daily class attendance, enter and update student grades/results, view student lists, and publish announcements.
                </p>
              </div>
            </div>

            <div className="pt-8 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
              <span>Go to Teacher Login</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-800/60 text-center text-xs text-slate-400 relative z-10">
        Apex College Management System • Designed with React, TypeScript & Tailwind CSS
      </footer>
    </div>
  );
};
