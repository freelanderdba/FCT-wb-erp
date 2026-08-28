import React from 'react';
import { useHR } from '../context/HRContext';
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  CreditCard,
  Briefcase,
  Award,
  Network,
  History,
  Building,
  ShieldCheck
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    employees,
    leaves,
    payrolls,
    candidates
  } = useHR();

  const pendingLeaves = leaves.filter(l => l.status === 'pending').length;
  const pendingPayrolls = payrolls.filter(p => p.status === 'pending').length;
  const activeCandidates = candidates.filter(c => c.stage !== 'hired' && c.stage !== 'rejected').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'employees',
      label: 'Employee Directory',
      icon: Users,
      badge: employees.length
    },
    {
      id: 'attendance',
      label: 'Time & Attendance',
      icon: Clock,
      badge: null
    },
    {
      id: 'leaves',
      label: 'Leave & Time-Off',
      icon: CalendarDays,
      badge: pendingLeaves > 0 ? pendingLeaves : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'payroll',
      label: 'Payroll & Compensation',
      icon: CreditCard,
      badge: pendingPayrolls > 0 ? `${pendingPayrolls} pending` : null,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'recruitment',
      label: 'Recruitment & ATS',
      icon: Briefcase,
      badge: activeCandidates > 0 ? activeCandidates : null,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    },
    {
      id: 'performance',
      label: 'Performance & OKRs',
      icon: Award,
      badge: null
    },
    {
      id: 'organization',
      label: 'Org Chart & Depts',
      icon: Network,
      badge: null
    },
    {
      id: 'audit',
      label: 'Audit & Activity Log',
      icon: History,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-61px)]">
      <div className="p-4 flex-1 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Main Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== null && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    item.badgeColor || 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer System Info */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-2.5 text-xs text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>FCT ERP System v2.4</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          <span>SOC-2 Type II Certified</span>
        </div>
      </div>
    </aside>
  );
};
