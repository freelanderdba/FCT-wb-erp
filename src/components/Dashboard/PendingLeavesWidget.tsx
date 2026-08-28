import React, { useState } from 'react';
import {
  CalendarCheck,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Check,
  X,
  Eye,
  Calendar
} from 'lucide-react';
import { useHR } from '../../context/HRContext';

interface PendingLeavesWidgetProps {
  onInspect: () => void;
}

export const PendingLeavesWidget: React.FC<PendingLeavesWidgetProps> = ({ onInspect }) => {
  const { leaves, reviewLeave, setActiveTab } = useHR();
  const [activeView, setActiveView] = useState<'queue' | 'breakdown'>('queue');

  const pendingLeaves = leaves.filter(l => l.status === 'pending');
  const approvedLeavesCount = leaves.filter(l => l.status === 'approved').length;
  const totalLeaveDaysPending = pendingLeaves.reduce((sum, l) => sum + l.days, 0);

  // Categorize pending leaves by type
  const sickLeaves = pendingLeaves.filter(l => l.type === 'sick').length;
  const annualLeaves = pendingLeaves.filter(l => l.type === 'annual').length;
  const parentalLeaves = pendingLeaves.filter(l => l.type === 'parental' || l.type === 'unpaid' || l.type === 'bereavement').length;

  return (
    <div
      id="kpi-widget-pending-leaves"
      className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:shadow-amber-950/20 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Ambient amber glow */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-inner">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-300">Pending Leave Requests</span>
              <div className="text-[10px] text-slate-500">Approval Queue</div>
            </div>
          </div>

          {/* Toggle pill buttons */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('queue');
              }}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                activeView === 'queue'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Queue
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('breakdown');
              }}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                activeView === 'breakdown'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Types
            </button>
          </div>
        </div>

        {/* Dynamic Metric View */}
        {activeView === 'queue' ? (
          <div className="mt-3.5 space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tracking-tight">{pendingLeaves.length}</span>
                <span className="text-xs font-semibold text-slate-400">requests ({totalLeaveDaysPending} days total)</span>
              </div>
              {pendingLeaves.length > 0 ? (
                <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Action Needed</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>All Clean</span>
                </div>
              )}
            </div>

            {/* Quick mini-queue preview if items exist */}
            {pendingLeaves.length > 0 ? (
              <div className="space-y-1.5 pt-1">
                {pendingLeaves.slice(0, 2).map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <img
                        src={req.employeeAvatar}
                        alt={req.employeeName}
                        className="w-5 h-5 rounded-full object-cover shrink-0"
                      />
                      <div className="truncate">
                        <span className="text-white font-medium truncate">{req.employeeName}</span>
                        <span className="text-[10px] text-slate-400 ml-1.5">({req.days}d {req.type})</span>
                      </div>
                    </div>

                    {/* Fast inline quick-action buttons */}
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          reviewLeave(req.id, 'approved', 'Quick approved from KPI widget');
                        }}
                        title="Fast Approve"
                        className="p-1 rounded bg-emerald-600/30 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-colors"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          reviewLeave(req.id, 'rejected', 'Declined from KPI widget');
                        }}
                        title="Fast Decline"
                        className="p-1 rounded bg-slate-800 hover:bg-rose-600/40 text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-2 text-center text-slate-500 text-xs flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500/70" />
                <span>Zero backlogged requests</span>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-3.5 space-y-2">
            <div className="text-xs font-semibold text-slate-300">Pending Category Breakdown</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Annual PTO</div>
                <div className="text-base font-bold text-amber-400 mt-0.5">{annualLeaves}</div>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Sick Leave</div>
                <div className="text-base font-bold text-rose-400 mt-0.5">{sickLeaves}</div>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Other</div>
                <div className="text-base font-bold text-cyan-400 mt-0.5">{parentalLeaves}</div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
              <span>{approvedLeavesCount} historical approvals</span>
              <span className="text-emerald-400 font-medium">96% approval rate</span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Bottom Action Bar */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspect();
          }}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-amber-400 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Review Drawer</span>
        </button>

        <button
          onClick={() => setActiveTab('leaves')}
          className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors group-hover:translate-x-0.5 duration-200"
        >
          <span>Leave Manager</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
