import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Award, Plus, Search } from 'lucide-react';

export const AdminResults: React.FC = () => {
  const { results, students, courses, addOrUpdateResult } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    studentId: students[0]?.id || '',
    subjectId: courses[0]?.id || '',
    semester: 5,
    marksObtained: 85,
    maxMarks: 100,
    remarks: 'Good progress',
  });

  const filteredResults = results.filter((r) => {
    return (
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const calculateGrade = (marks: number) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B+';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C';
    return 'F';
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    const studentObj = students.find((s) => s.id === formData.studentId);
    const courseObj = courses.find((c) => c.id === formData.subjectId);
    if (!studentObj || !courseObj) return;

    addOrUpdateResult({
      studentId: studentObj.id,
      studentName: studentObj.name,
      rollNo: studentObj.rollNo,
      subjectId: courseObj.id,
      subjectName: courseObj.name,
      semester: formData.semester,
      marksObtained: formData.marksObtained,
      maxMarks: formData.maxMarks,
      grade: calculateGrade(formData.marksObtained),
      remarks: formData.remarks,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-400" /> Exam Results & Transcripts
          </h2>
          <p className="text-xs text-slate-400">View and update student examination grades and GPA records</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add / Update Result
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search result by student name, roll number, subject..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Semester</th>
                <th className="py-3.5 px-4">Marks</th>
                <th className="py-3.5 px-4">Grade</th>
                <th className="py-3.5 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredResults.map((res) => (
                <tr key={res.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">{res.studentName}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{res.rollNo}</td>
                  <td className="py-3 px-4 font-medium">{res.subjectName}</td>
                  <td className="py-3 px-4">Semester {res.semester}</td>
                  <td className="py-3 px-4 font-mono font-bold text-white">
                    {res.marksObtained} / {res.maxMarks}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                      {res.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 italic">{res.remarks || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Student Grade">
        <form onSubmit={handleSaveResult} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Select Student</label>
            <select
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.rollNo})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Select Subject</label>
            <select
              value={formData.subjectId}
              onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Marks Obtained (out of 100)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={formData.marksObtained}
                onChange={(e) => setFormData({ ...formData, marksObtained: Number(e.target.value) })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Semester</label>
              <input
                type="number"
                min={1}
                max={8}
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Remarks</label>
            <input
              type="text"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              placeholder="e.g. Excellent work on practicals"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
            >
              Save Grade
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
