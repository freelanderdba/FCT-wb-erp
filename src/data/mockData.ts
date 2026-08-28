import {
  Employee,
  Department,
  AttendanceRecord,
  LeaveRequest,
  PayrollRecord,
  JobPosting,
  Candidate,
  PerformanceReview,
  ActivityLog
} from '../types';

export const initialDepartments: Department[] = [
  {
    id: 'dept-1',
    name: 'Engineering & Technology',
    code: 'ENG',
    leadName: 'Marcus Vance',
    leadId: 'emp-1',
    headcount: 5,
    budget: 850000,
    description: 'Software development, cloud infrastructure, AI architecture, and quality assurance.',
    color: '#06b6d4'
  },
  {
    id: 'dept-2',
    name: 'Human Resources & Talent',
    code: 'HRT',
    leadName: 'Elena Rostova',
    leadId: 'emp-2',
    headcount: 3,
    budget: 320000,
    description: 'People operations, compensation & benefits, talent acquisition, and company culture.',
    color: '#ec4899'
  },
  {
    id: 'dept-3',
    name: 'Finance & Accounting',
    code: 'FIN',
    leadName: 'David Chen',
    leadId: 'emp-3',
    headcount: 3,
    budget: 450000,
    description: 'Financial forecasting, corporate accounting, treasury, payroll audit, and tax compliance.',
    color: '#10b981'
  },
  {
    id: 'dept-4',
    name: 'Product & Design',
    code: 'PRD',
    leadName: 'Aria Sterling',
    leadId: 'emp-4',
    headcount: 3,
    budget: 390000,
    description: 'Product roadmap strategy, UX/UI design systems, user research, and customer discovery.',
    color: '#8b5cf6'
  },
  {
    id: 'dept-5',
    name: 'Sales & Business Growth',
    code: 'SLS',
    leadName: 'Jonathan Hayes',
    leadId: 'emp-5',
    headcount: 4,
    budget: 520000,
    description: 'Enterprise client acquisition, global partnerships, and revenue operations.',
    color: '#f59e0b'
  }
];

