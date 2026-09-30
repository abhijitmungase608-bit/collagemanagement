import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../Modal';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Building2, BookOpen, Edit, Camera, Sparkles, Check, Upload } from 'lucide-react';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
];

export const StudentProfile: React.FC = () => {
  const { currentUser, students, updateStudent } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const activeStudent =
    students.find((s) => s.id === currentUser?.id || s.rollNo === currentUser?.referenceId) ||
    students[0];

  const [formData, setFormData] = useState({
    name: activeStudent.name,
    email: activeStudent.email,
    phone: activeStudent.phone,
    avatar: activeStudent.avatar || '',
    address: activeStudent.address || '',
    dob: activeStudent.dob || '2003-04-12',
  });

  const handleOpenModal = () => {
    setFormData({
      name: activeStudent.name,
      email: activeStudent.email,
      phone: activeStudent.phone,
      avatar: activeStudent.avatar || '',
      address: activeStudent.address || '',
      dob: activeStudent.dob || '2003-04-12',
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent({
      ...activeStudent,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: formData.avatar,
      address: formData.address,
      dob: formData.dob,
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
            <User className="w-6 h-6 text-cyan-400" /> My Academic Profile
          </h2>
          <p className="text-xs text-slate-400">Personal details, roll number, and enrolled degree information</p>
        </div>

        <button
          onClick={handleOpenModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/25 transition-all self-start sm:self-auto"
        >
          <Edit className="w-4 h-4" /> Edit Profile & Photo
        </button>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
          <div className="relative group">
            <img
              src={activeStudent.avatar}
              alt={activeStudent.name}
              className="w-24 h-24 rounded-3xl object-cover border-4 border-cyan-500/40 shadow-xl"
            />
            <button
              onClick={handleOpenModal}
              title="Change Profile Photo"
              className="absolute inset-0 bg-slate-950/60 rounded-3xl flex items-center justify-center text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="w-6 h-6" />
            </button>
          </div>
          <div className="text-center sm:text-left space-y-1">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono font-bold text-xs">
              {activeStudent.rollNo}
            </span>
            <h3 className="text-2xl font-extrabold text-white">{activeStudent.name}</h3>
            <p className="text-sm text-slate-400">{activeStudent.courseName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">Academic Details</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-500" /> Department:</span>
                <span className="font-semibold text-white">{activeStudent.departmentName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-slate-500" /> Course:</span>
                <span className="font-semibold text-white">{activeStudent.courseName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-slate-500" /> Academic Year:</span>
                <span className="font-semibold text-white">Year {activeStudent.year} (Sem {activeStudent.semester})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-500" /> Enrollment Date:</span>
                <span className="font-mono text-white">{activeStudent.enrollmentDate}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">Personal & Contact Info</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-500" /> Email:</span>
                <span className="font-semibold text-white">{activeStudent.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><Phone className="w-4 h-4 text-slate-500" /> Phone:</span>
                <span className="font-semibold text-white">{activeStudent.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-500" /> Date of Birth:</span>
                <span className="font-semibold text-white">{activeStudent.dob || '2003-04-12'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-500" /> Address:</span>
                <span className="font-semibold text-white truncate max-w-[180px]">{activeStudent.address || 'Campus Dorm Block A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Update Profile & Photo">
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          {/* Avatar Selector Presets & File Upload */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <label className="block text-slate-300 font-semibold flex items-center gap-2">
              <Camera className="w-4 h-4 text-cyan-400" /> Profile Photo (Avatar)
            </label>

            {/* Current avatar preview & Upload options */}
            <div className="flex items-center gap-4">
              <img
                src={formData.avatar}
                alt="Avatar Preview"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-md shrink-0"
              />
              <div className="flex-1 space-y-2">
                <div>
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer shadow-md transition-colors">
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
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Avatar Preset Grid */}
            <div className="pt-2 border-t border-slate-900 space-y-1.5">
              <p className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Pick From Curated Avatars
              </p>
              <div className="flex flex-wrap gap-2">
                {AVATAR_PRESETS.map((presetUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar: presetUrl })}
                    className={`relative w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                      formData.avatar === presetUrl ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/30' : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={presetUrl} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                    {formData.avatar === presetUrl && (
                      <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
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
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Residential Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
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
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-cyan-600/30"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
