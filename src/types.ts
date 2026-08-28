export type EmployeeStatus = 'active' | 'on_leave' | 'probation' | 'terminated';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contractor' | 'Intern';
export type AttendanceStatus = 'present' | 'late' | 'absent' | 'half_day' | 'on_leave';
export type LeaveType = 'annual' | 'sick' | 'parental' | 'unpaid' | 'bereavement';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';
export type PayrollStatus = 'paid' | 'pending' | 'processing';
export type CandidateStage = 'applied' | 'screening' | 'interview' | 'offered' | 'hired' | 'rejected';
export type JobStatus = 'open' | 'draft' | 'closed';
export type ReviewStatus = 'completed' | 'draft' | 'in_review';

export interface Employee {
  id: string;
  code: string; // e.g. EMP-001
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  departmentId: string;
  departmentName: string;
  role: string;
  status: EmployeeStatus;
  employmentType: EmploymentType;
  joinDate: string;
  salary: number; // monthly in USD
  location: string;
  managerId?: string;
  managerName?: string;
  skills: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  leaveBalances: {
    annual: number;
    sick: number;
    parental: number;
    usedAnnual: number;
    usedSick: number;
  };
  bankAccount: {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
  };
}

export interface Department {
  id: string;
  name: string;
  code: string;
  leadName: string;
  leadId: string;
  headcount: number;
  budget: number; // annual
  description: string;
  color: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  departmentName: string;
  date: string; // YYYY-MM-DD
  checkIn?: string; // HH:mm
  checkOut?: string; // HH:mm
  workHours: number;
  status: AttendanceStatus;
  overtimeHours?: number;
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  departmentName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
  approverComment?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeCode: string;
  employeeName: string;
  departmentName: string;
  role: string;
  month: string; // "August 2026"
  baseSalary: number;
  allowances: number;
  bonus: number;
  overtimePay: number;
  grossPay: number;
  taxDeduction: number;
  benefitsDeduction: number;
  totalDeductions: number;
  netPay: number;
  status: PayrollStatus;
  paymentDate?: string;
  paymentMethod: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: EmploymentType;
  experienceLevel: string;
  salaryMin: number;
  salaryMax: number;
  openings: number;
  status: JobStatus;
  postedDate: string;
  description: string;
  requirements: string[];
}

export interface Candidate {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  appliedDate: string;
  stage: CandidateStage;
  rating: number; // 1-5
  experienceYears: number;
  currentCompany?: string;
  portfolioOrLinkedin?: string;
  resumeSummary: string;
  notes: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  departmentName: string;
  reviewerName: string;
  cycle: string; // "Q2 2026"
  rating: number; // 1 to 5
  status: ReviewStatus;
  goalsMetPercentage: number;
  strengths: string;
  areasForGrowth: string;
  feedback: string;
  submittedDate: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  type: 'employee' | 'leave' | 'payroll' | 'recruitment' | 'attendance' | 'review';
}