export const initialEmployees: Employee[] = [
  {
    id: 'emp-1',
    code: 'FCT-101',
    firstName: 'Marcus',
    lastName: 'Vance',
    email: 'marcus.vance@fct-erp.internal',
    phone: '+1 (555) 234-8901',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept-1',
    departmentName: 'Engineering & Technology',
    role: 'VP of Engineering',
    status: 'active',
    employmentType: 'Full-time',
    joinDate: '2022-03-15',
    salary: 14500,
    location: 'San Francisco, HQ',
    skills: ['System Architecture', 'Distributed Systems', 'Go', 'TypeScript', 'Kubernetes'],
    emergencyContact: {
      name: 'Claire Vance',
      relationship: 'Spouse',
      phone: '+1 (555) 987-1234'
    },
    leaveBalances: {
      annual: 20,
      sick: 10,
      parental: 30,
      usedAnnual: 4,
      usedSick: 1
    },
    bankAccount: {
      bankName: 'JPMorgan Chase',
      accountNumber: '**** **** 4892',
      routingNumber: '121000358'
    }
  },
  {
    id: 'emp-2',
    code: 'FCT-102',
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'elena.rostova@fct-erp.internal',
    phone: '+1 (555) 345-6712',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept-2',
    departmentName: 'Human Resources & Talent',
    role: 'Chief People Officer',
    status: 'active',
    employmentType: 'Full-time',
    joinDate: '2021-11-01',
    salary: 13000,
    location: 'New York Office',
    skills: ['Strategic HR', 'Talent Acquisition', 'Labor Compliance', 'Executive Coaching'],
    emergencyContact: {
      name: 'Viktor Rostov',
      relationship: 'Brother',
      phone: '+1 (555) 678-9012'
    },
    leaveBalances: {
      annual: 22,
      sick: 10,
      parental: 30,
      usedAnnual: 6,
      usedSick: 0
    },
    bankAccount: {
      bankName: 'Bank of America',
      accountNumber: '**** **** 9104',
      routingNumber: '021000021'
    }
  },
  {
    id: 'emp-3',
    code: 'FCT-103',
    firstName: 'David',
    lastName: 'Chen',
    email: 'david.chen@fct-erp.internal',
    phone: '+1 (555) 456-7890',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept-3',
    departmentName: 'Finance & Accounting',
    role: 'Head of Finance',
    status: 'active',
    employmentType: 'Full-time',
    joinDate: '2022-01-10',
    salary: 12500,
    location: 'San Francisco, HQ',
    skills: ['Financial Modeling', 'GAAP Compliance', 'ERP Auditing', 'Cap Table Management'],
    emergencyContact: {
      name: 'Jessica Chen',
      relationship: 'Spouse',
      phone: '+1 (555) 890-1234'
    },
    leaveBalances: {
      annual: 20,
      sick: 10,
      parental: 30,
      usedAnnual: 2,
      usedSick: 2
    },
    bankAccount: {
      bankName: 'Wells Fargo',
      accountNumber: '**** **** 3341',
      routingNumber: '121000248'
    }
  },
  {
    id: 'emp-4',
    code: 'FCT-104',
    firstName: 'Aria',
    lastName: 'Sterling',
    email: 'aria.sterling@fct-erp.internal',
    phone: '+1 (555) 567-8901',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept-4',
    departmentName: 'Product & Design',
    role: 'Head of Product Design',
    status: 'active',
    employmentType: 'Full-time',
    joinDate: '2022-06-01',
    salary: 12000,
    location: 'Remote - Austin',
    skills: ['Figma', 'Design Systems', 'User Journeys', 'Interactive Prototyping', 'Accessibility'],
    emergencyContact: {
      name: 'Noah Sterling',
      relationship: 'Partner',
      phone: '+1 (555) 901-2345'
    },
    leaveBalances: {
      annual: 20,
      sick: 10,
      parental: 30,
      usedAnnual: 5,
      usedSick: 0
    },
    bankAccount: {
      bankName: 'Citibank',
      accountNumber: '**** **** 8276',
      routingNumber: '021000089'
    }
  },
  {
    id: 'emp-5',
    code: 'FCT-105',
    firstName: 'Jonathan',
    lastName: 'Hayes',
    email: 'jonathan.hayes@fct-erp.internal',
    phone: '+1 (555) 678-9012',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept-5',
    departmentName: 'Sales & Business Growth',
    role: 'Director of Enterprise Sales',
    status: 'active',
    employmentType: 'Full-time',
    joinDate: '2022-08-15',
    salary: 11000,
    location: 'Chicago Hub',
    skills: ['Enterprise Negotiation', 'Pipeline Management', 'CRM Architect', 'Key Accounts'],
    emergencyContact: {
      name: 'Emily Hayes',
      relationship: 'Spouse',
      phone: '+1 (555) 012-3456'
    },
    leaveBalances: {
      annual: 18,
      sick: 10,
      parental: 30,
      usedAnnual: 3,
      usedSick: 1
    },
    bankAccount: {
      bankName: 'PNC Bank',
      accountNumber: '**** **** 1290',
      routingNumber: '071921891'
    }
  },
  {
    id: 'emp-6',
    code: 'FCT-106',
    firstName: 'Sophia',
    lastName: 'Lin',
    email: 'sophia.lin@fct-erp.internal',
    phone: '+1 (555) 789-0123',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept-1',
    departmentName: 'Engineering & Technology',
    role: 'Senior Staff Frontend Architect',
    status: 'active',
    employmentType: 'Full-time',
    joinDate: '2023-02-01',
    salary: 11800,
    location: 'San Francisco, HQ',
    managerId: 'emp-1',
    managerName: 'Marcus Vance',
    skills: ['React', 'Next.js', 'Web Performance', 'TypeScript', 'Tailwind CSS'],
    emergencyContact: {
      name: 'Kevin Lin',
      relationship: 'Father',
      phone: '+1 (555) 123-9876'
    },
    leaveBalances: {
      annual: 18,
      sick: 10,
      parental: 30,
      usedAnnual: 8,
      usedSick: 2
    },
    bankAccount: {
      bankName: 'JPMorgan Chase',
      accountNumber: '**** **** 5521',
      routingNumber: '121000358'
    }
  },
  {
    id: 'emp-7',
    code: 'FCT-107',
    firstName: 'Tariq',
    lastName: 'Mansour',
    email: 'tariq.mansour@fct-erp.internal',
    phone: '+1 (555) 890-1234',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept-1',
    departmentName: 'Engineering & Technology',
    role: 'Principal Backend Engineer',
    status: 'active',
    employmentType: 'Full-time',
    joinDate: '2023-04-10',
    salary: 11500,
    location: 'Remote - Seattle',
    managerId: 'emp-1',
    managerName: 'Marcus Vance',
    skills: ['PostgreSQL', 'Microservices', 'GraphQL', 'Docker', 'Redis Cache'],
    emergencyContact: {
      name: 'Samira Mansour',
      relationship: 'Mother',
      phone: '+1 (555) 234-5678'
    },
    leaveBalances: {
      annual: 18,
      sick: 10,
      parental: 30,
      usedAnnual: 1,
      usedSick: 0
    },
    bankAccount: {
      bankName: 'U.S. Bank',
      accountNumber: '**** **** 7741',
      routingNumber: '123000848'
    }
  },
  {
    id: 'emp-8',
    code: 'FCT-108',
    firstName: 'Zoe',
    lastName: 'Kaufman',
    email: 'zoe.kaufman@fct-erp.internal',
    phone: '+1 (555) 901-2345',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept-2',
    departmentName: 'Human Resources & Talent',
    role: 'Senior Talent Acquisition Partner',
    status: 'active',
    employmentType: 'Full-time',
    joinDate: '2023-07-15',
    salary: 8200,
    location: 'New York Office',
    managerId: 'emp-2',
    managerName: 'Elena Rostova',
    skills: ['Technical Sourcing', 'Interview Frameworks', 'Employer Branding', 'Candidate Experience'],
    emergencyContact: {
      name: 'Daniel Kaufman',
      relationship: 'Spouse',
      phone: '+1 (555) 345-6789'
    },
    leaveBalances: {
      annual: 15,
      sick: 10,
      parental: 30,
      usedAnnual: 3,
      usedSick: 1
    },
    bankAccount: {
      bankName: 'Capital One',
      accountNumber: '**** **** 6612',
      routingNumber: '051405515'
    }
  },
  {
    id: 'emp-9',
    code: 'FCT-109',
    firstName: 'Mateo',
    lastName: 'Gomez',
    email: 'mateo.gomez@fct-erp.internal',
    phone: '+1 (555) 012-3456',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept-4',
    departmentName: 'Product & Design',
    role: 'Lead Product Manager',
    status: 'on_leave',
    employmentType: 'Full-time',
    joinDate: '2023-09-01',
    salary: 10500,
    location: 'San Francisco, HQ',
    managerId: 'emp-4',
    managerName: 'Aria Sterling',
    skills: ['Product Analytics', 'Agile Scrum', 'Stakeholder Management', 'User Stories'],
    emergencyContact: {
      name: 'Maria Gomez',
      relationship: 'Sister',
      phone: '+1 (555) 456-7890'
    },
    leaveBalances: {
      annual: 15,
      sick: 10,
      parental: 30,
      usedAnnual: 10,
      usedSick: 0
    },
    bankAccount: {
      bankName: 'Chase Bank',
      accountNumber: '**** **** 9087',
      routingNumber: '121000358'
    }
  },
  {
    id: 'emp-10',
    code: 'FCT-110',
    firstName: 'Amara',
    lastName: 'Okafor',
    email: 'amara.okafor@fct-erp.internal',
    phone: '+1 (555) 123-4567',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    departmentId: 'dept-5',
    departmentName: 'Sales & Business Growth',
    role: 'Enterprise Account Executive',
    status: 'probation',
    employmentType: 'Full-time',
    joinDate: '2026-06-15',
    salary: 7800,
    location: 'Remote - Atlanta',
    managerId: 'emp-5',
    managerName: 'Jonathan Hayes',
    skills: ['B2B Sales', 'Prospecting', 'Product Demonstrations', 'Contract Closing'],
    emergencyContact: {
      name: 'Chidi Okafor',
      relationship: 'Brother',
      phone: '+1 (555) 567-8901'
    },
    leaveBalances: {
      annual: 12,
      sick: 8,
      parental: 20,
      usedAnnual: 0,
      usedSick: 0
    },
    bankAccount: {
      bankName: 'Truist',
      accountNumber: '**** **** 4321',
      routingNumber: '061000104'
    }
  }
];

