import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Teacher } from '../../types';
import { Modal } from '../Modal';
import { UserCheck, Search, Plus, Edit2, Trash2, Mail, Phone, BookOpen, Award } from 'lucide-react';

export const TeacherManagement: React.FC = () => {
  const { teachers, departments, courses, addTeacher, updateTeacher, deleteTeacher } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const [formData, setFormData] = useState({
    teacherId: '',
    name: '',
    email: '',
    phone: '',
    departmentId: departments[0]?.id || '',
    designation: 'Assistant Professor',
    qualification: 'Ph.D. in Computer Science',
    joinedDate: new Date().toISOString().split('T')[0],
  });

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'all' || t.departmentId === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleOpenAddModal = () => {
    const autoId = `TCH-10${teachers.length + 1}`;
    setFormData({
      teacherId: autoId,
      name: '',
      email: '',
      phone: '',
      departmentId: departments[0]?.id || '',
      designation: 'Assistant Professor',
      qualification: 'Ph.D. in Engineering',
      joinedDate: new Date().toISOString().split('T')[0],
    });
    setIsAddModalOpen(true);
  };

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const deptObj = departments.find((d) => d.id === formData.departmentId);
    addTeacher({
      ...formData,
      departmentName: deptObj ? deptObj.name : 'Engineering',
      assignedCourseIds: [],
    });
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;
    const deptObj = departments.find((d) => d.id === formData.departmentId);
    updateTeacher({
      ...editingTeacher,
      ...formData,
      departmentName: deptObj ? deptObj.name : editingTeacher.departmentName,
    });
    setEditingTeacher(null);
  };

  const handleStartEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      teacherId: teacher.teacherId,
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      departmentId: teacher.departmentId,
      designation: teacher.designation,
      qualification: teacher.qualification,
      joinedDate: teacher.joinedDate,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-amber-400" /> Faculty Management
          </h2>
          <p className="text-xs text-slate-400">View, appoint and update college professors and instructors</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-600/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Appoint Faculty Member
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search faculty by name, ID or email..."
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

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTeachers.map((tch) => {
          const assignedCourses = courses.filter((c) => c.teacherId === tch.id);

          return (
            <div
              key={tch.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={tch.avatar}
                    alt={tch.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-500/40"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">{tch.name}</h3>
                    <p className="text-xs text-amber-400 font-semibold">{tch.designation}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-800 font-mono text-[10px] text-slate-300">
                      ID: {tch.teacherId}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartEdit(tch)}
                    className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteTeacher(tch.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{tch.qualification}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{tch.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{tch.phone}</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Assigned Subjects (
                  {assignedCourses.length}):
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {assignedCourses.length === 0 ? (
                    <span className="text-[11px] text-slate-500 italic">No active subjects assigned</span>
                  ) : (
                    assignedCourses.map((c) => (
                      <span
                        key={c.id}
                        className="px-2 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-medium"
                      >
                        {c.code} - {c.name}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Teacher Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Appoint Faculty Member">
        <form onSubmit={handleCreateTeacher} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Teacher ID</label>
              <input
                type="text"
                value={formData.teacherId}
                onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. Jane Smith"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane.smith@apexcollege.edu"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Department</label>
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
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
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Teacher Modal */}
      <Modal isOpen={!!editingTeacher} onClose={() => setEditingTeacher(null)} title="Edit Faculty Profile">
        <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Teacher ID</label>
              <input
                type="text"
                value={formData.teacherId}
                onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Designation</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Qualification</label>
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingTeacher(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
            >
              Update Faculty
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
