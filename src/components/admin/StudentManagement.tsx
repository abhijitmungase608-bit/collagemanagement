import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Student } from '../../types';
import { Modal } from '../Modal';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  Building,
} from 'lucide-react';

export const StudentManagement: React.FC = () => {
  const { students, departments, courses, addStudent, updateStudent, deleteStudent } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    email: '',
    phone: '',
    departmentId: departments[0]?.id || '',
    courseId: courses[0]?.id || '',
    year: 1,
    semester: 1,
    attendancePercent: 85,
    gpa: 3.5,
    totalFees: 4000,
    address: '',
    dob: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'all' || s.departmentId === selectedDept;
    const matchesYear = selectedYear === 'all' || s.year.toString() === selectedYear;

    return matchesSearch && matchesDept && matchesYear;
  });

  const handleOpenAddModal = () => {
    const autoRoll = `STU-2024-00${students.length + 1}`;
    setFormData({
      rollNo: autoRoll,
      name: '',
      email: '',
      phone: '',
      departmentId: departments[0]?.id || '',
      courseId: courses[0]?.id || '',
      year: 1,
      semester: 1,
      attendancePercent: 85,
      gpa: 3.5,
      totalFees: 4000,
      address: '',
      dob: '2004-05-15',
      enrollmentDate: new Date().toISOString().split('T')[0],
    });
    setIsAddModalOpen(true);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const deptObj = departments.find((d) => d.id === formData.departmentId);
    const crsObj = courses.find((c) => c.id === formData.courseId);

    addStudent({
      ...formData,
      departmentName: deptObj ? deptObj.name : 'Engineering',
      courseName: crsObj ? crsObj.name : 'B.Tech',
    });
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    const deptObj = departments.find((d) => d.id === formData.departmentId);
    const crsObj = courses.find((c) => c.id === formData.courseId);

    updateStudent({
      ...editingStudent,
      ...formData,
      departmentName: deptObj ? deptObj.name : editingStudent.departmentName,
      courseName: crsObj ? crsObj.name : editingStudent.courseName,
    });
    setEditingStudent(null);
  };

  const handleStartEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      rollNo: student.rollNo,
      name: student.name,
      email: student.email,
      phone: student.phone,
      departmentId: student.departmentId,
      courseId: student.courseId,
      year: student.year,
      semester: student.semester,
      attendancePercent: student.attendancePercent,
      gpa: student.gpa,
      totalFees: student.totalFees,
      address: student.address || '',
      dob: student.dob || '',
      enrollmentDate: student.enrollmentDate,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" /> Student Management
          </h2>
          <p className="text-xs text-slate-400">View, register, search and update student records</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Student
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, roll no, email..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Academic Years</option>
            <option value="1">Year 1 (Freshman)</option>
            <option value="2">Year 2 (Sophomore)</option>
            <option value="3">Year 3 (Junior)</option>
            <option value="4">Year 4 (Senior)</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Year / Sem</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">GPA</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    No students match your query.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((stu) => (
                  <tr key={stu.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={stu.avatar}
                          alt={stu.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <p className="font-semibold text-white">{stu.name}</p>
                          <p className="text-[11px] text-slate-400">{stu.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-cyan-300">
                      {stu.rollNo}
                    </td>
                    <td className="py-3 px-4">{stu.departmentName}</td>
                    <td className="py-3 px-4">Year {stu.year} • Sem {stu.semester}</td>
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
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setViewingStudent(stu)}
                        title="View Details"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStartEdit(stu)}
                        title="Edit Student"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteStudent(stu.id)}
                        title="Delete Student"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Student">
        <form onSubmit={handleCreateStudent} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Roll Number</label>
              <input
                type="text"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. John Doe"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@student.apexcollege.edu"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-1111"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Department</label>
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Course</label>
              <select
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Academic Year</label>
              <input
                type="number"
                min={1}
                max={4}
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
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
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
            >
              Save Student
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      <Modal isOpen={!!editingStudent} onClose={() => setEditingStudent(null)} title="Edit Student Profile">
        <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Roll Number</label>
              <input
                type="text"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">GPA</label>
              <input
                type="number"
                step="0.01"
                min={0}
                max={4.0}
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingStudent(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
            >
              Update Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* View Details Drawer/Modal */}
      {viewingStudent && (
        <Modal isOpen={!!viewingStudent} onClose={() => setViewingStudent(null)} title="Student Info Card">
          <div className="space-y-6 text-slate-200 text-xs">
            <div className="flex items-center gap-4">
              <img
                src={viewingStudent.avatar}
                alt={viewingStudent.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{viewingStudent.name}</h3>
                <p className="text-cyan-300 font-mono font-semibold">{viewingStudent.rollNo}</p>
                <p className="text-slate-400">{viewingStudent.courseName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>{viewingStudent.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>{viewingStudent.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-400" />
                <span>{viewingStudent.departmentName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Enrolled: {viewingStudent.enrollmentDate}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
