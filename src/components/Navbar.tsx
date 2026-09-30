import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from './Modal';
import {
  GraduationCap,
  Shield,
  UserCheck,
  LogOut,
  ChevronDown,
  Menu,
  Sparkles,
  Camera,
  Edit,
  Check,
  Upload,
} from 'lucide-react';

const ADMIN_AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
];

interface NavbarProps {
  onToggleSidebar?: () => void;
  onNavigateLanding?: () => void;
  onNavigateProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  onNavigateLanding,
  onNavigateProfile,
}) => {
  const { role, currentUser, loginAsAdmin, loginAsStudent, loginAsTeacher, updateAdminProfile, logout } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [adminFormData, setAdminFormData] = useState({
    name: currentUser?.name || 'System Admin',
    email: currentUser?.email || 'admin@apexcollege.edu',
    avatar: currentUser?.avatar || ADMIN_AVATAR_PRESETS[0],
  });

  const getRoleBadge = () => {
    switch (role) {
      case 'admin':
        return {
          label: 'Admin Portal',
          color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          icon: Shield,
        };
      case 'teacher':
        return {
          label: 'Faculty Portal',
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          icon: UserCheck,
        };
      case 'student':
        return {
          label: 'Student Portal',
          color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          icon: GraduationCap,
        };
      default:
        return {
          label: 'Guest',
          color: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
          icon: GraduationCap,
        };
    }
  };

  const badge = getRoleBadge();
  const BadgeIcon = badge.icon;

  const handleUserClick = () => {
    if (role === 'admin') {
      setAdminFormData({
        name: currentUser?.name || 'System Admin',
        email: currentUser?.email || 'admin@apexcollege.edu',
        avatar: currentUser?.avatar || ADMIN_AVATAR_PRESETS[0],
      });
      setIsAdminModalOpen(true);
    } else if (onNavigateProfile) {
      onNavigateProfile();
    }
  };

  const handleAdminImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAdminFormData((prev) => ({ ...prev, avatar: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAdminProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminProfile(adminFormData);
    setIsAdminModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            <div
              onClick={onNavigateLanding}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-wide group-hover:text-indigo-300 transition-colors">
                  Apex Institute
                </h1>
                <p className="text-xs text-slate-400 font-medium">College Management System</p>
              </div>
            </div>
          </div>

          {/* Right side role indicator & quick switch */}
          <div className="flex items-center gap-3">
            {/* Active Role Badge */}
            <div
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${badge.color}`}
            >
              <BadgeIcon className="w-3.5 h-3.5" />
              <span>{badge.label}</span>
            </div>

            {/* Quick Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden md:inline">Switch Role:</span>
                <span className="font-bold text-indigo-300 capitalize">{role}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Test Portal Switch
                  </div>
                  <button
                    onClick={() => {
                      loginAsAdmin();
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      role === 'admin'
                        ? 'bg-purple-600/20 text-purple-300'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span>Admin Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      loginAsTeacher('TCH-101');
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      role === 'teacher'
                        ? 'bg-amber-600/20 text-amber-300'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>Teacher Portal (Dr. Vance)</span>
                  </button>
                  <button
                    onClick={() => {
                      loginAsStudent('STU-2024-001');
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      role === 'student'
                        ? 'bg-cyan-600/20 text-cyan-300'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <span>Student Portal (Alex Johnson)</span>
                  </button>
                </div>
              )}
            </div>

            {/* User Avatar & Profile Edit trigger */}
            {currentUser && (
              <div
                onClick={handleUserClick}
                title="Click to view/edit profile"
                className="flex items-center gap-3 pl-2 border-l border-slate-800 cursor-pointer hover:opacity-90 transition-opacity group"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-slate-800 overflow-hidden border border-indigo-500/40 group-hover:border-indigo-400 transition-colors">
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-indigo-400">
                        {currentUser.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-slate-900 border border-slate-700 text-indigo-400">
                    <Edit className="w-2.5 h-2.5" />
                  </div>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-semibold text-white leading-tight group-hover:text-indigo-300 transition-colors">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {currentUser.referenceId || currentUser.email}
                  </p>
                </div>
              </div>
            )}

            {/* Logout / Switch Role button */}
            <button
              onClick={() => {
                if (onNavigateLanding) {
                  onNavigateLanding();
                } else {
                  logout();
                }
              }}
              title="Log Out / Main Menu"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Admin Profile Modal */}
      <Modal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} title="Update Admin Profile & Photo">
        <form onSubmit={handleSaveAdminProfile} className="space-y-4 text-xs">
          <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <label className="block text-slate-300 font-semibold flex items-center gap-2">
              <Camera className="w-4 h-4 text-purple-400" /> Admin Profile Photo
            </label>

            <div className="flex items-center gap-4">
              <img
                src={adminFormData.avatar}
                alt="Admin Avatar Preview"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-400 shadow-md shrink-0"
              />
              <div className="flex-1 space-y-2">
                <div>
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-md transition-colors">
                    <Upload className="w-3.5 h-3.5" /> Choose Photo from Device
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAdminImageFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-400 ml-2">Upload any image file</span>
                </div>
                <div>
                  <input
                    type="url"
                    value={adminFormData.avatar}
                    onChange={(e) => setAdminFormData({ ...adminFormData, avatar: e.target.value })}
                    placeholder="Or paste image URL (https://...)"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900 space-y-1.5">
              <p className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" /> Admin Presets
              </p>
              <div className="flex flex-wrap gap-2">
                {ADMIN_AVATAR_PRESETS.map((presetUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAdminFormData({ ...adminFormData, avatar: presetUrl })}
                    className={`relative w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                      adminFormData.avatar === presetUrl ? 'border-purple-400 scale-105 shadow-md shadow-purple-500/30' : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={presetUrl} alt={`Admin Preset ${idx}`} className="w-full h-full object-cover" />
                    {adminFormData.avatar === presetUrl && (
                      <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Admin Display Name</label>
            <input
              type="text"
              value={adminFormData.name}
              onChange={(e) => setAdminFormData({ ...adminFormData, name: e.target.value })}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Admin Email Address</label>
            <input
              type="email"
              value={adminFormData.email}
              onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-purple-600/30"
            >
              Save Admin Profile
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
