import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  Clock,
  Eye,
  Percent,
  Sparkles
} from 'lucide-react';
import { useHR } from '../../context/HRContext';

interface CurrentMonthPayrollWidgetProps {
  onInspect: () => void;
}

export const CurrentMonthPayrollWidget: React.FC<CurrentMonthPayrollWidgetProps> = ({ onInspect }) => {
  const { payrolls, processAllPayrolls, setActiveTab } = useHR();
  const [metricMode, setMetricMode] = useState<'net' | 'gross' | 'disbursement'>('net');

  const currentMonth = 'August 2026';
  const currentMonthPayrolls = payrolls.filter(p => p.month === currentMonth);
  
  const totalGross = currentMonthPayrolls.reduce((sum, p) => sum + p.grossPay, 0);
  const totalNet = currentMonthPayrolls.reduce((sum, p) => sum + p.netPay, 0);
  const totalDeductions = currentMonthPayrolls.reduce((sum, p) => sum + p.totalDeductions, 0);

  const paidCount = currentMonthPayrolls.filter(p => p.status === 'paid').length;
  const pendingCount = currentMonthPayrolls.filter(p => p.status === 'pending').length;
  const totalRecords = currentMonthPayrolls.length || 1;
  const disbursedPercentage = Math.round((paidCount / totalRecords) * 100);

  const disbursedNet = currentMonthPayrolls
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.netPay, 0);

  return (
    <div
      id="kpi-widget-current-month-payroll"
      className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-950/20 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Ambient emerald glow */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-inner">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-300">Current Month Payroll</span>
              <div className="text-[10px] text-slate-500">{currentMonth} Cycle</div>
            </div>
          </div>

          {/* Interactive Metric Mode Selector */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMetricMode('net');
              }}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                metricMode === 'net'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Net
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMetricMode('gross');
              }}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                metricMode === 'gross'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Gross
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMetricMode('disbursement');
              }}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                metricMode === 'disbursement'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Status
            </button>
          </div>
        </div>

        {/* Dynamic Metric Display */}
        {metricMode === 'net' && (
          <div className="mt-3.5 space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  ${(totalNet / 1000).toFixed(1)}k
                </span>
                <span className="text-xs font-medium text-slate-400">Total Net</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <span>{disbursedPercentage}% Disbursed</span>
              </div>
            </div>

            {/* Visual progress meter */}
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${disbursedPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span className="text-emerald-400 font-medium">${(disbursedNet / 1000).toFixed(1)}k paid</span>
              <span>${((totalNet - disbursedNet) / 1000).toFixed(1)}k pending</span>
            </div>
          </div>
        )}

        {metricMode === 'gross' && (
          <div className="mt-3.5 space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  ${(totalGross / 1000).toFixed(1)}k
                </span>
                <span className="text-xs font-medium text-slate-400">Gross Budget</span>
              </div>
              <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                {currentMonthPayrolls.length} Salaries
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-0.5">
              <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Net Take-Home</div>
                <div className="text-xs font-bold text-emerald-400 mt-0.5">${(totalNet / 1000).toFixed(1)}k</div>
              </div>
              <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Taxes & Deductions</div>
                <div className="text-xs font-bold text-indigo-400 mt-0.5">${(totalDeductions / 1000).toFixed(1)}k</div>
              </div>
            </div>
          </div>
        )}

        {metricMode === 'disbursement' && (
          <div className="mt-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Batch Transfer Health</span>
              <span className="font-bold text-white">{paidCount} of {currentMonthPayrolls.length} Cleared</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-950/80 p-2 rounded-xl border border-emerald-500/20">
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Paid Batches
                </div>
                <div className="text-lg font-bold text-white mt-0.5">{paidCount}</div>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-xl border border-amber-500/20">
                <div className="text-[10px] text-amber-400 font-semibold flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" /> Ready to Disburse
                </div>
                <div className="text-lg font-bold text-white mt-0.5">{pendingCount}</div>
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
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Breakdown</span>
        </button>

        {pendingCount > 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              processAllPayrolls(currentMonth);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[11px] font-semibold transition-all border border-emerald-500/30"
          >
            <Sparkles className="w-3 h-3" />
            <span>Disburse All</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('payroll')}
            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group-hover:translate-x-0.5 duration-200"
          >
            <span>Payroll Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
