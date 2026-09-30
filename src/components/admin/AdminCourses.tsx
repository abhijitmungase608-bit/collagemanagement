import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../Modal';
import { BookOpen, Plus, UserCheck } from 'lucide-react';

export const AdminCourses: React.FC = () => {
  const { courses, departments, teachers, addCourse } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    departmentId: departments[0]?.id || '',
    credits: 4,
    semester: 3,
    teacherId: teachers[0]?.id || '',
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const teacherObj = teachers.find((t) => t.id === formData.teacherId);
    addCourse({
      ...formData,
      teacherName: teacherObj ? teacherObj.name : 'Unassigned',
    });
    setFormData({
      code: '',
      name: '',
      departmentId: departments[0]?.id || '',
      credits: 4,
      semester: 3,
      teacherId: teachers[0]?.id || '',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-cyan-400" /> Course Catalog
          </h2>
          <p className="text-xs text-slate-400">Curriculum subjects, credit values, and assigned instructor mapping</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((crs) => {
          const dept = departments.find((d) => d.id === crs.departmentId);

          return (
            <div
              key={crs.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-xs">
                    {crs.code}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-amber-400">
                    {crs.credits} Credits
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{crs.name}</h3>
                <p className="text-xs text-slate-400">
                  Department: <strong className="text-slate-200">{dept?.name || 'General'}</strong>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <span>{crs.teacherName || 'Instructor Unassigned'}</span>
                </div>
                <span>Sem {crs.semester}</span>
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Course to Syllabus">
        <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Course Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g. CS204"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Credits</label>
              <input
                type="number"
                min={1}
                max={6}
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Course Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Operating System Architecture"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Department</label>
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Assign Teacher</label>
              <select
                value={formData.teacherId}
                onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              >
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
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
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
            >
              Add Course
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
