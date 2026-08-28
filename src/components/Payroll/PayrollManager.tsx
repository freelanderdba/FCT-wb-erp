import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { PayrollRecord, PayrollStatus } from '../../types';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Download,
  CheckCircle2,
  Clock,
  Printer,
  FileText,
  Building,
  ShieldCheck,
  RefreshCw,
  Send
} from 'lucide-react';

export const PayrollManager: React.FC = () => {
  const {
    payrolls,
    generateMonthlyPayroll,
    updatePayrollStatus,
    processAllPayrolls
  } = useHR();

  const [selectedMonth, setSelectedMonth] = useState<string>('August 2026');
  const [viewingPayslip, setViewingPayslip] = useState<PayrollRecord | null>(null);

  const monthPayrolls = payrolls.filter((p) => p.month === selectedMonth);
  const totalGross = monthPayrolls.reduce((sum, p) => sum + p.grossPay, 0);
  const totalDeductions = monthPayrolls.reduce((sum, p) => sum + p.totalDeductions, 0);
  const totalNet = monthPayrolls.reduce((sum, p) => sum + p.netPay, 0);
  const paidCount = monthPayrolls.filter((p) => p.status === 'paid').length;
  const pendingCount = monthPayrolls.filter((p) => p.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header & Payroll Run Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Payroll & Compensation</h2>
          <p className="text-xs text-slate-400">
            Execute salary batches, calculate tax withholdings, audit benefits, and disburse pay slips.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => generateMonthlyPayroll(selectedMonth)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recalculate Batch</span>
          </button>
          <button
            onClick={() => processAllPayrolls(selectedMonth)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Disburse All ({pendingCount} pending)</span>
          </button>
        </div>
      </div>

      {/* Payroll Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400">Total Net Disbursal</div>
          <div className="mt-2 text-2xl font-bold text-emerald-400">
            ${totalNet.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {paidCount} of {monthPayrolls.length} employees paid
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400">Total Gross Compensation</div>
          <div className="mt-2 text-2xl font-bold text-white">
            ${totalGross.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-slate-400">Before taxes and benefit cuts</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400">Tax & Benefit Withholdings</div>
          <div className="mt-2 text-2xl font-bold text-rose-400">
            ${totalDeductions.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-slate-400">FICA, State & Health Plans</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400">Active Payroll Cycle</div>
          <div className="mt-2 text-xl font-bold text-cyan-400">{selectedMonth}</div>
          <div className="mt-2 text-xs text-slate-400">Monthly auto-deposit ACH</div>
        </div>
      </div>

      {/* Filter & Cycle Selection */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-semibold">Select Payroll Cycle:</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
          >
            <option value="August 2026">August 2026</option>
            <option value="July 2026">July 2026</option>
            <option value="June 2026">June 2026</option>
            <option value="September 2026">September 2026 (Upcoming)</option>
          </select>
        </div>

        <div className="text-xs text-slate-400">
          Showing <span className="font-bold text-white">{monthPayrolls.length}</span> roster payroll records
        </div>
      </div>

      {/* Payroll Roster Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Employee</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">Base Salary</th>
                <th className="px-4 py-3.5">Allowances & Bonus</th>
                <th className="px-4 py-3.5">Gross Pay</th>
                <th className="px-4 py-3.5">Deductions</th>
                <th className="px-4 py-3.5">Net Pay</th>
                <th className="px-4 py-3.5">Disbursement Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {monthPayrolls.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500 text-xs">
                    No payroll generated for {selectedMonth}. Click "Recalculate Batch" above to generate.
                  </td>
                </tr>
              ) : (
                monthPayrolls.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div>
                        <div className="font-bold text-white text-xs">{rec.employeeName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{rec.employeeCode} • {rec.role}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">{rec.departmentName}</td>
                    <td className="px-4 py-3.5 font-mono">${rec.baseSalary.toLocaleString()}</td>
                    <td className="px-4 py-3.5 font-mono text-emerald-400">
                      +${(rec.allowances + rec.bonus + rec.overtimePay).toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-white font-mono">
                      ${rec.grossPay.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-rose-400">
                      -${rec.totalDeductions.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-emerald-400 font-mono text-sm">
                      ${rec.netPay.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                          rec.status === 'paid'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {rec.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingPayslip(rec)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 text-xs font-semibold border border-slate-700 transition-colors"
                          title="Generate Pay Slip"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Payslip</span>
                        </button>
                        {rec.status !== 'paid' && (
                          <button
                            onClick={() => updatePayrollStatus(rec.id, 'paid')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                          >
                            Mark Paid
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Official Pay Slip Preview & Print */}
      {viewingPayslip && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-6">
            {/* Payslip Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-cyan-400 text-base">FCT GROUP ENTERPRISE</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Official Pay Statement
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Pay Cycle Period: {viewingPayslip.month}</p>
              </div>
              <button
                onClick={() => setViewingPayslip(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Employee & Bank Info */}
            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <div className="text-slate-500 text-[10px]">EMPLOYEE NAME & ID</div>
                <div className="font-bold text-white text-sm">{viewingPayslip.employeeName}</div>
                <div className="text-cyan-400 font-mono">{viewingPayslip.employeeCode} • {viewingPayslip.role}</div>
                <div className="text-slate-400 mt-1">{viewingPayslip.departmentName}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">PAYMENT METHOD & DATE</div>
                <div className="font-semibold text-white">{viewingPayslip.paymentMethod}</div>
                <div className="text-slate-400 mt-1">Disbursement Date: {viewingPayslip.paymentDate || 'Pending Schedule'}</div>
                <div className="text-emerald-400 font-semibold mt-1">Status: {viewingPayslip.status.toUpperCase()}</div>
              </div>
            </div>

            {/* Itemized Earnings & Deductions */}
            <div className="grid grid-cols-2 gap-4">
              {/* Earnings */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="text-xs font-bold text-emerald-400 border-b border-slate-800 pb-1.5 uppercase">
                  Earnings
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Base Compensation</span>
                  <span className="font-mono">${viewingPayslip.baseSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Allowances</span>
                  <span className="font-mono">${viewingPayslip.allowances.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Performance Bonus</span>
                  <span className="font-mono">${viewingPayslip.bonus.toLocaleString()}</span>
                </div>
                {viewingPayslip.overtimePay > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Overtime Differential</span>
                    <span className="font-mono">${viewingPayslip.overtimePay.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Gross</span>
                  <span className="font-mono">${viewingPayslip.grossPay.toLocaleString()}</span>
                </div>
              </div>

              {/* Deductions */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="text-xs font-bold text-rose-400 border-b border-slate-800 pb-1.5 uppercase">
                  Deductions
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Federal/State Tax</span>
                  <span className="font-mono">-${viewingPayslip.taxDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Healthcare & Benefits</span>
                  <span className="font-mono">-${viewingPayslip.benefitsDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-rose-400 pt-2 border-t border-slate-800">
                  <span>Total Deductions</span>
                  <span className="font-mono">-${viewingPayslip.totalDeductions.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Net Amount Banner */}
            <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">NET DISBURSED AMOUNT</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ${viewingPayslip.netPay.toLocaleString()} USD
                </div>
              </div>
              <ShieldCheck className="w-8 h-8 text-emerald-400/60" />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setViewingPayslip(null)}
                className="px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl shadow-lg shadow-cyan-600/20"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Statement</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