export const initialAttendance: AttendanceRecord[] = [
  {
    id: 'att-1',
    employeeId: 'emp-1',
    employeeName: 'Marcus Vance',
    employeeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Engineering & Technology',
    date: '2026-08-27',
    checkIn: '08:45',
    checkOut: '17:30',
    workHours: 8.75,
    status: 'present',
    overtimeHours: 0.75,
    notes: 'Architectural sync completed'
  },
  {
    id: 'att-2',
    employeeId: 'emp-2',
    employeeName: 'Elena Rostova',
    employeeAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Human Resources & Talent',
    date: '2026-08-27',
    checkIn: '09:05',
    workHours: 8.0,
    status: 'present',
    notes: 'Q3 hiring board meetings'
  },
  {
    id: 'att-3',
    employeeId: 'emp-3',
    employeeName: 'David Chen',
    employeeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Finance & Accounting',
    date: '2026-08-27',
    checkIn: '08:30',
    checkOut: '17:00',
    workHours: 8.5,
    status: 'present',
    notes: 'Tax reconciliation'
  },
  {
    id: 'att-4',
    employeeId: 'emp-4',
    employeeName: 'Aria Sterling',
    employeeAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Product & Design',
    date: '2026-08-27',
    checkIn: '09:42',
    workHours: 7.5,
    status: 'late',
    notes: 'Checked in remote from Austin'
  },
  {
    id: 'att-5',
    employeeId: 'emp-6',
    employeeName: 'Sophia Lin',
    employeeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Engineering & Technology',
    date: '2026-08-27',
    checkIn: '08:50',
    workHours: 8.2,
    status: 'present'
  },
  {
    id: 'att-6',
    employeeId: 'emp-7',
    employeeName: 'Tariq Mansour',
    employeeAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Engineering & Technology',
    date: '2026-08-27',
    checkIn: '09:00',
    workHours: 8.0,
    status: 'present'
  },
  {
    id: 'att-7',
    employeeId: 'emp-9',
    employeeName: 'Mateo Gomez',
    employeeAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Product & Design',
    date: '2026-08-27',
    workHours: 0,
    status: 'on_leave',
    notes: 'Approved Annual Leave'
  },
  {
    id: 'att-8',
    employeeId: 'emp-10',
    employeeName: 'Amara Okafor',
    employeeAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Sales & Business Growth',
    date: '2026-08-27',
    checkIn: '09:12',
    workHours: 8.0,
    status: 'present'
  }
];

