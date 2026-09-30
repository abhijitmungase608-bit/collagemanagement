import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../Modal';
import { Bell, Plus, Trash2 } from 'lucide-react';

export const AdminNotices: React.FC = () => {
  const { notices, addNotice, deleteNotice, currentUser } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetRole: 'all' as 'all' | 'student' | 'teacher',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    addNotice({
      title: formData.title,
      content: formData.content,
      targetRole: formData.targetRole,
      priority: formData.priority,
      author: currentUser ? currentUser.name : 'College Administration',
      authorRole: 'Admin Office',
    });
    setFormData({
      title: '',
      content: '',
      targetRole: 'all',
      priority: 'medium',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-amber-400" /> College Notice Board
          </h2>
          <p className="text-xs text-slate-400">Broadcast official circulars, exam notices, and event announcements</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-600/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Post New Announcement
        </button>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {notices.map((n) => (
          <div
            key={n.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      n.priority === 'high'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : n.priority === 'medium'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                    }`}
                  >
                    {n.priority} priority
                  </span>

                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-[10px] font-semibold uppercase">
                    Audience: {n.targetRole}
                  </span>
                </div>

                <button
                  onClick={() => deleteNotice(n.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">{n.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{n.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>By: {n.author} ({n.authorRole})</span>
              <span>{n.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Notice Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Publish Official Circular">
        <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Notice Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Schedule for Semester Examinations"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Notice Description / Content</label>
            <textarea
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Detailed announcement text..."
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Audience</label>
              <select
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              >
                <option value="all">Everyone (All Students & Faculty)</option>
                <option value="student">Students Only</option>
                <option value="teacher">Faculty Members Only</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Priority Level</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High (Urgent)</option>
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
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
            >
              Post Notice
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
