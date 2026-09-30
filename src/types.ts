export type Role = 'admin' | 'student' | 'teacher' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  referenceId?: string; // Student rollNo or Teacher ID
}

export interface Department {
  id: string;
  code: string;
  name: string;
  headOfDept: string;
  building: string;
  studentCount: number;
  teacherCount: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  credits: number;
  semester: number;
  teacherId?: string;
  teacherName?: string;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  departmentName: string;
  courseId: string;
  courseName: string;
  year: number; // 1, 2, 3, 4
  semester: number; // 1 to 8
  attendancePercent: number;
  gpa: number;
  totalFees: number;
  paidFees: number;
  pendingFees: number;
  avatar?: string;
  address?: string;
  dob?: string;
  enrollmentDate: string;
}

export interface Teacher {
  id: string;
  teacherId: string;
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  departmentName: string;
  designation: string; // Professor, Associate Professor, Asst Professor
  qualification: string;
  joinedDate: string;
  avatar?: string;
  assignedCourseIds: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  subjectId: string;
  subjectName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  markedBy: string;
}

export interface ResultRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  subjectId: string;
  subjectName: string;
  semester: number;
  marksObtained: number;
  maxMarks: number;
  grade: string;
  remarks?: string;
  updatedAt: string;
}

export interface FeeItem {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  paymentMethod?: string;
  transactionId?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  targetRole: 'all' | 'student' | 'teacher';
  author: string;
  authorRole: string;
  priority: 'low' | 'medium' | 'high';
  departmentId?: string;
}