export const initialLeaves: LeaveRequest[] = [
  {
    id: 'leave-1',
    employeeId: 'emp-9',
    employeeName: 'Mateo Gomez',
    employeeAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Product & Design',
    type: 'annual',
    startDate: '2026-08-25',
    endDate: '2026-08-29',
    days: 5,
    reason: 'Family vacation and personal downtime.',
    status: 'approved',
    appliedDate: '2026-08-10',
    reviewedBy: 'Elena Rostova',
    reviewedDate: '2026-08-11',
    approverComment: 'Have a great time off!'
  },
  {
    id: 'leave-2',
    employeeId: 'emp-6',
    employeeName: 'Sophia Lin',
    employeeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Engineering & Technology',
    type: 'annual',
    startDate: '2026-09-14',
    endDate: '2026-09-18',
    days: 5,
    reason: 'Attending Web Engineering Summit in Vancouver.',
    status: 'pending',
    appliedDate: '2026-08-26'
  },
  {
    id: 'leave-3',
    employeeId: 'emp-8',
    employeeName: 'Zoe Kaufman',
    employeeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Human Resources & Talent',
    type: 'sick',
    startDate: '2026-09-01',
    endDate: '2026-09-02',
    days: 2,
    reason: 'Scheduled dental oral surgery and recovery.',
    status: 'pending',
    appliedDate: '2026-08-27'
  },
  {
    id: 'leave-4',
    employeeId: 'emp-7',
    employeeName: 'Tariq Mansour',
    employeeAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Engineering & Technology',
    type: 'annual',
    startDate: '2026-07-10',
    endDate: '2026-07-12',
    days: 3,
    reason: 'Long weekend camping trip.',
    status: 'approved',
    appliedDate: '2026-06-28',
    reviewedBy: 'Marcus Vance',
    reviewedDate: '2026-06-29',
    approverComment: 'Approved. Backups configured.'
  }
];

