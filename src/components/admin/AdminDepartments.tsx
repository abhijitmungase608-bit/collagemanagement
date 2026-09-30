import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Building2, Plus, Users, UserCheck, MapPin } from 'lucide-react';

export const AdminDepartments: React.FC = () => {
  const { departments, addDepartment } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    headOfDept: '',
    building: '',
  });

  const handleCreateDept = (e: React.FormEvent) => {
    e.preventDefault();
    addDepartment(formData);
    setFormData({ code: '', name: '', headOfDept: '', building: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-400" /> Academic Departments
          </h2>
          <p className="text-xs text-slate-400">Department structures, heads of department, and building locations</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((d) => (
          <div
            key={d.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/30 font-mono font-bold text-indigo-300 text-xs">
                {d.code}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{d.building}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{d.name}</h3>
              <p className="text-xs text-slate-400 mt-1">Head of Dept: <strong className="text-slate-200">{d.headOfDept}</strong></p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <Users className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Enrolled</p>
                  <p className="text-sm font-bold text-white">{d.studentCount} Students</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <UserCheck className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Faculty</p>
                  <p className="text-sm font-bold text-white">{d.teacherCount} Teachers</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Department">
        <form onSubmit={handleCreateDept} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Department Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g. AI-ML"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Building Wing / Location</label>
              <input
                type="text"
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                placeholder="e.g. Innovation Center B"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Full Department Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Artificial Intelligence & Data Science"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Head of Department (HOD)</label>
            <input
              type="text"
              value={formData.headOfDept}
              onChange={(e) => setFormData({ ...formData, headOfDept: e.target.value })}
              placeholder="Dr. John von Neumann"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
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
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
            >
              Create Department
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
