import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Printer } from 'lucide-react';

export const StudentResults: React.FC = () => {
  const { currentUser, students, results } = useApp();

  const activeStudent =
    students.find((s) => s.id === currentUser?.id || s.rollNo === currentUser?.referenceId) ||
    students[0];

  const myResults = results.filter((r) => r.studentId === activeStudent.id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between no-print">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-400" /> Academic Results & Grades
          </h2>
          <p className="text-xs text-slate-400">Official semester transcript and grade breakdown</p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
        >
          <Printer className="w-4 h-4 text-cyan-400" /> Print Grade Card
        </button>
      </div>

      {/* CGPA Scorecard */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-xl">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cumulative GPA (CGPA)</span>
          <h3 className="text-3xl font-black text-purple-400 mt-1">{activeStudent.gpa.toFixed(2)} / 4.00</h3>
          <p className="text-xs text-emerald-400 mt-1">Status: Passed • Degree in Progress</p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <Award className="w-9 h-9" />
        </div>
      </div>

      {/* Grade Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 font-bold text-white text-sm flex items-center justify-between">
          <span>Semester Grade Sheet</span>
          <span className="text-xs text-slate-400 font-mono">Roll: {activeStudent.rollNo}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Semester</th>
                <th className="py-3.5 px-4">Marks Obtained</th>
                <th className="py-3.5 px-4">Grade</th>
                <th className="py-3.5 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {myResults.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-500">
                    No examination records found.
                  </td>
                </tr>
              ) : (
                myResults.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{res.subjectName}</td>
                    <td className="py-3.5 px-4">Sem {res.semester}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                      {res.marksObtained} / {res.maxMarks}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold">
                        {res.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 italic">{res.remarks || 'Passed'}</td>
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