export const initialPayrolls: PayrollRecord[] = [
  {
    id: 'pay-1',
    employeeId: 'emp-1',
    employeeCode: 'FCT-101',
    employeeName: 'Marcus Vance',
    departmentName: 'Engineering & Technology',
    role: 'VP of Engineering',
    month: 'August 2026',
    baseSalary: 14500,
    allowances: 800,
    bonus: 1200,
    overtimePay: 0,
    grossPay: 16500,
    taxDeduction: 3630,
    benefitsDeduction: 650,
    totalDeductions: 4280,
    netPay: 12220,
    status: 'paid',
    paymentDate: '2026-08-25',
    paymentMethod: 'Direct Deposit (Chase Bank)'
  },
  {
    id: 'pay-2',
    employeeId: 'emp-2',
    employeeCode: 'FCT-102',
    employeeName: 'Elena Rostova',
    departmentName: 'Human Resources & Talent',
    role: 'Chief People Officer',
    month: 'August 2026',
    baseSalary: 13000,
    allowances: 600,
    bonus: 800,
    overtimePay: 0,
    grossPay: 14400,
    taxDeduction: 3168,
    benefitsDeduction: 650,
    totalDeductions: 3818,
    netPay: 10582,
    status: 'paid',
    paymentDate: '2026-08-25',
    paymentMethod: 'Direct Deposit (Bank of America)'
  },
  {
    id: 'pay-3',
    employeeId: 'emp-3',
    employeeCode: 'FCT-103',
    employeeName: 'David Chen',
    departmentName: 'Finance & Accounting',
    role: 'Head of Finance',
    month: 'August 2026',
    baseSalary: 12500,
    allowances: 500,
    bonus: 1000,
    overtimePay: 0,
    grossPay: 14000,
    taxDeduction: 3080,
    benefitsDeduction: 650,
    totalDeductions: 3730,
    netPay: 10270,
    status: 'paid',
    paymentDate: '2026-08-25',
    paymentMethod: 'Direct Deposit (Wells Fargo)'
  },
  {
    id: 'pay-4',
    employeeId: 'emp-6',
    employeeCode: 'FCT-106',
    employeeName: 'Sophia Lin',
    departmentName: 'Engineering & Technology',
    role: 'Senior Staff Frontend Architect',
    month: 'August 2026',
    baseSalary: 11800,
    allowances: 500,
    bonus: 500,
    overtimePay: 350,
    grossPay: 13150,
    taxDeduction: 2893,
    benefitsDeduction: 550,
    totalDeductions: 3443,
    netPay: 9707,
    status: 'pending',
    paymentMethod: 'Direct Deposit (Chase)'
  },
  {
    id: 'pay-5',
    employeeId: 'emp-7',
    employeeCode: 'FCT-107',
    employeeName: 'Tariq Mansour',
    departmentName: 'Engineering & Technology',
    role: 'Principal Backend Engineer',
    month: 'August 2026',
    baseSalary: 11500,
    allowances: 500,
    bonus: 500,
    overtimePay: 0,
    grossPay: 12500,
    taxDeduction: 2750,
    benefitsDeduction: 550,
    totalDeductions: 3300,
    netPay: 9200,
    status: 'pending',
    paymentMethod: 'Direct Deposit (U.S. Bank)'
  }
];

