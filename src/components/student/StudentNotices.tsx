import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell } from 'lucide-react';

export const StudentNotices: React.FC = () => {
  const { notices } = useApp();

  const studentNotices = notices.filter(
    (n) => n.targetRole === 'all' || n.targetRole === 'student'
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-amber-400" /> Student Notice Board
        </h2>
        <p className="text-xs text-slate-400">Official college notifications, event updates, and exam circulars</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {studentNotices.map((n) => (
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
                {n.priority} priority
              </span>
              <span className="text-[11px] text-slate-500">{n.date}</span>
            </div>

            <h3 className="text-base font-bold text-white leading-snug">{n.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{n.content}</p>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
              Published by: <strong className="text-slate-300">{n.author}</strong> ({n.authorRole})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
