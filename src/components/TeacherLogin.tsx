import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, ArrowLeft, KeyRound, User, CheckCircle } from 'lucide-react';

interface TeacherLoginProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const TeacherLogin: React.FC<TeacherLoginProps> = ({ onBack, onSuccess }) => {
  const { loginAsTeacher, teachers } = useApp();
  const [teacherId, setTeacherId] = useState('TCH-101');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAsTeacher(teacherId)) {
      onSuccess();
    }
  };

  const handleQuickDemoSelect = (selectedId: string) => {
    setTeacherId(selectedId);
    loginAsTeacher(selectedId);
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between relative overflow-hidden text-slate-100 p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <header className="max-w-6xl mx-auto w-full py-4 flex items-center justify-between z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Menu</span>
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Teacher Login</h2>
            <p className="text-xs text-slate-400">Enter your faculty ID to manage classes and results</p>
          </div>

          {/* Quick Demo Accounts */}
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2">
            <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Quick Faculty Accounts (Click to Login)
            </p>
            <div className="space-y-1.5">
              {teachers.slice(0, 3).map((tch) => (
                <button
                  key={tch.id}
                  type="button"
                  onClick={() => handleQuickDemoSelect(tch.teacherId)}
                  className="w-full text-left px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-amber-500/10 hover:border-amber-500/40 border border-slate-700/50 text-xs flex items-center justify-between text-slate-200 transition-all"
                >
                  <div>
                    <span className="font-semibold text-white">{tch.name}</span>
                    <span className="text-[11px] text-slate-400 block">{tch.departmentName}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-950 text-amber-300 font-mono text-[10px]">
                    {tch.teacherId}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Teacher ID / Email</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  placeholder="e.g. TCH-101"
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-amber-600/25 transition-all"
            >
              Sign In to Faculty Portal
            </button>
          </form>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-400 py-3">
        Apex College Faculty Management Portal
      </footer>
    </div>
  );
};