export const initialJobs: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Senior Cloud DevOps & SRE Engineer',
    department: 'Engineering & Technology',
    location: 'Remote - North America',
    type: 'Full-time',
    experienceLevel: 'Senior (5+ yrs)',
    salaryMin: 140000,
    salaryMax: 175000,
    openings: 2,
    status: 'open',
    postedDate: '2026-08-01',
    description: 'We are seeking an experienced SRE to scale our multi-region Kubernetes clusters, build CI/CD deployment automation, and maintain 99.99% system availability.',
    requirements: [
      'Extensive experience with Kubernetes, Terraform, and AWS/GCP',
      'Strong scripting skills in Go or Python',
      'Solid understanding of Prometheus, Grafana, and Datadog observability',
      'Background in SOC2 and zero-trust security postures'
    ]
  },
  {
    id: 'job-2',
    title: 'Product Marketing Manager',
    department: 'Product & Design',
    location: 'New York, Hybrid',
    type: 'Full-time',
    experienceLevel: 'Mid-Senior (4+ yrs)',
    salaryMin: 110000,
    salaryMax: 135000,
    openings: 1,
    status: 'open',
    postedDate: '2026-08-12',
    description: 'Lead go-to-market strategies for our enterprise ERP features, crafting customer positioning, competitive battlecards, and high-impact launch campaigns.',
    requirements: [
      '4+ years in B2B SaaS product marketing',
      'Proven track record of high-converting product launches',
      'Strong storytelling and data analytics capabilities',
      'Experience collaborating with enterprise sales teams'
    ]
  },
  {
    id: 'job-3',
    title: 'Senior Financial Analyst',
    department: 'Finance & Accounting',
    location: 'San Francisco, HQ',
    type: 'Full-time',
    experienceLevel: 'Mid-Level (3+ yrs)',
    salaryMin: 95000,
    salaryMax: 120000,
    openings: 1,
    status: 'open',
    postedDate: '2026-08-18',
    description: 'Support quarterly budgeting, headcount projections, revenue variance analysis, and executive financial reporting.',
    requirements: [
      'Bachelor’s in Finance, Economics, or Accounting; CPA a plus',
      'Expertise in complex financial modeling in Excel/Sheets',
      'Experience with ERP systems and SQL reporting',
      'Strong presentation skills to executive stakeholders'
    ]
  }
];

export const initialCandidates: Candidate[] = [
  {
    id: 'cand-1',
    jobId: 'job-1',
    jobTitle: 'Senior Cloud DevOps & SRE Engineer',
    name: 'Devon Bradley',
    email: 'devon.bradley@techmail.io',
    phone: '+1 (555) 762-9901',
    appliedDate: '2026-08-05',
    stage: 'interview',
    rating: 5,
    experienceYears: 7,
    currentCompany: 'Apex Cloud Solutions',
    portfolioOrLinkedin: 'linkedin.com/in/devonbradley-sre',
    resumeSummary: '7 years scaling multi-cluster EKS/GKE environments. Certified Kubernetes Administrator (CKA). Authored automated multi-region failover tools.',
    notes: 'Exceeded expectations in technical architectural interview. Strong alignment with team values.'
  },
  {
    id: 'cand-2',
    jobId: 'job-1',
    jobTitle: 'Senior Cloud DevOps & SRE Engineer',
    name: 'Leila Farrokh',
    email: 'leila.f@cloudnetwork.net',
    phone: '+1 (555) 891-2311',
    appliedDate: '2026-08-14',
    stage: 'screening',
    rating: 4,
    experienceYears: 5,
    currentCompany: 'FinTech Core Labs',
    portfolioOrLinkedin: 'github.com/leilaf-infra',
    resumeSummary: 'DevOps engineer specialized in Terraform infrastructure-as-code and automated canary rollouts via ArgoCD.',
    notes: 'Intro screen scheduled for Friday 2 PM.'
  },
  {
    id: 'cand-3',
    jobId: 'job-2',
    jobTitle: 'Product Marketing Manager',
    name: 'Julian Mercer',
    email: 'julian.mercer@consulting.org',
    phone: '+1 (555) 443-8822',
    appliedDate: '2026-08-16',
    stage: 'offered',
    rating: 5,
    experienceYears: 6,
    currentCompany: 'SaaS Pulse Inc',
    portfolioOrLinkedin: 'julianmercer.design/pasm',
    resumeSummary: 'Led 4 major Tier-1 enterprise GTM launches resulting in +42% pipeline expansion. Expert in product copywriting and competitor teardowns.',
    notes: 'Offer letter sent on Aug 24 ($130k base + performance bonus). Awaiting signature.'
  },
  {
    id: 'cand-4',
    jobId: 'job-3',
    jobTitle: 'Senior Financial Analyst',
    name: 'Rachel Zimmerman',
    email: 'rachel.zimmerman@financehub.com',
    phone: '+1 (555) 602-1144',
    appliedDate: '2026-08-20',
    stage: 'applied',
    rating: 4,
    experienceYears: 4,
    currentCompany: 'Deloitte Consulting',
    portfolioOrLinkedin: 'linkedin.com/in/rachelzimmerman-cpa',
    resumeSummary: 'Senior consultant specialized in tech sector audit and FP&A forecasting. Passed CPA with distinction.',
    notes: 'Resume looks very solid. Zoe reviewing today.'
  }
];

