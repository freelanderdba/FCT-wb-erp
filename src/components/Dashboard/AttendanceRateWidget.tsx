import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  UserCheck,
  Eye,
  Activity
} from 'lucide-react';
import { useHR } from '../../context/HRContext';

interface AttendanceRateWidgetProps {
  onInspect: () => void;
}

export const AttendanceRateWidget: React.FC<AttendanceRateWidgetProps> = ({ onInspect }) => {
  const { employees, attendance, clockIn, currentUser, setActiveTab } = useHR();
  const [activeTabMode, setActiveTabMode] = useState<'rate' | 'punctuality'>('rate');

  const totalEmployees = employees.length;
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today);
  const presentCount = todayAttendance.filter(a => a.status === 'present').length;
  const lateCount = todayAttendance.filter(a => a.status === 'late').length;
  const totalPresentOrLate = presentCount + lateCount;
  const attendanceRate = totalEmployees > 0 ? Math.round((totalPresentOrLate / totalEmployees) * 100) : 100;
  const onTimePercentage = totalPresentOrLate > 0 ? Math.round((presentCount / totalPresentOrLate) * 100) : 100;

  const isCurrentUserClockedIn = todayAttendance.some(
    a => a.employeeId === currentUser.id && a.checkIn && !a.checkOut
  );

  return (
    <div
      id="kpi-widget-attendance"
      className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-950/20 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Ambient indigo glow */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-inner">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-300">Today's Attendance</span>
              <div className="text-[10px] text-slate-500">Live Terminal Shift</div>
            </div>
          </div>

          {/* Toggle pill buttons */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTabMode('rate');
              }}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                activeTabMode === 'rate'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Presence
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTabMode('punctuality');
              }}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                activeTabMode === 'punctuality'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Punctual
            </button>
          </div>
        </div>

        {/* Dynamic Metric View */}
        {activeTabMode === 'rate' ? (
          <div className="mt-3.5 space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-white tracking-tight">{attendanceRate}%</span>
                <span className="text-xs font-semibold text-slate-400">
                  ({totalPresentOrLate}/{totalEmployees} present)
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                <Activity className="w-3.5 h-3.5" />
                <span>Live Active</span>
              </div>
            </div>

            {/* Attendance bar */}
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80 flex">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(presentCount / (totalEmployees || 1)) * 100}%` }}
              />
              {lateCount > 0 && (
                <div
                  className="bg-amber-500 h-full transition-all duration-500"
                  style={{ width: `${(lateCount / (totalEmployees || 1)) * 100}%` }}
                />
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span className="text-emerald-400 font-medium">{presentCount} On-Time</span>
              <span className="text-amber-400 font-medium">{lateCount} Late</span>
              <span>{Math.max(0, totalEmployees - totalPresentOrLate)} Off</span>
            </div>
          </div>
        ) : (
          <div className="mt-3.5 space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-white tracking-tight">{onTimePercentage}%</span>
                <span className="text-xs font-medium text-slate-400">Punctuality Score</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                +4% vs last week
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-0.5">
              <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Avg Clock-In</div>
                <div className="text-xs font-bold text-white mt-0.5">08:52 AM</div>
              </div>
              <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Overtime Logged</div>
                <div className="text-xs font-bold text-indigo-400 mt-0.5">4.5 hrs</div>
              </div>
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
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-indigo-400 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Punch Log</span>
        </button>

        {!isCurrentUserClockedIn ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clockIn(currentUser.id, 'Quick punch from KPI widget');
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-all shadow-xs"
          >
            <UserCheck className="w-3 h-3" />
            <span>Clock In</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('attendance')}
            className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group-hover:translate-x-0.5 duration-200"
          >
            <span>Terminal</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
