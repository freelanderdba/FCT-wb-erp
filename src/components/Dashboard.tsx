import React, { useState } from 'react';
import { useHR } from '../context/HRContext';
import {
  Users,
  Clock,
  CalendarCheck,
  CreditCard,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Plus,
  UserCheck,
  Send,
  Building
} from 'lucide-react';
import { ActiveEmployeesWidget } from './Dashboard/ActiveEmployeesWidget';
import { PendingLeavesWidget } from './Dashboard/PendingLeavesWidget';
import { CurrentMonthPayrollWidget } from './Dashboard/CurrentMonthPayrollWidget';
import { AttendanceRateWidget } from './Dashboard/AttendanceRateWidget';
import { KpiDrilldownModal, DrilldownType } from './Dashboard/KpiDrilldownModal';

export const Dashboard: React.FC = () => {
  const {
    employees,
    departments,
    attendance,
    leaves,
    payrolls,
    jobs,
    candidates,
    activities,
    setActiveTab,
    reviewLeave
  } = useHR();

  const [drilldownType, setDrilldownType] = useState<DrilldownType>(null);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const onLeaveEmployees = employees.filter(e => e.status === 'on_leave').length;
  
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today);
  const presentCount = todayAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
  const attendanceRate = totalEmployees > 0 ? Math.round((presentCount / totalEmployees) * 100) : 100;

  const pendingLeavesList = leaves.filter(l => l.status === 'pending');
  const openJobsCount = jobs.filter(j => j.status === 'open').length;

  const currentMonthPayrolls = payrolls.filter(p => p.month === 'August 2026');
  const totalPayrollGross = currentMonthPayrolls.reduce((sum, p) => sum + p.grossPay, 0);
  const totalPayrollNet = currentMonthPayrolls.reduce((sum, p) => sum + p.netPay, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Interactive KPI Drilldown Modal */}
      <KpiDrilldownModal
        type={drilldownType}
        onClose={() => setDrilldownType(null)}
      />

      {/* Top Welcome & Quick Summary Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              <span>Overview & Analytics</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Human Resources Command Center
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Real-time operational visibility across personnel directories, active shifts, leave pipelines, and payroll cycles.
            </p>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('employees')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
            <button
              onClick={() => setActiveTab('leaves')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-amber-400" />
              <span>Review Leaves</span>
            </button>
            <button
              onClick={() => setActiveTab('payroll')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Process Payroll</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic & Interactive KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Employees Card */}
        <ActiveEmployeesWidget onInspect={() => setDrilldownType('employees')} />

        {/* KPI 2: Today's Attendance Card */}
        <AttendanceRateWidget onInspect={() => setDrilldownType('attendance')} />

        {/* KPI 3: Pending Leave Requests Card */}
        <PendingLeavesWidget onInspect={() => setDrilldownType('leaves')} />

        {/* KPI 4: Current Month Payroll Card */}
        <CurrentMonthPayrollWidget onInspect={() => setDrilldownType('payroll')} />
      </div>

      {/* Main Grid: Pending Approvals & Department Headcounts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Pending Leaves & Active Candidates */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Leave Requests Module */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Pending Leave Approvals</h3>
                <p className="text-xs text-slate-400">Employees awaiting time-off authorization</p>
              </div>
              <button
                onClick={() => setActiveTab('leaves')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                View all leaves <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {pendingLeavesList.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500/40" />
                <span>All employee leave requests have been reviewed and approved!</span>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingLeavesList.map((req) => (
                  <div
                    key={req.id}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={req.employeeAvatar}
                        alt={req.employeeName}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{req.employeeName}</span>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {req.type} leave
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {req.departmentName} • {req.startDate} to {req.endDate} ({req.days} days)
                        </div>
                        <div className="text-xs text-slate-300 italic mt-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                          "{req.reason}"
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => reviewLeave(req.id, 'approved', 'Approved from Dashboard')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => reviewLeave(req.id, 'rejected', 'Declined from Dashboard')}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 text-xs font-medium border border-slate-700 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Department Headcount Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Department Headcount & Allocation</h3>
                <p className="text-xs text-slate-400">Distribution of talent across business units</p>
              </div>
              <button
                onClick={() => setActiveTab('organization')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                Org Structure <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {departments.map((dept) => {
                const percentage = totalEmployees > 0 ? Math.round((dept.headcount / totalEmployees) * 100) : 0;
                return (
                  <div key={dept.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: dept.color }}
                        />
                        <span className="font-semibold text-slate-200">{dept.name}</span>
                        <span className="text-[10px] text-slate-400">({dept.code})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">${(dept.budget / 1000).toFixed(0)}k budget</span>
                        <span className="font-bold text-white">{dept.headcount} team members</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%`, backgroundColor: dept.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1 span): Live Activity Stream & Open Positions */}
        <div className="space-y-6">
          {/* Open Recruitment Positions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white">Active Hiring Pipeline</h3>
              <button
                onClick={() => setActiveTab('recruitment')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                ATS Board
              </button>
            </div>

            <div className="space-y-2.5">
              {jobs.map((job) => {
                const applicants = candidates.filter(c => c.jobId === job.id).length;
                return (
                  <div
                    key={job.id}
                    className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white">{job.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {job.department} • {job.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {applicants} candidates
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Enterprise Audit Trail */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Recent System Activity</h3>
              <button
                onClick={() => setActiveTab('audit')}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                View all
              </button>
            </div>

            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
              {activities.slice(0, 5).map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-slate-200 font-medium leading-tight">
                      <span className="font-semibold text-white">{act.actor}</span> {act.action}
                    </div>
                    <div className="text-[11px] text-cyan-400/90 mt-0.5 font-mono">
                      {act.target}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{act.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
