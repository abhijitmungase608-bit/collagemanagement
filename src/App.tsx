import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { RoleSelector } from './components/RoleSelector';
import { StudentLogin } from './components/StudentLogin';
import { TeacherLogin } from './components/TeacherLogin';

// Admin sub-views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentManagement } from './components/admin/StudentManagement';
import { TeacherManagement } from './components/admin/TeacherManagement';
import { AdminAttendance } from './components/admin/AdminAttendance';
import { AdminFees } from './components/admin/AdminFees';
import { AdminResults } from './components/admin/AdminResults';
import { AdminNotices } from './components/admin/AdminNotices';
import { AdminDepartments } from './components/admin/AdminDepartments';
import { AdminCourses } from './components/admin/AdminCourses';

// Student sub-views
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentProfile } from './components/student/StudentProfile';
import { StudentAttendance } from './components/student/StudentAttendance';
import { StudentFees } from './components/student/StudentFees';
import { StudentResults } from './components/student/StudentResults';
import { StudentNotices } from './components/student/StudentNotices';

// Teacher sub-views
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { TeacherProfile } from './components/teacher/TeacherProfile';
import { TeacherStudentList } from './components/teacher/TeacherStudentList';
import { TeacherMarkAttendance } from './components/teacher/TeacherMarkAttendance';
import { TeacherAddResults } from './components/teacher/TeacherAddResults';
import { TeacherNotices } from './components/teacher/TeacherNotices';

const MainAppContent: React.FC = () => {
  const { role, logout } = useApp();

  // Navigation views: 'landing' | 'student-login' | 'teacher-login' | 'portal'
  const [viewState, setViewState] = useState<'landing' | 'student-login' | 'teacher-login' | 'portal'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If role is set, default to portal view
  const isPortalActive = viewState === 'portal' || (role !== 'guest' && viewState !== 'student-login' && viewState !== 'teacher-login');

  const handleSelectRoleFromLanding = (selectedRole: 'admin' | 'student-login' | 'teacher-login') => {
    if (selectedRole === 'admin') {
      setActiveTab('dashboard');
      setViewState('portal');
    } else if (selectedRole === 'student-login') {
      setViewState('student-login');
    } else if (selectedRole === 'teacher-login') {
      setViewState('teacher-login');
    }
  };

  const renderPortalView = () => {
    if (role === 'admin') {
      switch (activeTab) {
        case 'dashboard':
          return <AdminDashboard onNavigateTab={setActiveTab} />;
        case 'students':
          return <StudentManagement />;
        case 'teachers':
          return <TeacherManagement />;
        case 'attendance':
          return <AdminAttendance />;
        case 'fees':
          return <AdminFees />;
        case 'results':
          return <AdminResults />;
        case 'notices':
          return <AdminNotices />;
        case 'departments':
          return <AdminDepartments />;
        case 'courses':
          return <AdminCourses />;
        default:
          return <AdminDashboard onNavigateTab={setActiveTab} />;
      }
    } else if (role === 'student') {
      switch (activeTab) {
        case 'dashboard':
          return <StudentDashboard onNavigateTab={setActiveTab} />;
        case 'profile':
          return <StudentProfile />;
        case 'attendance':
          return <StudentAttendance />;
        case 'fees':
          return <StudentFees />;
        case 'results':
          return <StudentResults />;
        case 'notices':
          return <StudentNotices />;
        default:
          return <StudentDashboard onNavigateTab={setActiveTab} />;
      }
    } else if (role === 'teacher') {
      switch (activeTab) {
        case 'dashboard':
          return <TeacherDashboard onNavigateTab={setActiveTab} />;
        case 'profile':
          return <TeacherProfile />;
        case 'students':
          return <TeacherStudentList />;
        case 'attendance':
          return <TeacherMarkAttendance />;
        case 'results':
          return <TeacherAddResults />;
        case 'notices':
          return <TeacherNotices />;
        default:
          return <TeacherDashboard onNavigateTab={setActiveTab} />;
      }
    }

    return null;
  };

  if (!isPortalActive || role === 'guest') {
    if (viewState === 'student-login') {
      return (
        <StudentLogin
          onBack={() => setViewState('landing')}
          onSuccess={() => {
            setActiveTab('dashboard');
            setViewState('portal');
          }}
        />
      );
    }
    if (viewState === 'teacher-login') {
      return (
        <TeacherLogin
          onBack={() => setViewState('landing')}
          onSuccess={() => {
            setActiveTab('dashboard');
            setViewState('portal');
          }}
        />
      );
    }
    return <RoleSelector onSelectRole={handleSelectRoleFromLanding} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onNavigateLanding={() => {
          logout();
          setViewState('landing');
        }}
        onNavigateProfile={() => setActiveTab('profile')}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          onCloseMobile={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderPortalView()}</div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
