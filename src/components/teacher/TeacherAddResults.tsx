import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileSpreadsheet, Save } from 'lucide-react';

export const TeacherAddResults: React.FC = () => {
  const { students, courses, addOrUpdateResult, currentUser, teachers } = useApp();

  const activeTeacher =
    teachers.find((t) => t.id === currentUser?.id || t.teacherId === currentUser?.referenceId) ||
    teachers[0];

  const assignedCourses = courses.filter(
    (c) => c.teacherId === activeTeacher.id || activeTeacher.assignedCourseIds.includes(c.id)
  );

  const [selectedCourseId, setSelectedCourseId] = useState(
    assignedCourses[0]?.id || courses[0]?.id || ''
  );
  const [semester, setSemester] = useState(5);

  // Marks map: { studentId: number }
  const [marksMap, setMarksMap] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    students.forEach((s) => {
      initial[s.id] = 85;
    });
    return initial;
  });

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  const calculateGrade = (marks: number) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B+';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C';
    return 'F';
  };

  const handleSaveMarks = () => {
    if (!selectedCourse) return;

    students.forEach((stu) => {
      const marks = marksMap[stu.id] || 80;
      addOrUpdateResult({
        studentId: stu.id,
        studentName: stu.name,
        rollNo: stu.rollNo,
        subjectId: selectedCourse.id,
        subjectName: selectedCourse.name,
        semester,
        marksObtained: marks,
        maxMarks: 100,
        grade: calculateGrade(marks),
        remarks: `Updated by ${activeTeacher.name}`,
      });
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-purple-400" /> Add & Update Student Results
          </h2>
          <p className="text-xs text-slate-400">Input examination marks for your subject cohort</p>
        </div>

        <button
          onClick={handleSaveMarks}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" /> Save All Marks
        </button>
      </div>

      {/* Selectors */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Subject / Course</label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
          >
            {assignedCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Semester</label>
          <input
            type="number"
            min={1}
            max={8}
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Results Input Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Marks Obtained (out of 100)</th>
                <th className="py-3.5 px-4">Calculated Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {students.map((stu) => {
                const marks = marksMap[stu.id] !== undefined ? marksMap[stu.id] : 85;
                const grade = calculateGrade(marks);

                return (
                  <tr key={stu.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{stu.name}</td>
                    <td className="py-3.5 px-4 font-mono text-cyan-300">{stu.rollNo}</td>
                    <td className="py-3.5 px-4">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={marks}
                        onChange={(e) =>
                          setMarksMap({ ...marksMap, [stu.id]: Number(e.target.value) })
                        }
                        className="w-24 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-white text-xs font-bold focus:outline-none focus:border-purple-500"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold">
                        {grade}
                      </span>
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
