import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { History, Filter, Download, ShieldCheck, Search } from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const { activities, exportDataJSON } = useHR();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredLogs = activities.filter((act) => {
    const matchesType = selectedType === 'all' || act.type === selectedType;
    const matchesSearch =
      !search ||
      act.actor.toLowerCase().includes(search.toLowerCase()) ||
      act.action.toLowerCase().includes(search.toLowerCase()) ||
      act.target.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">System Audit & Compliance Log</h2>
          <p className="text-xs text-slate-400">
            Immutable trace of personnel changes, leave authorizations, payroll executions, and security events.
          </p>
        </div>

        <button
          onClick={exportDataJSON}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export Audit Trail (JSON)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-slate-300">Category:</span>
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Events ({activities.length})</option>
            <option value="employee">Employee Lifecycle</option>
            <option value="attendance">Attendance & Punches</option>
            <option value="leave">Leave Approvals</option>
            <option value="payroll">Payroll Runs</option>
            <option value="recruitment">Recruitment & ATS</option>
            <option value="review">Performance Appraisals</option>
          </select>
        </div>

        <div className="w-64">
          <input
            type="text"
            placeholder="Search audit trail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Timestamp</th>
                <th className="px-4 py-3.5">Initiator / Actor</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Action Performed</th>
                <th className="px-5 py-3.5">Target Entity / Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                    No matching audit entries found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-slate-400 text-[11px]">
                      {log.timestamp}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-white">
                      {log.actor}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {log.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-medium text-cyan-300">
                      {log.action}
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 font-mono text-[11px]">
                      {log.target}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
