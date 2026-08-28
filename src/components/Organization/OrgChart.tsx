import React from 'react';
import { useHR } from '../../context/HRContext';
import { Network, Users, DollarSign, Building, ShieldCheck, ChevronRight, UserCheck } from 'lucide-react';

export const OrgChart: React.FC = () => {
  const { departments, employees } = useHR();

  // Find executive leads
  const leadershipTeam = employees.filter((e) =>
    ['emp-1', 'emp-2', 'emp-3', 'emp-4', 'emp-5'].includes(e.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Organization & Department Hierarchy</h2>
        <p className="text-xs text-slate-400">
          Organizational structure, functional business divisions, team leadership, and budget appropriations.
        </p>
      </div>

      {/* Department Summaries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept) => {
          const deptEmployees = employees.filter((e) => e.departmentId === dept.id);
          const deptPayroll = deptEmployees.reduce((sum, e) => sum + e.salary * 12, 0);

          return (
            <div
              key={dept.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3.5 h-3.5 rounded-md"
                      style={{ backgroundColor: dept.color }}
                    />
                    <h3 className="text-sm font-bold text-white">{dept.name}</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-950 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
                    {dept.code}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {dept.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Department Lead:</span>
                    <span className="font-semibold text-white">{dept.leadName}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Active Headcount:</span>
                    <span className="font-bold text-cyan-400">{deptEmployees.length} members</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Annual Budget:</span>
                    <span className="font-mono text-white">${dept.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Annual Salary Burn:</span>
                    <span className="font-mono text-emerald-400">${deptPayroll.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Members Avatars */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex -space-x-2 overflow-hidden">
                  {deptEmployees.slice(0, 4).map((emp) => (
                    <img
                      key={emp.id}
                      src={emp.avatarUrl}
                      alt={emp.firstName}
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover"
                      title={`${emp.firstName} ${emp.lastName} (${emp.role})`}
                    />
                  ))}
                  {deptEmployees.length > 4 && (
                    <div className="flex items-center justify-center h-7 w-7 rounded-full ring-2 ring-slate-900 bg-slate-800 text-[10px] text-slate-300 font-bold">
                      +{deptEmployees.length - 4}
                    </div>
                  )}
                </div>

                <span className="text-[11px] text-slate-500 font-medium">
                  {deptEmployees.length} Assigned
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Organizational Hierarchy Tree */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span>Executive Leadership & Reporting Lines</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Top-level organizational matrix structure and direct report relationships.
          </p>
        </div>

        {/* Tree Root: Executive Leadership */}
        <div className="flex flex-col items-center">
          {/* Level 1: CEO / Executive Chair (Represented by CPO / VP Eng) */}
          <div className="bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border-2 border-cyan-500/50 rounded-2xl p-4 text-center max-w-xs w-full shadow-2xl">
            <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-bold text-lg mb-2">
              FCT
            </div>
            <div className="text-sm font-bold text-white">Executive Operating Committee</div>
            <div className="text-xs text-cyan-300">Office of the CEO & Board of Directors</div>
          </div>

          {/* Connector Line */}
          <div className="w-0.5 h-8 bg-slate-700 my-1" />

          {/* Level 2: Department Heads & VPs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
            {leadershipTeam.map((leader) => (
              <div
                key={leader.id}
                className="bg-slate-950 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-3.5 text-center shadow-md space-y-2"
              >
                <img
                  src={leader.avatarUrl}
                  alt={leader.firstName}
                  className="w-12 h-12 rounded-xl object-cover mx-auto ring-2 ring-slate-800"
                />
                <div>
                  <div className="text-xs font-bold text-white">
                    {leader.firstName} {leader.lastName}
                  </div>
                  <div className="text-[11px] text-cyan-400 font-medium truncate">{leader.role}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{leader.departmentName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
