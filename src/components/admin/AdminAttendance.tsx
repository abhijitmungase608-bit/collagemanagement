import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarCheck, Search, CheckCircle, XCircle, Clock } from 'lucide-react';

export const AdminAttendance: React.FC = () => {
  const { attendance, courses } = useApp();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttendance = attendance.filter((rec) => {
    const matchesSubject = selectedSubject === 'all' || rec.subjectId === selectedSubject;
    const matchesDate = !selectedDate || rec.date === selectedDate;
    const matchesSearch =
      rec.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesDate && matchesSearch;
  });

  const presentCount = attendance.filter((a) => a.status === 'present').length;
  const absentCount = attendance.filter((a) => a.status === 'absent').length;
  const lateCount = attendance.filter((a) => a.status === 'late').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-cyan-400" /> Attendance Master Register
        </h2>
        <p className="text-xs text-slate-400">Campus-wide daily attendance logs marked by subject faculty</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Total Present Marks</p>
            <h3 className="text-xl font-bold text-emerald-400">{presentCount}</h3>
          </div>
          <CheckCircle className="w-8 h-8 text-emerald-500/30" />
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Total Absent Marks</p>
            <h3 className="text-xl font-bold text-rose-400">{absentCount}</h3>
          </div>
          <XCircle className="w-8 h-8 text-rose-500/30" />
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Late Arrivals</p>
            <h3 className="text-xl font-bold text-amber-400">{lateCount}</h3>
          </div>
          <Clock className="w-8 h-8 text-amber-500/30" />
        </div>
      </div>

      {/* Search & Filter */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student or roll no..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Subjects</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Marked By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">
                    No attendance records found for selected filter.
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400">{rec.date}</td>
                    <td className="py-3 px-4 font-mono font-medium text-cyan-300">{rec.rollNo}</td>
                    <td className="py-3 px-4 font-semibold text-white">{rec.studentName}</td>
                    <td className="py-3 px-4">{rec.subjectName}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          rec.status === 'present'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : rec.status === 'absent'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {rec.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{rec.markedBy}</td>
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
