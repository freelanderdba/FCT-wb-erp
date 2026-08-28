import React from 'react';
import { HRProvider, useHR } from './context/HRContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { EmployeeList } from './components/Employees/EmployeeList';
import { AttendanceManager } from './components/Attendance/AttendanceManager';
import { LeaveManager } from './components/Leaves/LeaveManager';
import { PayrollManager } from './components/Payroll/PayrollManager';
import { RecruitmentManager } from './components/Recruitment/RecruitmentManager';
import { PerformanceManager } from './components/Performance/PerformanceManager';
import { OrgChart } from './components/Organization/OrgChart';
import { AuditLogs } from './components/Audit/AuditLogs';

const AppContent: React.FC = () => {
  const { activeTab } = useHR();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeeList />;
      case 'attendance':
        return <AttendanceManager />;
      case 'leaves':
        return <LeaveManager />;
      case 'payroll':
        return <PayrollManager />;
      case 'recruitment':
        return <RecruitmentManager />;
      case 'performance':
        return <PerformanceManager />;
      case 'organization':
        return <OrgChart />;
      case 'audit':
        return <AuditLogs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-h-[calc(100vh-61px)]">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <HRProvider>
      <AppContent />
    </HRProvider>
  );
}

export default App;
