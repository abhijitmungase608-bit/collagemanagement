import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckSquare, Check, X, Clock, Save, Sparkles } from 'lucide-react';

export const TeacherMarkAttendance: React.FC = () => {
  const { students, courses, markAttendance, currentUser, teachers } = useApp();

  const activeTeacher =
    teachers.find((t) => t.id === currentUser?.id || t.teacherId === currentUser?.referenceId) ||
    teachers[0];

  const assignedCourses = courses.filter(
    (c) => c.teacherId === activeTeacher.id || activeTeacher.assignedCourseIds.includes(c.id)
  );

  const [selectedSubjectId, setSelectedSubjectId] = useState(
    assignedCourses[0]?.id || courses[0]?.id || ''
  );
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Attendance status map: { studentId: 'present' | 'absent' | 'late' }
  const [statusMap, setStatusMap] = useState<Record<string, 'present' | 'absent' | 'late'>>(() => {
    const initial: Record<string, 'present' | 'absent' | 'late'> = {};
    students.forEach((s) => {
      initial[s.id] = 'present';
    });
    return initial;
  });

  const selectedCourse = courses.find((c) => c.id === selectedSubjectId);

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setStatusMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, 'present' | 'absent' | 'late'> = {};
    students.forEach((s) => {
      updated[s.id] = 'present';
    });
    setStatusMap(updated);
  };

  const handleSave = () => {
    if (!selectedCourse) return;

    const records = students.map((s) => ({
      studentId: s.id,
      studentName: s.name,
      rollNo: s.rollNo,
      subjectId: selectedCourse.id,
      subjectName: selectedCourse.name,
      date,
      status: statusMap[s.id] || 'present',
      markedBy: activeTeacher.name,
    }));

    markAttendance(records);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-amber-400" /> Mark Class Attendance
          </h2>
          <p className="text-xs text-slate-400">Select course and date, then mark student attendance</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkAllPresent}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" /> Mark All Present
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-600/25 transition-all"
          >
            <Save className="w-4 h-4" /> Save Attendance Sheet
          </button>
        </div>
      </div>

      {/* Course & Date Picker */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Teaching Subject / Course</label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {assignedCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Attendance Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Attendance Sheet Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 font-bold text-white text-sm flex items-center justify-between">
          <span>Class Roll Call ({students.length} Students)</span>
          <span className="text-xs text-amber-400 font-mono">{selectedCourse?.code} • {date}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4 text-center">Mark Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {students.map((stu) => {
                const currentStatus = statusMap[stu.id] || 'present';

                return (
                  <tr key={stu.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={stu.avatar}
                          alt={stu.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <span className="font-bold text-white">{stu.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-cyan-300">{stu.rollNo}</td>
                    <td className="py-3.5 px-4 text-slate-400">{stu.departmentName}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(stu.id, 'present')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                            currentStatus === 'present'
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" /> Present
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(stu.id, 'absent')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                            currentStatus === 'absent'
                              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          <X className="w-3.5 h-3.5" /> Absent
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(stu.id, 'late')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                            currentStatus === 'late'
                              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" /> Late
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
