import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  Award,
  CreditCard,
  Bell,
  ArrowRight,
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigateTab }) => {
  const { currentUser, students, results, fees, notices } = useApp();

  // Find active logged in student
  const activeStudent =
    students.find((s) => s.id === currentUser?.id || s.rollNo === currentUser?.referenceId) ||
    students[0];

  const studentResults = results.filter((r) => r.studentId === activeStudent.id);
  const studentFees = fees.filter((f) => f.studentId === activeStudent.id);

  const pendingFeeAmount = studentFees
    .filter((f) => f.status === 'pending' || f.status === 'overdue')
    .reduce((sum, f) => sum + f.amount, 0);

  const studentNotices = notices.filter(
    (n) => n.targetRole === 'all' || n.targetRole === 'student'
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Greeting Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-cyan-900 via-indigo-900 to-slate-900 border border-cyan-700/40 p-6 lg:p-8 shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <img
              src={activeStudent.avatar}
              alt={activeStudent.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400/60 shadow-xl"
            />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 text-xs font-semibold mb-1">
                🎓 Active Student Portal
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
                Welcome, {activeStudent.name}!
              </h2>
              <p className="text-xs text-cyan-200/80 mt-1 font-mono">
                {activeStudent.rollNo} • {activeStudent.departmentName} (Year {activeStudent.year})
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('profile')}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all self-start md:self-auto"
          >
            View Full Profile <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => onNavigateTab('attendance')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
              Details <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400">Attendance Rate</p>
            <h3 className="text-2xl font-black text-white mt-1">
              {activeStudent.attendancePercent}%
            </h3>
            <p className="text-[11px] text-emerald-400 mt-1">Good Academic Standing</p>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('results')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
              Grades <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400">Current CGPA</p>
            <h3 className="text-2xl font-black text-purple-400 mt-1">
              {activeStudent.gpa.toFixed(2)} / 4.0
            </h3>
            <p className="text-[11px] text-purple-300/70 mt-1">Semester {activeStudent.semester}</p>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('fees')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              Pay Online <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400">Pending Fee Due</p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1 font-mono">
              ${pendingFeeAmount.toLocaleString()}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              {pendingFeeAmount === 0 ? 'All Fees Paid ✨' : 'Upcoming Invoice Due'}
            </p>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('notices')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Bell className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              Board <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400">Campus Notices</p>
            <h3 className="text-2xl font-black text-white mt-1">{studentNotices.length}</h3>
            <p className="text-[11px] text-amber-400 mt-1">Announcements</p>
          </div>
        </div>
      </div>

      {/* Middle Grid: Results Summary & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" /> Recent Academic Results
            </h3>
            <button
              onClick={() => onNavigateTab('results')}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
            >
              Full Grade Sheet →
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            {studentResults.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No results uploaded yet.</p>
            ) : (
              studentResults.map((res) => (
                <div
                  key={res.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{res.subjectName}</h4>
                    <p className="text-[11px] text-slate-400">Semester {res.semester}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {res.marksObtained}/{res.maxMarks}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-xs">
                      {res.grade}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notices list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-400" /> Student Announcements
            </h3>
          </div>

          <div className="space-y-3">
            {studentNotices.slice(0, 3).map((n) => (
              <div key={n.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300">
                  {n.priority}
                </span>
                <h4 className="text-xs font-bold text-white">{n.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
