import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../Modal';
import { User, Mail, Phone, Calendar, Award, Building2, BookOpen, Edit, Camera, Sparkles, Check, Upload } from 'lucide-react';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
];

export const TeacherProfile: React.FC = () => {
  const { currentUser, teachers, courses, updateTeacher } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const activeTeacher =
    teachers.find((t) => t.id === currentUser?.id || t.teacherId === currentUser?.referenceId) ||
    teachers[0];

  const assignedCourses = courses.filter(
    (c) => c.teacherId === activeTeacher.id || activeTeacher.assignedCourseIds.includes(c.id)
  );

  const [formData, setFormData] = useState({
    name: activeTeacher.name,
    email: activeTeacher.email,
    phone: activeTeacher.phone,
    designation: activeTeacher.designation,
    qualification: activeTeacher.qualification,
    avatar: activeTeacher.avatar || '',
  });

  const handleOpenModal = () => {
    setFormData({
      name: activeTeacher.name,
      email: activeTeacher.email,
      phone: activeTeacher.phone,
      designation: activeTeacher.designation,
      qualification: activeTeacher.qualification,
      avatar: activeTeacher.avatar || '',
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateTeacher({
      ...activeTeacher,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      designation: formData.designation,
      qualification: formData.qualification,
      avatar: formData.avatar,
    });
    setIsEditModalOpen(false);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-amber-400" /> Faculty Profile
          </h2>
          <p className="text-xs text-slate-400">Teacher credentials, department position, and assigned curriculum subjects</p>
        </div>

        <button
          onClick={handleOpenModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-600/25 transition-all self-start sm:self-auto"
        >
          <Edit className="w-4 h-4" /> Edit Profile & Photo
        </button>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
          <div className="relative group">
            <img
              src={activeTeacher.avatar}
              alt={activeTeacher.name}
              className="w-24 h-24 rounded-3xl object-cover border-4 border-amber-500/40 shadow-xl"
            />
            <button
              onClick={handleOpenModal}
              title="Change Profile Photo"
              className="absolute inset-0 bg-slate-950/60 rounded-3xl flex items-center justify-center text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="w-6 h-6" />
            </button>
          </div>
          <div className="text-center sm:text-left space-y-1">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 font-mono font-bold text-xs">
              ID: {activeTeacher.teacherId}
            </span>
            <h3 className="text-2xl font-extrabold text-white">{activeTeacher.name}</h3>
            <p className="text-sm font-semibold text-amber-400">{activeTeacher.designation}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">Academic Details</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-500" /> Department:</span>
                <span className="font-semibold text-white">{activeTeacher.departmentName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><Award className="w-4 h-4 text-slate-500" /> Qualification:</span>
                <span className="font-semibold text-white">{activeTeacher.qualification}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-500" /> Appointment Date:</span>
                <span className="font-mono text-white">{activeTeacher.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">Contact Info</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-500" /> Office Email:</span>
                <span className="font-semibold text-white">{activeTeacher.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><Phone className="w-4 h-4 text-slate-500" /> Phone:</span>
                <span className="font-semibold text-white">{activeTeacher.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" /> Assigned Teaching Subjects ({assignedCourses.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {assignedCourses.map((c) => (
              <div key={c.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-xs">{c.name}</p>
                  <p className="text-[11px] font-mono text-amber-300">{c.code}</p>
                </div>
                <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 font-bold">{c.credits} Credits</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Update Faculty Profile & Photo">
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          {/* Avatar Selector Presets & URL */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <label className="block text-slate-300 font-semibold flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-400" /> Profile Photo (Avatar)
            </label>

            <div className="flex items-center gap-4">
              <img
                src={formData.avatar}
                alt="Avatar Preview"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md shrink-0"
              />
              <div className="flex-1 space-y-2">
                <div>
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs cursor-pointer shadow-md transition-colors">
                    <Upload className="w-3.5 h-3.5" /> Choose Photo from Device
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-400 ml-2">Upload any image file</span>
                </div>
                <div>
                  <input
                    type="url"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="Or paste image URL (https://...)"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900 space-y-1.5">
              <p className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Pick From Curated Faculty Avatars
              </p>
              <div className="flex flex-wrap gap-2">
                {AVATAR_PRESETS.map((presetUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar: presetUrl })}
                    className={`relative w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                      formData.avatar === presetUrl ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/30' : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={presetUrl} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                    {formData.avatar === presetUrl && (
                      <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <label className="block text-slate-300 font-semibold mb-1">Office Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Qualification</label>
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-amber-600/30"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
