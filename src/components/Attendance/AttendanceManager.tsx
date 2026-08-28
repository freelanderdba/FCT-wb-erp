import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { AttendanceStatus } from '../../types';
import {
  Clock,
  Calendar,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Timer,
  Plus,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

export const AttendanceManager: React.FC = () => {
  const {
    attendance,
    employees,
    currentUser,
    clockIn,
    clockOut,
    addAttendanceRecord
  } = useHR();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Manual record form
  const [manualForm, setManualForm] = useState({
    employeeId: employees[0]?.id || '',
    date: selectedDate,
    checkIn: '09:00',
    checkOut: '17:30',
    workHours: 8.5,
    status: 'present' as AttendanceStatus,
    notes: 'Admin manual log adjustment'
  });

  const today = new Date().toISOString().split('T')[0];
  const userTodayRec = attendance.find(
    (a) => a.employeeId === currentUser.id && a.date === today
  );
  const isClockedIn = Boolean(userTodayRec?.checkIn && !userTodayRec?.checkOut);

  // Records for selected date
  const filteredAttendance = attendance.filter((a) => {
    const matchesDate = !selectedDate || a.date === selectedDate;
    const matchesStatus = selectedStatus === 'all' || a.status === selectedStatus;
    return matchesDate && matchesStatus;
  });

  const presentCount = filteredAttendance.filter(
    (a) => a.status === 'present' || a.status === 'late'
  ).length;
  const lateCount = filteredAttendance.filter((a) => a.status === 'late').length;
  const totalHoursWorked = filteredAttendance.reduce((sum, a) => sum + (a.workHours || 0), 0);
  const totalOvertime = filteredAttendance.reduce((sum, a) => sum + (a.overtimeHours || 0), 0);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === manualForm.employeeId);
    if (!emp) return;

    addAttendanceRecord({
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      employeeAvatar: emp.avatarUrl,
      departmentName: emp.departmentName,
      date: manualForm.date,
      checkIn: manualForm.checkIn,
      checkOut: manualForm.checkOut,
      workHours: Number(manualForm.workHours),
      status: manualForm.status,
      overtimeHours:
        Number(manualForm.workHours) > 8 ? Number(manualForm.workHours) - 8 : 0,
      notes: manualForm.notes
    });

    setIsManualModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Punch Clock Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Punch Terminal */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Self-Service Terminal
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                IP: 192.168.1.104
              </span>
            </div>

            <div className="flex items-center gap-3.5 mb-5">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.firstName}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-cyan-500/30"
              />
              <div>
                <h3 className="text-base font-bold text-white">
                  {currentUser.firstName} {currentUser.lastName}
                </h3>
                <p className="text-xs text-slate-400">{currentUser.role}</p>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{currentUser.location}</span>
                </div>
              </div>
            </div>

            {/* Today status box */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 mb-5 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Check-in Status:</span>
                <span className="font-semibold text-white">
                  {userTodayRec?.checkIn ? userTodayRec.checkIn : 'Not Punched'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Check-out Status:</span>
                <span className="font-semibold text-white">
                  {userTodayRec?.checkOut ? userTodayRec.checkOut : isClockedIn ? 'In Progress' : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Today's Shift:</span>
                <span className="font-semibold text-cyan-400">
                  {userTodayRec?.workHours ? `${userTodayRec.workHours} hrs` : '0.0 hrs'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => clockIn(currentUser.id)}
              disabled={isClockedIn}
              className={`py-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                isClockedIn
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Punch In</span>
            </button>
            <button
              onClick={() => clockOut(currentUser.id)}
              disabled={!isClockedIn}
              className={`py-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                !isClockedIn
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>Punch Out</span>
            </button>
          </div>
        </div>

        {/* 2-Column Daily Metrics */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs text-slate-400 font-semibold mb-1">Present on Date</div>
            <div className="text-3xl font-bold text-white tracking-tight">{presentCount}</div>
            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Normal Schedule
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs text-slate-400 font-semibold mb-1">Late Check-ins</div>
            <div className="text-3xl font-bold text-amber-400 tracking-tight">{lateCount}</div>
            <div className="text-xs text-slate-400 mt-2">After 09:15 AM threshold</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs text-slate-400 font-semibold mb-1">Total Hours Logged</div>
            <div className="text-3xl font-bold text-cyan-400 tracking-tight">
              {totalHoursWorked.toFixed(1)} hrs
            </div>
            <div className="text-xs text-slate-400 mt-2">
              Overtime: <span className="text-white font-semibold">{totalOvertime.toFixed(1)} hrs</span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Shift Compliance Rule</div>
                <div className="text-[11px] text-slate-400">
                  Standard shift is 8.0 hours. Automatic 1-hour lunch deduction applies.
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsManualModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>Manual Time Entry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Date & Status Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold">Select Log Date:</span>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Statuses ({filteredAttendance.length})</option>
            <option value="present">Present</option>
            <option value="late">Late</option>
            <option value="on_leave">On Leave</option>
            <option value="absent">Absent</option>
            <option value="half_day">Half Day</option>
          </select>
        </div>
      </div>

      {/* Daily Attendance Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Employee</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5">Check In</th>
                <th className="px-4 py-3.5">Check Out</th>
                <th className="px-4 py-3.5">Work Duration</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                    No attendance records logged for {selectedDate}.
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={rec.employeeAvatar}
                          alt={rec.employeeName}
                          className="w-8 h-8 rounded-xl object-cover"
                        />
                        <span className="font-bold text-white text-xs">{rec.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">{rec.departmentName}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-400">{rec.date}</td>
                    <td className="px-4 py-3.5 font-mono text-emerald-400 font-semibold">
                      {rec.checkIn || '—'}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-amber-400">
                      {rec.checkOut || (rec.checkIn ? 'Active' : '—')}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-white">
                      {rec.workHours ? `${rec.workHours} hrs` : '0.0 hrs'}
                      {rec.overtimeHours ? (
                        <span className="text-[10px] text-cyan-400 font-normal ml-1">
                          (+{rec.overtimeHours} OT)
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                          rec.status === 'present'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : rec.status === 'late'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : rec.status === 'on_leave'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}
                      >
                        {rec.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 italic">
                      {rec.notes || 'Normal punch entry'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Attendance Entry Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Manual Attendance Adjustment</h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 mb-1 block">Employee</label>
                <select
                  value={manualForm.employeeId}
                  onChange={(e) => setManualForm({ ...manualForm, employeeId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName} ({emp.departmentName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Date</label>
                  <input
                    type="date"
                    value={manualForm.date}
                    onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Status</label>
                  <select
                    value={manualForm.status}
                    onChange={(e) => setManualForm({ ...manualForm, status: e.target.value as AttendanceStatus })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="present">Present</option>
                    <option value="late">Late</option>
                    <option value="half_day">Half Day</option>
                    <option value="absent">Absent</option>
                    <option value="on_leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Check In</label>
                  <input
                    type="time"
                    value={manualForm.checkIn}
                    onChange={(e) => setManualForm({ ...manualForm, checkIn: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Check Out</label>
                  <input
                    type="time"
                    value={manualForm.checkOut}
                    onChange={(e) => setManualForm({ ...manualForm, checkOut: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Total Hours</label>
                  <input
                    type="number"
                    step="0.1"
                    value={manualForm.workHours}
                    onChange={(e) => setManualForm({ ...manualForm, workHours: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 mb-1 block">Notes / Reason</label>
                <input
                  type="text"
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold shadow-lg shadow-cyan-600/20"
                >
                  Record Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
