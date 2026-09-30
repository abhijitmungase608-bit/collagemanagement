import React, { createContext, useContext, useState } from 'react';
import type {
  Role,
  User,
  Student,
  Teacher,
  Department,
  Course,
  AttendanceRecord,
  ResultRecord,
  FeeItem,
  Notice,
} from '../types';
import {
  initialDepartments,
  initialCourses,
  initialTeachers,
  initialStudents,
  initialAttendance,
  initialResults,
  initialFees,
  initialNotices,
} from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  role: Role;
  currentUser: User | null;
  students: Student[];
  teachers: Teacher[];
  departments: Department[];
  courses: Course[];
  attendance: AttendanceRecord[];
  results: ResultRecord[];
  fees: FeeItem[];
  notices: Notice[];
  toasts: Toast[];

  // Auth actions
  setRole: (role: Role) => void;
  loginAsStudent: (studentRollNo: string) => boolean;
  loginAsTeacher: (teacherId: string) => boolean;
  loginAsAdmin: () => void;
  updateAdminProfile: (data: { name: string; email: string; avatar?: string }) => void;
  logout: () => void;

  // Student CRUD
  addStudent: (student: Omit<Student, 'id' | 'paidFees' | 'pendingFees'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;

  // Teacher CRUD
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (teacher: Teacher) => void;
  deleteTeacher: (id: string) => void;

  // Attendance
  markAttendance: (records: Omit<AttendanceRecord, 'id'>[]) => void;

  // Results
  addOrUpdateResult: (result: Omit<ResultRecord, 'id' | 'updatedAt'>) => void;

  // Fees
  payFeeItem: (feeId: string, paymentMethod: string) => void;
  recordNewFee: (fee: Omit<FeeItem, 'id' | 'status'>) => void;

  // Notices
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  deleteNotice: (id: string) => void;

  // Dept & Courses
  addDepartment: (dept: Omit<Department, 'id' | 'studentCount' | 'teacherCount'>) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;

  // Helper
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>('admin');
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'admin-1',
    name: 'Administrator',
    email: 'admin@apexcollege.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  });

  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance);
  const [results, setResults] = useState<ResultRecord[]>(initialResults);
  const [fees, setFees] = useState<FeeItem[]>(initialFees);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole === 'admin') {
      setCurrentUser({
        id: 'admin-1',
        name: 'System Admin',
        email: 'admin@apexcollege.edu',
        role: 'admin',
      });
    } else if (newRole === 'guest') {
      setCurrentUser(null);
    }
  };

  const loginAsAdmin = () => {
    setRoleState('admin');
    setCurrentUser({
      id: 'admin-1',
      name: 'System Administrator',
      email: 'admin@apexcollege.edu',
      role: 'admin',
    });
    showToast('Logged in as Administrator');
  };

  const loginAsStudent = (rollNo: string): boolean => {
    const student = students.find(
      (s) => s.rollNo.toLowerCase() === rollNo.trim().toLowerCase() || s.email.toLowerCase() === rollNo.trim().toLowerCase()
    );

    if (student) {
      setRoleState('student');
      setCurrentUser({
        id: student.id,
        name: student.name,
        email: student.email,
        role: 'student',
        avatar: student.avatar,
        referenceId: student.rollNo,
      });
      showToast(`Welcome back, ${student.name}!`);
      return true;
    } else {
      showToast('Student not found! Use sample Roll No STU-2024-001', 'error');
      return false;
    }
  };

  const loginAsTeacher = (teacherId: string): boolean => {
    const teacher = teachers.find(
      (t) => t.teacherId.toLowerCase() === teacherId.trim().toLowerCase() || t.email.toLowerCase() === teacherId.trim().toLowerCase()
    );

    if (teacher) {
      setRoleState('teacher');
      setCurrentUser({
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        role: 'teacher',
        avatar: teacher.avatar,
        referenceId: teacher.teacherId,
      });
      showToast(`Welcome back, ${teacher.name}!`);
      return true;
    } else {
      showToast('Teacher not found! Use sample ID TCH-101', 'error');
      return false;
    }
  };

  const logout = () => {
    setRoleState('guest');
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  // Student CRUD
  const addStudent = (studentData: Omit<Student, 'id' | 'paidFees' | 'pendingFees'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `stu-${Date.now()}`,
      paidFees: 0,
      pendingFees: studentData.totalFees,
      avatar: studentData.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250`,
    };
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Student ${newStudent.name} added successfully!`);
  };

  const updateAdminProfile = (data: { name: string; email: string; avatar?: string }) => {
    setCurrentUser((prevUser) => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        name: data.name,
        email: data.email,
        avatar: data.avatar || prevUser.avatar,
      };
    });
    showToast('Admin profile updated!');
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents((prev) => prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
    setCurrentUser((prevUser) => {
      if (prevUser && (prevUser.id === updatedStudent.id || prevUser.referenceId === updatedStudent.rollNo)) {
        return {
          ...prevUser,
          name: updatedStudent.name,
          email: updatedStudent.email,
          avatar: updatedStudent.avatar,
        };
      }
      return prevUser;
    });
    showToast(`Student ${updatedStudent.name} profile updated!`);
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast('Student record deleted', 'info');
  };

  // Teacher CRUD
  const addTeacher = (teacherData: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `tch-${Date.now()}`,
      avatar: teacherData.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250`,
    };
    setTeachers((prev) => [newTeacher, ...prev]);
    showToast(`Teacher ${newTeacher.name} added!`);
  };

  const updateTeacher = (updatedTeacher: Teacher) => {
    setTeachers((prev) => prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t)));
    setCurrentUser((prevUser) => {
      if (prevUser && (prevUser.id === updatedTeacher.id || prevUser.referenceId === updatedTeacher.teacherId)) {
        return {
          ...prevUser,
          name: updatedTeacher.name,
          email: updatedTeacher.email,
          avatar: updatedTeacher.avatar,
        };
      }
      return prevUser;
    });
    showToast(`Teacher profile updated!`);
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    showToast('Teacher record deleted', 'info');
  };

  // Attendance
  const markAttendance = (records: Omit<AttendanceRecord, 'id'>[]) => {
    const newRecords: AttendanceRecord[] = records.map((r, i) => ({
      ...r,
      id: `att-${Date.now()}-${i}`,
    }));

    setAttendance((prev) => {
      // replace existing records for same student, subject & date
      const filtered = prev.filter(
        (existing) =>
          !records.some(
            (r) => r.studentId === existing.studentId && r.subjectId === existing.subjectId && r.date === existing.date
          )
      );
      return [...newRecords, ...filtered];
    });

    showToast(`Attendance saved for ${records.length} students!`);
  };

  // Results
  const addOrUpdateResult = (resultData: Omit<ResultRecord, 'id' | 'updatedAt'>) => {
    const today = new Date().toISOString().split('T')[0];
    setResults((prev) => {
      const existingIndex = prev.findIndex(
        (r) => r.studentId === resultData.studentId && r.subjectId === resultData.subjectId
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...resultData,
          id: prev[existingIndex].id,
          updatedAt: today,
        };
        return updated;
      } else {
        return [
          {
            ...resultData,
            id: `res-${Date.now()}`,
            updatedAt: today,
          },
          ...prev,
        ];
      }
    });
    showToast(`Result updated for ${resultData.studentName}`);
  };

  // Fees
  const payFeeItem = (feeId: string, paymentMethod: string) => {
    const txnId = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const today = new Date().toISOString().split('T')[0];

    setFees((prev) =>
      prev.map((f) => {
        if (f.id === feeId) {
          // Update student fee totals
          setStudents((stuList) =>
            stuList.map((s) => {
              if (s.id === f.studentId) {
                const newPaid = s.paidFees + f.amount;
                const newPending = Math.max(0, s.pendingFees - f.amount);
                return { ...s, paidFees: newPaid, pendingFees: newPending };
              }
              return s;
            })
          );

          return {
            ...f,
            status: 'paid',
            paidDate: today,
            paymentMethod,
            transactionId: txnId,
          };
        }
        return f;
      })
    );

    showToast(`Fee payment of successful! Txn ID: ${txnId}`);
  };

  const recordNewFee = (feeData: Omit<FeeItem, 'id' | 'status'>) => {
    const newFee: FeeItem = {
      ...feeData,
      id: `fee-${Date.now()}`,
      status: 'pending',
    };
    setFees((prev) => [newFee, ...prev]);

    // update student pending fees
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === feeData.studentId) {
          return {
            ...s,
            totalFees: s.totalFees + feeData.amount,
            pendingFees: s.pendingFees + feeData.amount,
          };
        }
        return s;
      })
    );
    showToast(`New fee invoice issued to ${feeData.studentName}`);
  };

  // Notices
  const addNotice = (noticeData: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: `not-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setNotices((prev) => [newNotice, ...prev]);
    showToast('Announcement posted to notice board!');
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    showToast('Notice removed', 'info');
  };

  // Dept & Courses
  const addDepartment = (deptData: Omit<Department, 'id' | 'studentCount' | 'teacherCount'>) => {
    const newDept: Department = {
      ...deptData,
      id: `dept-${Date.now()}`,
      studentCount: 0,
      teacherCount: 0,
    };
    setDepartments((prev) => [...prev, newDept]);
    showToast(`Department ${newDept.name} created!`);
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `crs-${Date.now()}`,
    };
    setCourses((prev) => [...prev, newCourse]);
    showToast(`Course ${newCourse.name} created!`);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        currentUser,
        students,
        teachers,
        departments,
        courses,
        attendance,
        results,
        fees,
        notices,
        toasts,
        setRole,
        loginAsStudent,
        loginAsTeacher,
        loginAsAdmin,
        updateAdminProfile,
        logout,
        addStudent,
        updateStudent,
        deleteStudent,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        markAttendance,
        addOrUpdateResult,
        payFeeItem,
        recordNewFee,
        addNotice,
        deleteNotice,
        addDepartment,
        addCourse,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
