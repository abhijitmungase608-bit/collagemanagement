import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  UserCheck,
  Building2,
  DollarSign,
  CalendarCheck,
  TrendingUp,
  Bell,
  ArrowUpRight,
  Plus,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { students, teachers, departments, fees, attendance, notices } = useApp();

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalDepts = departments.length;

  const totalFeesCollected = fees
    .filter((f) => f.status === 'paid')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalFeesPending = fees
    .filter((f) => f.status === 'pending' || f.status === 'overdue')
    .reduce((sum, f) => sum + f.amount, 0);

  const avgAttendance =
    attendance.length > 0
      ? Math.round(
          (attendance.filter((a) => a.status === 'present').length / attendance.length) * 100
        )
      : 88;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 border border-indigo-700/50 p-6 lg:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-300" /> Executive Overview
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Admin Central Dashboard
            </h2>
            <p className="text-sm text-indigo-200/80 leading-relaxed">
              Manage academic operations, monitor campus attendance, track fee payments, and publish official college notices in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('students')}
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-950 hover:bg-indigo-50 font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 text-indigo-600" /> Add New Student
            </button>
            <button
              onClick={() => onNavigateTab('notices')}
              className="px-4 py-2.5 rounded-xl bg-indigo-800/80 hover:bg-indigo-700 border border-indigo-600/50 text-white font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Bell className="w-4 h-4 text-cyan-300" /> Post Announcement
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => onNavigateTab('students')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Manage <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400">Total Enrolled Students</p>
            <h3 className="text-2xl font-black text-white mt-1">{totalStudents}</h3>
            <p className="text-[11px] text-emerald-400 mt-1">Across {totalDepts} Departments</p>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('teachers')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="text-xs text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Manage <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400">Total Faculty Members</p>
            <h3 className="text-2xl font-black text-white mt-1">{totalTeachers}</h3>
            <p className="text-[11px] text-amber-400 mt-1">Professors & Instructors</p>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('fees')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Invoices <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400">Total Fees Collected</p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1 font-mono">
              ${totalFeesCollected.toLocaleString()}
            </h3>
            <p className="text-[11px] text-rose-400 mt-1 font-mono">
              Pending: ${totalFeesPending.toLocaleString()}
            </p>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('attendance')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              View Log <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400">Avg Campus Attendance</p>
            <h3 className="text-2xl font-black text-cyan-400 mt-1">{avgAttendance}%</h3>
            <p className="text-[11px] text-cyan-300/70 mt-1">Daily Average Participation</p>
          </div>
        </div>
      </div>

      {/* Middle Section: Departments Grid & Notices Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 cols: Department Summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" /> Academic Departments
            </h3>
            <button
              onClick={() => onNavigateTab('departments')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              View All ({totalDepts}) →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {departments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => onNavigateTab('departments')}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-bold font-mono">
                    {dept.code}
                  </span>
                  <span className="text-xs text-slate-400">{dept.building}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{dept.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">HOD: {dept.headOfDept}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Students: <strong className="text-slate-200">{dept.studentCount}</strong></span>
                  <span>Teachers: <strong className="text-slate-200">{dept.teacherCount}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 col: Recent Notices */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-400" /> Campus Notices
            </h3>
            <button
              onClick={() => onNavigateTab('notices')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              Post Notice →
            </button>
          </div>

          <div className="space-y-3">
            {notices.slice(0, 4).map((notice) => (
              <div
                key={notice.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      notice.priority === 'high'
                        ? 'bg-rose-500/20 text-rose-300'
                        : notice.priority === 'medium'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-slate-500/20 text-slate-300'
                    }`}
                  >
                    {notice.priority}
                  </span>
                  <span className="text-[11px] text-slate-500">{notice.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-100 leading-snug">{notice.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{notice.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
