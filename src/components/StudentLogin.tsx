import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, ArrowLeft, KeyRound, User, CheckCircle } from 'lucide-react';

interface StudentLoginProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onBack, onSuccess }) => {
  const { loginAsStudent, students } = useApp();
  const [rollNo, setRollNo] = useState('STU-2024-001');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAsStudent(rollNo)) {
      onSuccess();
    }
  };

  const handleQuickDemoSelect = (selectedRollNo: string) => {
    setRollNo(selectedRollNo);
    loginAsStudent(selectedRollNo);
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between relative overflow-hidden text-slate-100 p-4">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

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
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Student Login</h2>
            <p className="text-xs text-slate-400">Enter your student credentials to access your dashboard</p>
          </div>

          {/* Quick Demo Login Preset Buttons */}
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2">
            <p className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Quick Demo Accounts (Click to Login)
            </p>
            <div className="space-y-1.5">
              {students.slice(0, 3).map((stu) => (
                <button
                  key={stu.id}
                  type="button"
                  onClick={() => handleQuickDemoSelect(stu.rollNo)}
                  className="w-full text-left px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-cyan-500/10 hover:border-cyan-500/40 border border-slate-700/50 text-xs flex items-center justify-between text-slate-200 transition-all"
                >
                  <div>
                    <span className="font-semibold text-white">{stu.name}</span>
                    <span className="text-[11px] text-slate-400 block">{stu.departmentName}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 font-mono text-[10px]">
                    {stu.rollNo}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Roll Number / Email</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="e.g. STU-2024-001"
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
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
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-600/25 transition-all"
            >
              Sign In to Student Portal
            </button>
          </form>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-400 py-3">
        Apex College Student Management System
      </footer>
    </div>
  );
};
