import React, { useState } from 'react';
import {
  Users,
  ArrowUpRight,
  TrendingUp,
  Briefcase,
  ChevronRight,
  UserPlus,
  Eye,
  Building2,
  Filter
} from 'lucide-react';
import { useHR } from '../../context/HRContext';

interface ActiveEmployeesWidgetProps {
  onInspect: () => void;
}

export const ActiveEmployeesWidget: React.FC<ActiveEmployeesWidgetProps> = ({ onInspect }) => {
  const { employees, departments, setActiveTab } = useHR();
  const [activeView, setActiveView] = useState<'overview' | 'departments' | 'types'>('overview');

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const onLeaveEmployees = employees.filter(e => e.status === 'on_leave').length;
  const probationEmployees = employees.filter(e => e.status === 'probation').length;
  const activeRate = totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 100;

  // Employment types count
  const fullTimeCount = employees.filter(e => e.employmentType === 'Full-time').length;
  const contractorCount = employees.filter(e => e.employmentType === 'Contractor').length;
  const internCount = employees.filter(e => e.employmentType === 'Intern').length;

  return (
    <div
      id="kpi-widget-active-employees"
      className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Background ambient gradient glow */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-inner">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-300">Active Workforce</span>
              <div className="text-[10px] text-slate-500">Personnel & Status</div>
            </div>
          </div>

          {/* Interactive view toggle pills */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('overview');
              }}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                activeView === 'overview'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('departments');
              }}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                activeView === 'departments'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Depts
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('types');
              }}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                activeView === 'types'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Types
            </button>
          </div>
        </div>

        {/* Dynamic Metric View */}
        {activeView === 'overview' && (
          <div className="mt-3.5 space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tracking-tight">{activeEmployees}</span>
                <span className="text-xs font-semibold text-slate-400">/ {totalEmployees} Total</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{activeRate}% Capacity</span>
              </div>
            </div>

            {/* Active percentage bar */}
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80 flex">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(activeEmployees / (totalEmployees || 1)) * 100}%` }}
                title={`${activeEmployees} Active`}
              />
              {probationEmployees > 0 && (
                <div
                  className="bg-amber-500 h-full transition-all duration-500"
                  style={{ width: `${(probationEmployees / (totalEmployees || 1)) * 100}%` }}
                  title={`${probationEmployees} on Probation`}
                />
              )}
              {onLeaveEmployees > 0 && (
                <div
                  className="bg-purple-500 h-full transition-all duration-500"
                  style={{ width: `${(onLeaveEmployees / (totalEmployees || 1)) * 100}%` }}
                  title={`${onLeaveEmployees} on Leave`}
                />
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {activeEmployees} Active
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {probationEmployees} Probation
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                {onLeaveEmployees} On Leave
              </span>
            </div>
          </div>
        )}

        {activeView === 'departments' && (
          <div className="mt-3 space-y-1.5 max-h-[85px] overflow-y-auto pr-1">
            {departments.slice(0, 3).map(dept => {
              const deptCount = employees.filter(e => e.departmentId === dept.id).length;
              return (
                <div key={dept.id} className="flex items-center justify-between text-xs py-0.5">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: dept.color }} />
                    <span className="text-slate-300 font-medium truncate">{dept.name}</span>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-slate-200 shrink-0">
                    {deptCount} staff
                  </span>
                </div>
              );
            })}
            <div className="text-[10px] text-cyan-400/80 font-medium text-right pt-0.5">
              +{Math.max(0, departments.length - 3)} more depts
            </div>
          </div>
        )}

        {activeView === 'types' && (
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400">Full-Time</div>
              <div className="text-base font-bold text-cyan-400 mt-0.5">{fullTimeCount}</div>
            </div>
            <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400">Contract</div>
              <div className="text-base font-bold text-indigo-400 mt-0.5">{contractorCount}</div>
            </div>
            <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400">Interns</div>
              <div className="text-base font-bold text-amber-400 mt-0.5">{internCount}</div>
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
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick Inspect</span>
        </button>

        <button
          onClick={() => setActiveTab('employees')}
          className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-0.5 duration-200"
        >
          <span>Staff Directory</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
