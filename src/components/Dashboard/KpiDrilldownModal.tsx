import React, { useState } from 'react';
import {
  X,
  Users,
  CalendarCheck,
  CreditCard,
  Clock,
  ExternalLink,
  Check,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Building,
  Mail,
  Phone,
  DollarSign
} from 'lucide-react';
import { useHR } from '../../context/HRContext';
import { LeaveRequest } from '../../types';

export type DrilldownType = 'employees' | 'leaves' | 'payroll' | 'attendance' | null;

interface KpiDrilldownModalProps {
  type: DrilldownType;
  onClose: () => void;
}

export const KpiDrilldownModal: React.FC<KpiDrilldownModalProps> = ({ type, onClose }) => {
  const {
    employees,
    departments,
    leaves,
    payrolls,
    attendance,
    reviewLeave,
    setActiveTab,
    processAllPayrolls,
    updatePayrollStatus
  } = useHR();

  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [leaveComment, setLeaveComment] = useState<string>('');

  if (!type) return null;

  return (
    <div
      id="kpi-drilldown-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="kpi-drilldown-modal-container"
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            {type === 'employees' && (
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            )}
            {type === 'leaves' && (
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
            )}
            {type === 'payroll' && (
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
            )}
            {type === 'attendance' && (
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            )}

            <div>
              <h2 className="text-base font-bold text-white">
                {type === 'employees' && 'Active Workforce Roster & Analytics'}
                {type === 'leaves' && 'Pending Leave Approvals & Triage'}
                {type === 'payroll' && 'August 2026 Payroll Summary & Disbursements'}
                {type === 'attendance' && "Today's Workforce Attendance & Punch Log"}
              </h2>
              <p className="text-xs text-slate-400">
                {type === 'employees' && 'Detailed breakdown of active team members across departments'}
                {type === 'leaves' && 'Review, authorize, or decline employee time-off requests'}
                {type === 'payroll' && 'Manage salary disbursements, deductions, and tax withholdings'}
                {type === 'attendance' && 'Live shift tracking, punctuality ratios, and check-in times'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                setActiveTab(type);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <span>Full Module</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* EMPLOYEES DRILLDOWN */}
          {type === 'employees' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">Filter Department:</span>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="all">All Departments ({employees.length})</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-xs text-slate-400">
                  Showing {employees.filter(e => filterDepartment === 'all' || e.departmentName === filterDepartment).length} employees
                </div>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {employees
                  .filter((e) => filterDepartment === 'all' || e.departmentName === filterDepartment)
                  .map((emp) => (
                    <div
                      key={emp.id}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatarUrl}
                          alt={emp.firstName}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{emp.firstName} {emp.lastName}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({emp.code})</span>
                            <span
                              className={`text-[10px] px-2 py-0.2 rounded-full font-medium ${
                                emp.status === 'active'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : emp.status === 'on_leave'
                                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}
                            >
                              {emp.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {emp.role} • {emp.departmentName} • {emp.location}
                          </div>
                        </div>
                      </div>

                      <div className="text-right text-xs">
                        <div className="font-semibold text-white">${emp.salary.toLocaleString()}/mo</div>
                        <div className="text-[10px] text-slate-400">{emp.employmentType}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* LEAVES DRILLDOWN */}
          {type === 'leaves' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-300 font-semibold">
                Pending Requests Awaiting Executive Approval
              </div>

              {leaves.filter(l => l.status === 'pending').length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500/60" />
                  <span className="text-slate-300 font-semibold">All Leave Requests Handled</span>
                  <span className="text-slate-500">No employees are currently awaiting PTO or sick leave authorization.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {leaves
                    .filter((l) => l.status === 'pending')
                    .map((req) => (
                      <div
                        key={req.id}
                        className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
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
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                reviewLeave(req.id, 'approved', 'Approved from KPI Quick Triage');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => {
                                reviewLeave(req.id, 'rejected', 'Declined per team bandwidth');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 text-xs font-medium border border-slate-700 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Decline</span>
                            </button>
                          </div>
                        </div>

                        <div className="text-xs text-slate-300 italic bg-slate-900 px-3 py-2 rounded-lg border border-slate-800/80">
                          "{req.reason}"
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* PAYROLL DRILLDOWN */}
          {type === 'payroll' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <div>
                  <div className="text-xs font-bold text-white">August 2026 Batch Cycle</div>
                  <div className="text-[11px] text-slate-400">
                    {payrolls.filter(p => p.month === 'August 2026' && p.status === 'paid').length} of{' '}
                    {payrolls.filter(p => p.month === 'August 2026').length} Records Disbursed
                  </div>
                </div>
                <button
                  onClick={() => processAllPayrolls('August 2026')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md"
                >
                  Disburse All Remaining
                </button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {payrolls
                  .filter((p) => p.month === 'August 2026')
                  .map((rec) => (
                    <div
                      key={rec.id}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{rec.employeeName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({rec.employeeCode})</span>
                          <span
                            className={`text-[10px] px-2 py-0.2 rounded-full font-medium ${
                              rec.status === 'paid'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            {rec.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {rec.role} • {rec.departmentName}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-right">
                        <div className="text-xs">
                          <div className="font-bold text-white font-mono">${rec.netPay.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-400">Gross: ${rec.grossPay.toLocaleString()}</div>
                        </div>

                        {rec.status !== 'paid' && (
                          <button
                            onClick={() => updatePayrollStatus(rec.id, 'paid')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors"
                          >
                            Pay
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ATTENDANCE DRILLDOWN */}
          {type === 'attendance' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-white">Today's Live Punch Feed</div>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {attendance
                  .filter((a) => a.date === new Date().toISOString().split('T')[0])
                  .map((rec) => (
                    <div
                      key={rec.id}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={rec.employeeAvatar}
                          alt={rec.employeeName}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{rec.employeeName}</span>
                            <span
                              className={`text-[10px] px-2 py-0.2 rounded-full font-medium ${
                                rec.status === 'present'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : rec.status === 'late'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              }`}
                            >
                              {rec.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {rec.departmentName} • Clock-in: {rec.checkIn || 'N/A'} {rec.checkOut ? `• Out: ${rec.checkOut}` : ''}
                          </div>
                        </div>
                      </div>

                      <div className="text-right text-xs">
                        <div className="font-bold text-white font-mono">{rec.workHours} hrs</div>
                        <div className="text-[10px] text-slate-400">{rec.notes || 'Normal shift'}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Real-time state synchronized with FCT WB ERP database.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
