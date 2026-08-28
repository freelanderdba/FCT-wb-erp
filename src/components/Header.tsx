import React, { useState, useEffect } from 'react';
import { useHR } from '../context/HRContext';
import {
  Search,
  Clock,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Building2,
  UserCheck,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    employees,
    searchQuery,
    setSearchQuery,
    clockIn,
    clockOut,
    attendance,
    exportDataJSON,
    resetToDefaults,
    notificationMessage,
    setActiveTab
  } = useHR();

  const [time, setTime] = useState<string>('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const userTodayAttendance = attendance.find(
    a => a.employeeId === currentUser.id && a.date === today
  );
  const isClockedIn = Boolean(userTodayAttendance?.checkIn && !userTodayAttendance?.checkOut);

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
      {/* Toast Notification */}
      {notificationMessage && (
        <div className="fixed top-4 right-4 z-50 bg-cyan-950 border border-cyan-500/50 text-cyan-200 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notificationMessage}</span>
        </div>
      )}

      {/* Brand & Live Clock */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold tracking-wider text-sm">
            FCT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight">FCT WB ERP</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Enterprise HR
              </span>
            </div>
            <p className="text-xs text-slate-400">Human Capital & Resource Management</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300 text-xs">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono">{time}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">{new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-md min-w-[220px]">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search employees, roles, departments, jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Actions & User Perspective Switcher */}
      <div className="flex items-center gap-3">
        {/* Quick Punch Button */}
        <button
          onClick={() => {
            if (isClockedIn) {
              clockOut(currentUser.id);
            } else {
              clockIn(currentUser.id);
            }
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-sm ${
            isClockedIn
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
          }`}
          title={isClockedIn ? 'Click to clock out' : 'Click to clock in'}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>{isClockedIn ? 'Clock Out (Active)' : 'Quick Punch In'}</span>
        </button>

        {/* Data Tools: Export & Reset */}
        <div className="flex items-center gap-1.5 bg-slate-800/70 border border-slate-700/60 rounded-xl p-1">
          <button
            onClick={exportDataJSON}
            className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/60 rounded-lg transition-colors"
            title="Export JSON Backup"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowConfirmReset(true)}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700/60 rounded-lg transition-colors"
            title="Reset to Sample Enterprise Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Current User Persona Selector */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition-all text-left"
          >
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.firstName}
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-cyan-500/30"
            />
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-xs font-semibold text-slate-200">
                {currentUser.firstName} {currentUser.lastName}
              </div>
              <div className="text-[10px] text-slate-400 truncate max-w-[100px]">
                {currentUser.role}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50">
              <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                Switch Perspective
              </div>
              <div className="max-h-56 overflow-y-auto mt-1 space-y-1">
                {employees.map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => {
                      setCurrentUser(emp);
                      setShowUserDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
                      emp.id === currentUser.id
                        ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <img
                      src={emp.avatarUrl}
                      alt={emp.firstName}
                      className="w-6 h-6 rounded-md object-cover"
                    />
                    <div className="truncate">
                      <div className="text-slate-200 font-medium">
                        {emp.firstName} {emp.lastName}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{emp.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Reset Enterprise HR Database?</h3>
            <p className="text-xs text-slate-400 mb-6">
              This will restore all default mock employee profiles, attendance punches, payrolls, and candidate pipelines.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToDefaults();
                  setShowConfirmReset(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-600/20 transition-all"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
