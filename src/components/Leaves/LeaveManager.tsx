import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { LeaveType, LeaveStatus } from '../../types';
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Filter,
  Calendar,
  AlertTriangle,
  User,
  MessageSquare
} from 'lucide-react';

export const LeaveManager: React.FC = () => {
  const {
    leaves,
    currentUser,
    applyLeave,
    reviewLeave,
    employees
  } = useHR();

  const [selectedTab, setSelectedTab] = useState<'pending' | 'history' | 'all'>('pending');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [actionLeaveModal, setActionLeaveModal] = useState<{
    id: string;
    action: LeaveStatus;
    employeeName: string;
  } | null>(null);
  const [actionComment, setActionComment] = useState('');

  // Apply leave form state
  const [applyForm, setApplyForm] = useState({
    type: 'annual' as LeaveType,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    days: 3,
    reason: ''
  });

  const pendingLeaves = leaves.filter((l) => l.status === 'pending');
  const historyLeaves = leaves.filter((l) => l.status !== 'pending');

  const displayedLeaves =
    selectedTab === 'pending'
      ? pendingLeaves
      : selectedTab === 'history'
      ? historyLeaves
      : leaves;

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyLeave({
      employeeId: currentUser.id,
      employeeName: `${currentUser.firstName} ${currentUser.lastName}`,
      employeeAvatar: currentUser.avatarUrl,
      departmentName: currentUser.departmentName,
      type: applyForm.type,
      startDate: applyForm.startDate,
      endDate: applyForm.endDate,
      days: Number(applyForm.days),
      reason: applyForm.reason
    });

    setIsApplyModalOpen(false);
    setApplyForm({
      type: 'annual',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      days: 3,
      reason: ''
    });
  };

  const handleConfirmAction = () => {
    if (!actionLeaveModal) return;
    reviewLeave(actionLeaveModal.id, actionLeaveModal.action, actionComment);
    setActionLeaveModal(null);
    setActionComment('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Apply Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Time-Off & Leave Management</h2>
          <p className="text-xs text-slate-400">
            Authorize PTO requests, review team availability calendars, and track personal balances.
          </p>
        </div>

        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Leave Request</span>
        </button>
      </div>

      {/* Leave Balances Grid for Current User */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400">Annual Paid Vacation</div>
          <div className="mt-2 text-2xl font-bold text-white">
            {currentUser.leaveBalances.annual - currentUser.leaveBalances.usedAnnual}{' '}
            <span className="text-xs text-slate-500 font-normal">/ {currentUser.leaveBalances.annual} days left</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-cyan-500 h-full rounded-full"
              style={{
                width: `${((currentUser.leaveBalances.annual - currentUser.leaveBalances.usedAnnual) / currentUser.leaveBalances.annual) * 100}%`
              }}
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400">Medical & Sick Leave</div>
          <div className="mt-2 text-2xl font-bold text-emerald-400">
            {currentUser.leaveBalances.sick - currentUser.leaveBalances.usedSick}{' '}
            <span className="text-xs text-slate-500 font-normal">/ {currentUser.leaveBalances.sick} days left</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{
                width: `${((currentUser.leaveBalances.sick - currentUser.leaveBalances.usedSick) / currentUser.leaveBalances.sick) * 100}%`
              }}
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400">Parental / Maternity</div>
          <div className="mt-2 text-2xl font-bold text-purple-400">
            {currentUser.leaveBalances.parental}{' '}
            <span className="text-xs text-slate-500 font-normal">days available</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500">Fully paid standard policy</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400">Pending Approvals</div>
          <div className="mt-2 text-2xl font-bold text-amber-400">
            {pendingLeaves.length}{' '}
            <span className="text-xs text-slate-500 font-normal">requests in queue</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500">Manager review required</div>
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedTab('pending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedTab === 'pending'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pending Requests ({pendingLeaves.length})
          </button>
          <button
            onClick={() => setSelectedTab('history')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedTab === 'history'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Processed History ({historyLeaves.length})
          </button>
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedTab === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Requests ({leaves.length})
          </button>
        </div>
      </div>

      {/* Leaves Roster Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Employee</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">Leave Type</th>
                <th className="px-4 py-3.5">Schedule Duration</th>
                <th className="px-4 py-3.5">Days</th>
                <th className="px-4 py-3.5">Reason & Comments</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {displayedLeaves.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                    No requests found for the selected view.
                  </td>
                </tr>
              ) : (
                displayedLeaves.map((req) => {
                  const typeColors: Record<LeaveType, string> = {
                    annual: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
                    sick: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                    parental: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                    unpaid: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
                    bereavement: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  };

                  return (
                    <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={req.employeeAvatar}
                            alt={req.employeeName}
                            className="w-8 h-8 rounded-xl object-cover"
                          />
                          <div>
                            <span className="font-bold text-white text-xs block">
                              {req.employeeName}
                            </span>
                            <span className="text-[10px] text-slate-500">Applied {req.appliedDate}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">{req.departmentName}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                            typeColors[req.type]
                          }`}
                        >
                          {req.type}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-mono">
                        {req.startDate} <span className="text-slate-500">→</span> {req.endDate}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-white">{req.days} days</td>
                      <td className="px-4 py-3.5 max-w-xs">
                        <div className="text-slate-300 italic truncate">"{req.reason}"</div>
                        {req.approverComment && (
                          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-cyan-400" />
                            <span>Approver: {req.approverComment}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                            req.status === 'approved'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : req.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {req.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() =>
                                setActionLeaveModal({
                                  id: req.id,
                                  action: 'approved',
                                  employeeName: req.employeeName
                                })
                              }
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                setActionLeaveModal({
                                  id: req.id,
                                  action: 'rejected',
                                  employeeName: req.employeeName
                                })
                              }
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 text-xs font-medium border border-slate-700"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-500">
                            By {req.reviewedBy || 'Admin'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Submit Leave Request */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Submit Time-Off Request</h3>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 mb-1 block">Leave Category</label>
                <select
                  value={applyForm.type}
                  onChange={(e) => setApplyForm({ ...applyForm, type: e.target.value as LeaveType })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value="annual">Annual Paid Vacation</option>
                  <option value="sick">Medical / Sick Leave</option>
                  <option value="parental">Parental Leave</option>
                  <option value="bereavement">Bereavement</option>
                  <option value="unpaid">Unpaid Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Start Date</label>
                  <input
                    type="date"
                    required
                    value={applyForm.startDate}
                    onChange={(e) => setApplyForm({ ...applyForm, startDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">End Date</label>
                  <input
                    type="date"
                    required
                    value={applyForm.endDate}
                    onChange={(e) => setApplyForm({ ...applyForm, endDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 mb-1 block">Total Work Days</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  required
                  value={applyForm.days}
                  onChange={(e) => setApplyForm({ ...applyForm, days: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 mb-1 block">Reason for Request</label>
                <textarea
                  rows={3}
                  required
                  value={applyForm.reason}
                  onChange={(e) => setApplyForm({ ...applyForm, reason: e.target.value })}
                  placeholder="Provide context for manager review..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold shadow-lg shadow-cyan-600/20"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Review/Comment on Leave Action */}
      {actionLeaveModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">
              {actionLeaveModal.action === 'approved' ? 'Approve' : 'Reject'} Leave Request
            </h3>
            <p className="text-xs text-slate-400">
              Confirm decision for <span className="font-semibold text-white">{actionLeaveModal.employeeName}</span>.
            </p>

            <div>
              <label className="text-slate-400 text-xs mb-1 block">Approver Comments / Note (Optional)</label>
              <input
                type="text"
                value={actionComment}
                onChange={(e) => setActionComment(e.target.value)}
                placeholder={
                  actionLeaveModal.action === 'approved'
                    ? 'e.g. Approved. Please ensure project handover is done.'
                    : 'e.g. Denied due to critical production deployment window.'
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setActionLeaveModal(null)}
                className="px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 text-xs font-semibold text-white rounded-xl ${
                  actionLeaveModal.action === 'approved'
                    ? 'bg-emerald-600 hover:bg-emerald-500'
                    : 'bg-rose-600 hover:bg-rose-500'
                }`}
              >
                Confirm {actionLeaveModal.action === 'approved' ? 'Approval' : 'Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
