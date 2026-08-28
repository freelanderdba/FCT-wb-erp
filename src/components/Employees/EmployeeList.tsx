import React, { useState, useMemo } from 'react';
import { useHR } from '../../context/HRContext';
import { Employee, EmployeeStatus, EmploymentType } from '../../types';
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MapPin,
  Building,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Briefcase,
  Layers,
  LayoutGrid,
  List,
  Shield,
  CreditCard
} from 'lucide-react';

export const EmployeeList: React.FC = () => {
  const {
    employees,
    departments,
    searchQuery,
    setSearchQuery,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useHR();

  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals state
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Employee Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    departmentId: departments[0]?.id || 'dept-1',
    role: '',
    status: 'active' as EmployeeStatus,
    employmentType: 'Full-time' as EmploymentType,
    joinDate: new Date().toISOString().split('T')[0],
    salary: 8000,
    location: 'San Francisco, HQ',
    skills: 'TypeScript, React, Project Management',
    emergencyName: 'Jane Doe',
    emergencyRelationship: 'Spouse',
    emergencyPhone: '+1 (555) 000-0000',
    bankName: 'JPMorgan Chase',
    bankAccountNumber: '**** **** 1234',
    bankRoutingNumber: '121000358'
  });

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        emp.firstName.toLowerCase().includes(q) ||
        emp.lastName.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        emp.role.toLowerCase().includes(q) ||
        emp.code.toLowerCase().includes(q) ||
        emp.skills.some((s) => s.toLowerCase().includes(q));

      const matchesDept =
        selectedDepartment === 'all' || emp.departmentId === selectedDepartment;
      const matchesStatus =
        selectedStatus === 'all' || emp.status === selectedStatus;
      const matchesType =
        selectedType === 'all' || emp.employmentType === selectedType;

      return matchesSearch && matchesDept && matchesStatus && matchesType;
    });
  }, [employees, searchQuery, selectedDepartment, selectedStatus, selectedType]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dept = departments.find((d) => d.id === formData.departmentId);
    addEmployee({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      avatarUrl: formData.avatarUrl,
      departmentId: formData.departmentId,
      departmentName: dept?.name || 'General Operations',
      role: formData.role,
      status: formData.status,
      employmentType: formData.employmentType,
      joinDate: formData.joinDate,
      salary: Number(formData.salary),
      location: formData.location,
      skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      emergencyContact: {
        name: formData.emergencyName,
        relationship: formData.emergencyRelationship,
        phone: formData.emergencyPhone
      },
      bankAccount: {
        bankName: formData.bankName,
        accountNumber: formData.bankAccountNumber,
        routingNumber: formData.bankRoutingNumber
      }
    });

    setIsAddModalOpen(false);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      departmentId: departments[0]?.id || 'dept-1',
      role: '',
      status: 'active',
      employmentType: 'Full-time',
      joinDate: new Date().toISOString().split('T')[0],
      salary: 8000,
      location: 'San Francisco, HQ',
      skills: 'TypeScript, React, Project Management',
      emergencyName: 'Jane Doe',
      emergencyRelationship: 'Spouse',
      emergencyPhone: '+1 (555) 000-0000',
      bankName: 'JPMorgan Chase',
      bankAccountNumber: '**** **** 1234',
      bankRoutingNumber: '121000358'
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmployee) return;
    updateEmployee(editingEmployee.id, editingEmployee);
    setEditingEmployee(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Personnel Directory</h2>
          <p className="text-xs text-slate-400">
            Manage organization members, assignments, profiles, and compensation metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Add Employee Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard Employee</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-300">Filters:</span>
        </div>

        {/* Department Filter */}
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
        >
          <option value="all">All Departments ({employees.length})</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="on_leave">On Leave</option>
          <option value="probation">Probation</option>
          <option value="terminated">Terminated</option>
        </select>

        {/* Employment Type */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
        >
          <option value="all">All Employment Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contractor">Contractor</option>
          <option value="Intern">Intern</option>
        </select>

        <div className="ml-auto text-xs text-slate-400">
          Showing <span className="font-bold text-white">{filteredEmployees.length}</span> of {employees.length} employees
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => {
            const statusColors: Record<EmployeeStatus, string> = {
              active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
              on_leave: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
              probation: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
              terminated: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            };

            return (
              <div
                key={emp.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatarUrl}
                        alt={emp.firstName}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-800 group-hover:ring-cyan-500/50 transition-all"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {emp.firstName} {emp.lastName}
                          </h3>
                        </div>
                        <p className="text-xs text-cyan-400 font-medium">{emp.role}</p>
                        <span className="text-[10px] text-slate-500 font-mono">{emp.code}</span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                        statusColors[emp.status]
                      }`}
                    >
                      {emp.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Info details */}
                  <div className="mt-4 space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-300">{emp.departmentName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-300 truncate">{emp.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-300">{emp.location}</span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {emp.skills.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-950 px-2 py-0.5 rounded-md text-slate-400 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {emp.skills.length > 3 && (
                      <span className="text-[10px] bg-slate-950 px-1.5 py-0.5 rounded-md text-slate-500">
                        +{emp.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-400">
                    ${emp.salary.toLocaleString()}<span className="text-[10px] text-slate-500">/mo</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setViewingEmployee(emp)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                      title="View Full Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingEmployee(emp)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                      title="Edit Employee"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove ${emp.firstName} ${emp.lastName} from the organization?`)) {
                          deleteEmployee(emp.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Terminate / Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Employee</th>
                  <th className="px-4 py-3.5">Code</th>
                  <th className="px-4 py-3.5">Department</th>
                  <th className="px-4 py-3.5">Type & Location</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Monthly Comp</th>
                  <th className="px-4 py-3.5">Join Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatarUrl}
                          alt={emp.firstName}
                          className="w-9 h-9 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-bold text-white text-xs">
                            {emp.firstName} {emp.lastName}
                          </div>
                          <div className="text-[11px] text-cyan-400">{emp.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-400">{emp.code}</td>
                    <td className="px-4 py-3.5">{emp.departmentName}</td>
                    <td className="px-4 py-3.5">
                      <div>{emp.employmentType}</div>
                      <div className="text-[10px] text-slate-500">{emp.location}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                          emp.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : emp.status === 'on_leave'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}
                      >
                        {emp.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-white">
                      ${emp.salary.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 text-slate-400">{emp.joinDate}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingEmployee(emp)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingEmployee(emp)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${emp.firstName} ${emp.lastName}?`)) {
                              deleteEmployee(emp.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: View Full Employee Profile */}
      {viewingEmployee && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={viewingEmployee.avatarUrl}
                  alt={viewingEmployee.firstName}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-500/40"
                />
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-bold text-white">
                      {viewingEmployee.firstName} {viewingEmployee.lastName}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                      {viewingEmployee.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {viewingEmployee.role} • {viewingEmployee.departmentName}
                  </p>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-3">
                    <span>Joined: {viewingEmployee.joinDate}</span>
                    <span>•</span>
                    <span>{viewingEmployee.employmentType}</span>
                    <span>•</span>
                    <span>{viewingEmployee.location}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewingEmployee(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Leave Balance Stats */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Leave Balance Allocation
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Annual Leave Remaining</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {viewingEmployee.leaveBalances.annual - viewingEmployee.leaveBalances.usedAnnual} / {viewingEmployee.leaveBalances.annual} days
                  </div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Sick Leave Remaining</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {viewingEmployee.leaveBalances.sick - viewingEmployee.leaveBalances.usedSick} / {viewingEmployee.leaveBalances.sick} days
                  </div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Parental Allotment</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {viewingEmployee.leaveBalances.parental} days
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Banking Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Contact Details
                </h4>
                <div className="text-xs text-slate-300">
                  <div className="text-slate-500 text-[10px]">Email</div>
                  <div>{viewingEmployee.email}</div>
                </div>
                <div className="text-xs text-slate-300">
                  <div className="text-slate-500 text-[10px]">Phone</div>
                  <div>{viewingEmployee.phone}</div>
                </div>
                <div className="text-xs text-slate-300">
                  <div className="text-slate-500 text-[10px]">Emergency Contact</div>
                  <div>
                    {viewingEmployee.emergencyContact.name} ({viewingEmployee.emergencyContact.relationship}) - {viewingEmployee.emergencyContact.phone}
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" /> Compensation & Bank Direct Deposit
                </h4>
                <div className="text-xs text-slate-300">
                  <div className="text-slate-500 text-[10px]">Base Compensation</div>
                  <div className="font-semibold text-white">${viewingEmployee.salary.toLocaleString()} / month</div>
                </div>
                <div className="text-xs text-slate-300">
                  <div className="text-slate-500 text-[10px]">Bank Institution</div>
                  <div>{viewingEmployee.bankAccount.bankName}</div>
                </div>
                <div className="text-xs text-slate-300">
                  <div className="text-slate-500 text-[10px]">Account & Routing</div>
                  <div>{viewingEmployee.bankAccount.accountNumber} (Routing: {viewingEmployee.bankAccount.routingNumber})</div>
                </div>
              </div>
            </div>

            {/* Skills & Competencies */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Core Competencies & Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {viewingEmployee.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-950 px-3 py-1 rounded-lg text-slate-200 border border-slate-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setViewingEmployee(null)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setEditingEmployee(viewingEmployee);
                  setViewingEmployee(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Onboard New Employee */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Onboard New Employee</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="jane.doe@fct-erp.internal"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="+1 (555) 019-2834"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Department</label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Job Title / Role</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="Senior Software Engineer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Employment Type</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as EmploymentType })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contractor">Contractor</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Monthly Salary ($)</label>
                  <input
                    type="number"
                    required
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 mb-1 block">Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="React, TypeScript, Node.js, GraphQL"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold shadow-lg shadow-cyan-600/20"
                >
                  Complete Onboarding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Employee */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                Edit {editingEmployee.firstName} {editingEmployee.lastName}
              </h3>
              <button
                onClick={() => setEditingEmployee(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Role / Title</label>
                  <input
                    type="text"
                    value={editingEmployee.role}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Status</label>
                  <select
                    value={editingEmployee.status}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value as EmployeeStatus })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="active">Active</option>
                    <option value="on_leave">On Leave</option>
                    <option value="probation">Probation</option>
                    <option value="terminated">Terminated</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Monthly Salary ($)</label>
                  <input
                    type="number"
                    value={editingEmployee.salary}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, salary: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Location</label>
                  <input
                    type="text"
                    value={editingEmployee.location}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingEmployee(null)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
