import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Employee,
  Department,
  AttendanceRecord,
  LeaveRequest,
  PayrollRecord,
  JobPosting,
  Candidate,
  PerformanceReview,
  ActivityLog,
  LeaveStatus,
  CandidateStage,
  PayrollStatus
} from '../types';
import {
  initialEmployees,
  initialDepartments,
  initialAttendance,
  initialLeaves,
  initialPayrolls,
  initialJobs,
  initialCandidates,
  initialReviews,
  initialActivityLogs
} from '../data/mockData';

interface HRContextType {
  employees: Employee[];
  departments: Department[];
  attendance: AttendanceRecord[];
  leaves: LeaveRequest[];
  payrolls: PayrollRecord[];
  jobs: JobPosting[];
  candidates: Candidate[];
  reviews: PerformanceReview[];
  activities: ActivityLog[];
  currentUser: Employee;
  setCurrentUser: (emp: Employee) => void;
  // Employee actions
  addEmployee: (emp: Omit<Employee, 'id' | 'code' | 'leaveBalances'>) => void;
  updateEmployee: (id: string, emp: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  // Attendance actions
  clockIn: (employeeId: string, notes?: string) => void;
  clockOut: (employeeId: string) => void;
  addAttendanceRecord: (record: Omit<AttendanceRecord, 'id'>) => void;
  // Leave actions
  applyLeave: (leave: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => void;
  reviewLeave: (id: string, status: LeaveStatus, approverComment?: string) => void;
  // Payroll actions
  generateMonthlyPayroll: (month: string) => void;
  updatePayrollStatus: (id: string, status: PayrollStatus) => void;
  processAllPayrolls: (month: string) => void;
  // Recruitment actions
  addJobPosting: (job: Omit<JobPosting, 'id' | 'postedDate'>) => void;
  updateJobPosting: (id: string, job: Partial<JobPosting>) => void;
  addCandidate: (candidate: Omit<Candidate, 'id' | 'appliedDate' | 'stage'>) => void;
  updateCandidateStage: (candidateId: string, stage: CandidateStage) => void;
  updateCandidateNotes: (candidateId: string, notes: string, rating: number) => void;
  // Performance review actions
  addPerformanceReview: (review: Omit<PerformanceReview, 'id' | 'submittedDate'>) => void;
  // System actions
  resetToDefaults: () => void;
  exportDataJSON: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notificationMessage: string | null;
  setNotificationMessage: (msg: string | null) => void;
}

const HRContext = createContext<HRContextType | undefined>(undefined);

const STORAGE_KEYS = {
  EMPLOYEES: 'fct_hr_employees_v1',
  DEPARTMENTS: 'fct_hr_departments_v1',
  ATTENDANCE: 'fct_hr_attendance_v1',
  LEAVES: 'fct_hr_leaves_v1',
  PAYROLLS: 'fct_hr_payrolls_v1',
  JOBS: 'fct_hr_jobs_v1',
  CANDIDATES: 'fct_hr_candidates_v1',
  REVIEWS: 'fct_hr_reviews_v1',
  ACTIVITIES: 'fct_hr_activities_v1',
};

export const HRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    return saved ? JSON.parse(saved) : initialEmployees;
  });

  const [departments, setDepartments] = useState<Department[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
    return saved ? JSON.parse(saved) : initialDepartments;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  const [leaves, setLeaves] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEAVES);
    return saved ? JSON.parse(saved) : initialLeaves;
  });

  const [payrolls, setPayrolls] = useState<PayrollRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PAYROLLS);
    return saved ? JSON.parse(saved) : initialPayrolls;
  });

  const [jobs, setJobs] = useState<JobPosting[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
    return saved ? JSON.parse(saved) : initialJobs;
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
    return saved ? JSON.parse(saved) : initialCandidates;
  });

  const [reviews, setReviews] = useState<PerformanceReview[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [activities, setActivities] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return saved ? JSON.parse(saved) : initialActivityLogs;
  });

  const [currentUser, setCurrentUser] = useState<Employee>(() => employees[0] || initialEmployees[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEAVES, JSON.stringify(leaves));
  }, [leaves]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYROLLS, JSON.stringify(payrolls));
  }, [payrolls]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  const logActivity = (action: string, target: string, type: ActivityLog['type']) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString(),
      actor: `${currentUser.firstName} ${currentUser.lastName}`,
      action,
      target,
      type
    };
    setActivities(prev => [newLog, ...prev]);
  };

  const showNotification = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  // Employee Actions
  const addEmployee = (newEmpData: Omit<Employee, 'id' | 'code' | 'leaveBalances'>) => {
    const nextCodeNumber = employees.length + 101;
    const newEmp: Employee = {
      ...newEmpData,
      id: `emp-${Date.now()}`,
      code: `FCT-${nextCodeNumber}`,
      leaveBalances: {
        annual: 18,
        sick: 10,
        parental: 30,
        usedAnnual: 0,
        usedSick: 0
      }
    };
    setEmployees(prev => [newEmp, ...prev]);
    // update department headcount
    setDepartments(prev =>
      prev.map(d => d.id === newEmp.departmentId ? { ...d, headcount: d.headcount + 1 } : d)
    );
    logActivity('Added new employee', `${newEmp.firstName} ${newEmp.lastName} (${newEmp.role})`, 'employee');
    showNotification(`Employee ${newEmp.firstName} ${newEmp.lastName} successfully registered.`);
  };

  const updateEmployee = (id: string, updatedFields: Partial<Employee>) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === id ? { ...emp, ...updatedFields } : emp))
    );
    logActivity('Updated employee profile', `ID: ${id}`, 'employee');
    showNotification('Employee details updated successfully.');
  };

  const deleteEmployee = (id: string) => {
    const emp = employees.find(e => e.id === id);
    if (!emp) return;
    setEmployees(prev => prev.filter(e => e.id !== id));
    setDepartments(prev =>
      prev.map(d => d.id === emp.departmentId ? { ...d, headcount: Math.max(0, d.headcount - 1) } : d)
    );
    logActivity('Terminated / Removed employee', `${emp.firstName} ${emp.lastName}`, 'employee');
    showNotification(`Employee ${emp.firstName} ${emp.lastName} removed.`);
  };

  // Attendance Actions
  const clockIn = (employeeId: string, notes?: string) => {
    const today = new Date().toISOString().split('T')[0];
    const emp = employees.find(e => e.id === employeeId);
    if (!emp) return;

    const existingIndex = attendance.findIndex(a => a.employeeId === employeeId && a.date === today);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    if (existingIndex >= 0) {
      const existing = attendance[existingIndex];
      if (existing.checkIn) {
        showNotification(`${emp.firstName} is already clocked in at ${existing.checkIn}.`);
        return;
      }
      const updated = [...attendance];
      updated[existingIndex] = {
        ...existing,
        checkIn: timeStr,
        status: 'present',
        notes: notes || existing.notes
      };
      setAttendance(updated);
    } else {
      const newRecord: AttendanceRecord = {
        id: `att-${Date.now()}`,
        employeeId,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        employeeAvatar: emp.avatarUrl,
        departmentName: emp.departmentName,
        date: today,
        checkIn: timeStr,
        workHours: 8.0,
        status: 'present',
        notes: notes || 'Punched via Web Terminal'
      };
      setAttendance(prev => [newRecord, ...prev]);
    }
    logActivity('Clocked in', `${emp.firstName} ${emp.lastName} at ${timeStr}`, 'attendance');
    showNotification(`${emp.firstName} ${emp.lastName} clocked in at ${timeStr}.`);
  };

  const clockOut = (employeeId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const emp = employees.find(e => e.id === employeeId);
    if (!emp) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    setAttendance(prev => {
      return prev.map(rec => {
        if (rec.employeeId === employeeId && rec.date === today) {
          let calculatedHours = rec.workHours || 8.0;
          if (rec.checkIn) {
            const [inH, inM] = rec.checkIn.split(':').map(Number);
            const [outH, outM] = timeStr.split(':').map(Number);
            const totalMin = Math.max(0, (outH * 60 + outM) - (inH * 60 + inM));
            calculatedHours = Number((totalMin / 60).toFixed(2));
          }
          return {
            ...rec,
            checkOut: timeStr,
            workHours: calculatedHours,
            overtimeHours: calculatedHours > 8 ? Number((calculatedHours - 8).toFixed(2)) : 0
          };
        }
        return rec;
      });
    });

    logActivity('Clocked out', `${emp.firstName} ${emp.lastName} at ${timeStr}`, 'attendance');
    showNotification(`${emp.firstName} ${emp.lastName} clocked out at ${timeStr}.`);
  };

  const addAttendanceRecord = (record: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = {
      ...record,
      id: `att-${Date.now()}`
    };
    setAttendance(prev => [newRecord, ...prev]);
    showNotification(`Attendance record logged for ${record.employeeName}.`);
  };

  // Leave Actions
  const applyLeave = (leaveData: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => {
    const newLeave: LeaveRequest = {
      ...leaveData,
      id: `leave-${Date.now()}`,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setLeaves(prev => [newLeave, ...prev]);
    logActivity('Submitted leave request', `${leaveData.employeeName} (${leaveData.days} days ${leaveData.type})`, 'leave');
    showNotification(`Leave request for ${leaveData.employeeName} submitted for review.`);
  };

  const reviewLeave = (id: string, status: LeaveStatus, approverComment?: string) => {
    const leave = leaves.find(l => l.id === id);
    if (!leave) return;

    setLeaves(prev =>
      prev.map(l => {
        if (l.id === id) {
          return {
            ...l,
            status,
            reviewedBy: `${currentUser.firstName} ${currentUser.lastName}`,
            reviewedDate: new Date().toISOString().split('T')[0],
            approverComment: approverComment || (status === 'approved' ? 'Approved by HR Lead' : 'Declined per team scheduling')
          };
        }
        return l;
      })
    );

    // If approved, update employee leave balances and set status
    if (status === 'approved') {
      setEmployees(prev =>
        prev.map(emp => {
          if (emp.id === leave.employeeId) {
            const key = leave.type === 'sick' ? 'usedSick' : 'usedAnnual';
            return {
              ...emp,
              leaveBalances: {
                ...emp.leaveBalances,
                [key]: emp.leaveBalances[key] + leave.days
              }
            };
          }
          return emp;
        })
      );
    }

    logActivity(
      status === 'approved' ? 'Approved leave request' : 'Rejected leave request',
      `${leave.employeeName} (${leave.days} days)`,
      'leave'
    );
    showNotification(`Leave request has been ${status}.`);
  };

  // Payroll Actions
  const generateMonthlyPayroll = (month: string) => {
    const newRecords: PayrollRecord[] = employees.map(emp => {
      const base = emp.salary;
      const allowances = 500;
      const bonus = emp.status === 'active' ? 500 : 0;
      const overtimePay = 0;
      const gross = base + allowances + bonus + overtimePay;
      const taxRate = 0.22;
      const taxDeduction = Math.round(gross * taxRate);
      const benefitsDeduction = 550;
      const totalDeductions = taxDeduction + benefitsDeduction;
      const netPay = gross - totalDeductions;

      return {
        id: `pay-${Date.now()}-${emp.id}`,
        employeeId: emp.id,
        employeeCode: emp.code,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        departmentName: emp.departmentName,
        role: emp.role,
        month,
        baseSalary: base,
        allowances,
        bonus,
        overtimePay,
        grossPay: gross,
        taxDeduction,
        benefitsDeduction,
        totalDeductions,
        netPay,
        status: 'pending',
        paymentMethod: `Direct Deposit (${emp.bankAccount.bankName})`
      };
    });

    setPayrolls(prev => [...newRecords, ...prev.filter(p => p.month !== month)]);
    logActivity('Generated monthly payroll batch', `${month} for ${employees.length} employees`, 'payroll');
    showNotification(`Payroll generated for ${month}.`);
  };

  const updatePayrollStatus = (id: string, status: PayrollStatus) => {
    setPayrolls(prev =>
      prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            status,
            paymentDate: status === 'paid' ? new Date().toISOString().split('T')[0] : p.paymentDate
          };
        }
        return p;
      })
    );
    showNotification(`Payroll record marked as ${status}.`);
  };

  const processAllPayrolls = (month: string) => {
    const today = new Date().toISOString().split('T')[0];
    setPayrolls(prev =>
      prev.map(p => (p.month === month ? { ...p, status: 'paid', paymentDate: today } : p))
    );
    logActivity('Disbursed payroll batch', `All disbursements executed for ${month}`, 'payroll');
    showNotification(`All payroll entries for ${month} marked as PAID.`);
  };

  // Recruitment Actions
  const addJobPosting = (jobData: Omit<JobPosting, 'id' | 'postedDate'>) => {
    const newJob: JobPosting = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobs(prev => [newJob, ...prev]);
    logActivity('Published job opening', `${newJob.title} (${newJob.department})`, 'recruitment');
    showNotification(`Job posting for "${newJob.title}" created.`);
  };

  const updateJobPosting = (id: string, updated: Partial<JobPosting>) => {
    setJobs(prev => prev.map(j => (j.id === id ? { ...j, ...updated } : j)));
    showNotification('Job posting updated.');
  };

  const addCandidate = (candData: Omit<Candidate, 'id' | 'appliedDate' | 'stage'>) => {
    const newCand: Candidate = {
      ...candData,
      id: `cand-${Date.now()}`,
      stage: 'applied',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setCandidates(prev => [newCand, ...prev]);
    logActivity('New candidate application', `${newCand.name} for ${newCand.jobTitle}`, 'recruitment');
    showNotification(`Application submitted for ${newCand.name}.`);
  };

  const updateCandidateStage = (candidateId: string, stage: CandidateStage) => {
    const cand = candidates.find(c => c.id === candidateId);
    if (!cand) return;
    setCandidates(prev =>
      prev.map(c => (c.id === candidateId ? { ...c, stage } : c))
    );
    logActivity('Candidate stage updated', `${cand.name} -> ${stage.toUpperCase()}`, 'recruitment');
    showNotification(`${cand.name} moved to stage: ${stage.toUpperCase()}.`);
  };

  const updateCandidateNotes = (candidateId: string, notes: string, rating: number) => {
    setCandidates(prev =>
      prev.map(c => (c.id === candidateId ? { ...c, notes, rating } : c))
    );
    showNotification('Candidate evaluation updated.');
  };

  // Performance Review Actions
  const addPerformanceReview = (revData: Omit<PerformanceReview, 'id' | 'submittedDate'>) => {
    const newRev: PerformanceReview = {
      ...revData,
      id: `rev-${Date.now()}`,
      submittedDate: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newRev, ...prev]);
    logActivity('Submitted performance appraisal', `${revData.employeeName} (${revData.cycle})`, 'review');
    showNotification(`Performance appraisal for ${revData.employeeName} finalized.`);
  };

  // Reset & Export
  const resetToDefaults = () => {
    setEmployees(initialEmployees);
    setDepartments(initialDepartments);
    setAttendance(initialAttendance);
    setLeaves(initialLeaves);
    setPayrolls(initialPayrolls);
    setJobs(initialJobs);
    setCandidates(initialCandidates);
    setReviews(initialReviews);
    setActivities(initialActivityLogs);
    localStorage.clear();
    showNotification('All records reset to default company database state.');
  };

  const exportDataJSON = () => {
    const data = {
      organization: 'FCT WB ERP Enterprise Human Resources',
      exportedAt: new Date().toISOString(),
      employees,
      departments,
      attendance,
      leaves,
      payrolls,
      jobs,
      candidates,
      reviews,
      activities
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fct-hr-erp-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('HR database export downloaded successfully.');
  };

  return (
    <HRContext.Provider
      value={{
        employees,
        departments,
        attendance,
        leaves,
        payrolls,
        jobs,
        candidates,
        reviews,
        activities,
        currentUser,
        setCurrentUser,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        clockIn,
        clockOut,
        addAttendanceRecord,
        applyLeave,
        reviewLeave,
        generateMonthlyPayroll,
        updatePayrollStatus,
        processAllPayrolls,
        addJobPosting,
        updateJobPosting,
        addCandidate,
        updateCandidateStage,
        updateCandidateNotes,
        addPerformanceReview,
        resetToDefaults,
        exportDataJSON,
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab,
        notificationMessage,
        setNotificationMessage
      }}
    >
      {children}
    </HRContext.Provider>
  );
};

export const useHR = () => {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error('useHR must be used within an HRProvider');
  }
  return context;
};
