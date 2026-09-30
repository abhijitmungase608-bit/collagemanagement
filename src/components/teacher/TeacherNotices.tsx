import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Bell, Plus } from 'lucide-react';

export const TeacherNotices: React.FC = () => {
  const { notices, addNotice, currentUser, teachers } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeTeacher =
    teachers.find((t) => t.id === currentUser?.id || t.teacherId === currentUser?.referenceId) ||
    teachers[0];

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetRole: 'student' as 'all' | 'student' | 'teacher',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    addNotice({
      title: formData.title,
      content: formData.content,
      targetRole: formData.targetRole,
      priority: formData.priority,
      author: activeTeacher.name,
      authorRole: `${activeTeacher.designation}`,
    });
    setFormData({
      title: '',
      content: '',
      targetRole: 'student',
      priority: 'medium',
    });
    setIsModalOpen(false);
  };

  const visibleNotices = notices.filter(
    (n) => n.targetRole === 'all' || n.targetRole === 'teacher'
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-amber-400" /> Faculty Notice Board
          </h2>
          <p className="text-xs text-slate-400">View campus notices & post announcements for your class students</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-600/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Post Class Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {visibleNotices.map((n) => (
          <div key={n.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                  n.priority === 'high'
                    ? 'bg-rose-500/20 text-rose-300'
                    : n.priority === 'medium'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-slate-500/20 text-slate-300'
                }`}
              >
                {n.priority}
              </span>
              <span className="text-[11px] text-slate-500">{n.date}</span>
            </div>

            <h3 className="text-base font-bold text-white leading-snug">{n.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{n.content}</p>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
              Author: <strong className="text-slate-300">{n.author}</strong> ({n.authorRole})
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Post Class Announcement">
        <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Announcement Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Lab Assignment 3 Submission Deadline"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Content</label>
            <textarea
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write announcement details..."
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
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
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
            >
              Post Announcement
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
