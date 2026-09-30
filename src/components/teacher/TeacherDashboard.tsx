import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Users, CheckSquare, FileSpreadsheet, Bell, ArrowRight } from 'lucide-react';

interface TeacherDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigateTab }) => {
  const { currentUser, teachers, courses, students, notices } = useApp();

  const activeTeacher =
    teachers.find((t) => t.id === currentUser?.id || t.teacherId === currentUser?.referenceId) ||
    teachers[0];

  const assignedCourses = courses.filter(
    (c) => c.teacherId === activeTeacher.id || activeTeacher.assignedCourseIds.includes(c.id)
  );

  const teacherNotices = notices.filter((n) => n.targetRole === 'all' || n.targetRole === 'teacher');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-900 via-indigo-900 to-slate-900 border border-amber-700/40 p-6 lg:p-8 shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <img
              src={activeTeacher.avatar}
              alt={activeTeacher.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400/60 shadow-xl"
            />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold mb-1">
                👨‍🏫 Faculty Portal
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
                Welcome, {activeTeacher.name}!
              </h2>
              <p className="text-xs text-amber-200/80 mt-1">
                {activeTeacher.designation} • {activeTeacher.departmentName}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('attendance')}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all self-start md:self-auto"
          >
            Mark Daily Attendance <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div
          onClick={() => onNavigateTab('students')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              View List <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400">Enrolled Students</p>
            <h3 className="text-2xl font-black text-white mt-1">{students.length}</h3>
            <p className="text-[11px] text-amber-300 mt-1">Across Assigned Classes</p>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('attendance')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <CheckSquare className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
              Mark <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400">Assigned Courses</p>
            <h3 className="text-2xl font-black text-cyan-400 mt-1">{assignedCourses.length}</h3>
            <p className="text-[11px] text-cyan-300/70 mt-1">Active Teaching Subjects</p>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('results')}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
              Update <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-400">Grading Matrix</p>
            <h3 className="text-2xl font-black text-purple-400 mt-1">Grade Entry</h3>
            <p className="text-[11px] text-slate-400 mt-1">Add or Update Marks</p>
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" /> My Teaching Courses
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {assignedCourses.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs">
                  {c.code}
                </span>
                <h4 className="text-base font-bold text-white">{c.name}</h4>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Semester {c.semester}</span>
                  <span>{c.credits} Credit Hours</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" /> Faculty Notices
          </h3>

          <div className="space-y-3">
            {teacherNotices.slice(0, 3).map((n) => (
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
