import React from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarCheck } from 'lucide-react';

export const StudentAttendance: React.FC = () => {
  const { currentUser, students, attendance } = useApp();

  const activeStudent =
    students.find((s) => s.id === currentUser?.id || s.rollNo === currentUser?.referenceId) ||
    students[0];

  const myAttendance = attendance.filter((a) => a.studentId === activeStudent.id);

  const presentLogs = myAttendance.filter((a) => a.status === 'present');
  const absentLogs = myAttendance.filter((a) => a.status === 'absent');
  const lateLogs = myAttendance.filter((a) => a.status === 'late');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-cyan-400" /> My Attendance Register
        </h2>
        <p className="text-xs text-slate-400">Subject-wise attendance tracking and attendance logs</p>
      </div>

      {/* Overview percentage card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Attendance Progress</span>
          <div className="flex items-baseline gap-3">
            <h3 className="text-4xl font-black text-cyan-400">{activeStudent.attendancePercent}%</h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                activeStudent.attendancePercent >= 85
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              {activeStudent.attendancePercent >= 85 ? 'Satisfactory Attendance' : 'Low Attendance Warning'}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-950 rounded-full h-3 max-w-md border border-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                activeStudent.attendancePercent >= 85 ? 'bg-cyan-500' : 'bg-rose-500'
              }`}
              style={{ width: `${activeStudent.attendancePercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <p className="text-slate-400 text-[10px]">Present</p>
            <p className="text-lg font-bold text-emerald-400">{presentLogs.length}</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <p className="text-slate-400 text-[10px]">Absent</p>
            <p className="text-lg font-bold text-rose-400">{absentLogs.length}</p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <p className="text-slate-400 text-[10px]">Late</p>
            <p className="text-lg font-bold text-amber-400">{lateLogs.length}</p>
          </div>
        </div>
      </div>

      {/* Attendance Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 font-bold text-white text-sm">
          Class Attendance Log
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Faculty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {myAttendance.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-slate-500">
                    No attendance entries logged yet.
                  </td>
                </tr>
              ) : (
                myAttendance.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400">{log.date}</td>
                    <td className="py-3 px-4 font-semibold text-white">{log.subjectName}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          log.status === 'present'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : log.status === 'absent'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{log.markedBy}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