export const initialReviews: PerformanceReview[] = [
  {
    id: 'rev-1',
    employeeId: 'emp-6',
    employeeName: 'Sophia Lin',
    employeeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Engineering & Technology',
    reviewerName: 'Marcus Vance',
    cycle: 'Q2 2026',
    rating: 4.8,
    status: 'completed',
    goalsMetPercentage: 98,
    strengths: 'Outstanding engineering execution, decoupled design systems, elevated entire frontend performance benchmarks by 40%.',
    areasForGrowth: 'Continue expanding cross-departmental mentoring for junior engineers.',
    feedback: 'Sophia is a pillar of engineering excellence. Her leadership in migrating our frontend stack has saved countless developer hours.',
    submittedDate: '2026-07-02'
  },
  {
    id: 'rev-2',
    employeeId: 'emp-7',
    employeeName: 'Tariq Mansour',
    employeeAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Engineering & Technology',
    reviewerName: 'Marcus Vance',
    cycle: 'Q2 2026',
    rating: 4.6,
    status: 'completed',
    goalsMetPercentage: 94,
    strengths: 'Exceptional database optimization and microservice resiliency under high traffic load.',
    areasForGrowth: 'Documentation of internal API endpoints could be further standardized.',
    feedback: 'Tariq delivered rock-solid infrastructure improvements on time with zero unscheduled downtime.',
    submittedDate: '2026-07-03'
  },
  {
    id: 'rev-3',
    employeeId: 'emp-8',
    employeeName: 'Zoe Kaufman',
    employeeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    departmentName: 'Human Resources & Talent',
    reviewerName: 'Elena Rostova',
    cycle: 'Q2 2026',
    rating: 4.9,
    status: 'completed',
    goalsMetPercentage: 100,
    strengths: 'Closed critical leadership roles 2 weeks ahead of average cycle time. Superb candidate NPS score of 96%.',
    areasForGrowth: 'Initiate university campus outreach program in Q3.',
    feedback: 'Zoe is a true driver of talent velocity and cultural integrity.',
    submittedDate: '2026-07-05'
  }
];

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'act-1',
    timestamp: '2026-08-27 10:30 AM',
    actor: 'Elena Rostova',
    action: 'Approved leave request',
    target: 'Mateo Gomez (5 days Annual Leave)',
    type: 'leave'
  },
  {
    id: 'act-2',
    timestamp: '2026-08-27 09:45 AM',
    actor: 'Marcus Vance',
    action: 'Clocked in',
    target: 'HQ Office (08:45 AM)',
    type: 'attendance'
  },
  {
    id: 'act-3',
    timestamp: '2026-08-26 04:15 PM',
    actor: 'David Chen',
    action: 'Processed payroll batch',
    target: 'August 2026 Run ($164,800 Total Disbursed)',
    type: 'payroll'
  },
  {
    id: 'act-4',
    timestamp: '2026-08-25 02:00 PM',
    actor: 'Zoe Kaufman',
    action: 'Advanced candidate stage',
    target: 'Julian Mercer -> Offered (Product Marketing Manager)',
    type: 'recruitment'
  },
  {
    id: 'act-5',
    timestamp: '2026-08-24 11:10 AM',
    actor: 'Elena Rostova',
    action: 'Onboarded new employee',
    target: 'Amara Okafor (Enterprise Account Executive)',
    type: 'employee'
  }
];
