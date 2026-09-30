import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search } from 'lucide-react';

export const TeacherStudentList: React.FC = () => {
  const { students, departments } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'all' || s.departmentId === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-amber-400" /> Student List
        </h2>
        <p className="text-xs text-slate-400">View students enrolled in your teaching subjects and departments</p>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student by name or roll number..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Year / Sem</th>
                <th className="py-3.5 px-4">Attendance %</th>
                <th className="py-3.5 px-4">GPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={stu.avatar}
                        alt={stu.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <p className="font-semibold text-white">{stu.name}</p>
                        <p className="text-[11px] text-slate-400">{stu.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-amber-300">{stu.rollNo}</td>
                  <td className="py-3 px-4">{stu.departmentName}</td>
                  <td className="py-3 px-4">Year {stu.year} (Sem {stu.semester})</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        stu.attendancePercent >= 85
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {stu.attendancePercent}%
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-amber-400">{stu.gpa.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
