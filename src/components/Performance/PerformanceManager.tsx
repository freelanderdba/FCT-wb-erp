import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { PerformanceReview, ReviewStatus } from '../../types';
import {
  Award,
  Star,
  Plus,
  TrendingUp,
  CheckCircle2,
  Calendar,
  User,
  Target,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const PerformanceManager: React.FC = () => {
  const { reviews, employees, currentUser, addPerformanceReview } = useHR();
  const [selectedCycle, setSelectedCycle] = useState<string>('Q2 2026');
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);

  // Review Form
  const [reviewForm, setReviewForm] = useState({
    employeeId: employees[0]?.id || '',
    cycle: 'Q3 2026',
    rating: 4.8,
    status: 'completed' as ReviewStatus,
    goalsMetPercentage: 95,
    strengths: '',
    areasForGrowth: '',
    feedback: ''
  });

  const filteredReviews = reviews.filter((r) => !selectedCycle || r.cycle === selectedCycle);
  const avgRating =
    filteredReviews.length > 0
      ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
      : '0.0';

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === reviewForm.employeeId);
    if (!emp) return;

    addPerformanceReview({
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      employeeAvatar: emp.avatarUrl,
      departmentName: emp.departmentName,
      reviewerName: `${currentUser.firstName} ${currentUser.lastName}`,
      cycle: reviewForm.cycle,
      rating: Number(reviewForm.rating),
      status: reviewForm.status,
      goalsMetPercentage: Number(reviewForm.goalsMetPercentage),
      strengths: reviewForm.strengths,
      areasForGrowth: reviewForm.areasForGrowth,
      feedback: reviewForm.feedback
    });

    setIsAddReviewModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & New Appraisal Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Performance & OKR Reviews</h2>
          <p className="text-xs text-slate-400">
            Facilitate 360-degree feedback, quarterly OKR metrics, and employee growth milestones.
          </p>
        </div>

        <button
          onClick={() => setIsAddReviewModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Conduct Review</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400">Cycle Average Rating</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{avgRating}</span>
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-xs font-bold ml-1">/ 5.0</span>
            </div>
          </div>
          <div className="text-xs text-emerald-400 mt-2">Exceeds Organization Baseline</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400">Completed Appraisals</div>
          <div className="mt-2 text-3xl font-bold text-white">{filteredReviews.length}</div>
          <div className="text-xs text-slate-400 mt-2">Active Cycle: {selectedCycle}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400">Target Goal Achievement</div>
          <div className="mt-2 text-3xl font-bold text-cyan-400">96.3%</div>
          <div className="text-xs text-slate-400 mt-2">Average quarterly OKR completion</div>
        </div>
      </div>

      {/* Cycle Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-semibold">Review Cycle:</span>
          <select
            value={selectedCycle}
            onChange={(e) => setSelectedCycle(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
          >
            <option value="Q2 2026">Q2 2026 (Completed)</option>
            <option value="Q1 2026">Q1 2026</option>
            <option value="Q3 2026">Q3 2026 (In Progress)</option>
          </select>
        </div>

        <span className="text-xs text-slate-400">
          Showing {filteredReviews.length} finalized scorecards
        </span>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.employeeAvatar}
                    alt={rev.employeeName}
                    className="w-11 h-11 rounded-xl object-cover ring-2 ring-cyan-500/30"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{rev.employeeName}</h3>
                    <p className="text-xs text-slate-400">{rev.departmentName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{rev.rating}</span>
                </div>
              </div>

              {/* Goal Met Percentage Bar */}
              <div className="mt-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-cyan-400" /> Goal Completion
                  </span>
                  <span className="font-bold text-cyan-300 font-mono">{rev.goalsMetPercentage}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full"
                    style={{ width: `${rev.goalsMetPercentage}%` }}
                  />
                </div>
              </div>

              {/* Strengths & Growth */}
              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                    Demonstrated Strengths
                  </span>
                  <p className="text-slate-300 mt-0.5">{rev.strengths}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">
                    Growth Opportunities
                  </span>
                  <p className="text-slate-300 mt-0.5">{rev.areasForGrowth}</p>
                </div>
              </div>
            </div>

            {/* Reviewer signature */}
            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Reviewed by {rev.reviewerName}</span>
              <span className="text-slate-500 font-mono">{rev.submittedDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Conduct New Review */}
      {isAddReviewModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Record Performance Appraisal</h3>
              <button
                onClick={() => setIsAddReviewModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Employee</label>
                  <select
                    value={reviewForm.employeeId}
                    onChange={(e) => setReviewForm({ ...reviewForm, employeeId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName} ({emp.departmentName})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Cycle Period</label>
                  <input
                    type="text"
                    value={reviewForm.cycle}
                    onChange={(e) => setReviewForm({ ...reviewForm, cycle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Overall Score (1.0 to 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Goals Met (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={reviewForm.goalsMetPercentage}
                    onChange={(e) => setReviewForm({ ...reviewForm, goalsMetPercentage: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 mb-1 block">Key Strengths</label>
                <textarea
                  rows={2}
                  required
                  value={reviewForm.strengths}
                  onChange={(e) => setReviewForm({ ...reviewForm, strengths: e.target.value })}
                  placeholder="Detail primary achievements, technical execution, leadership..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 mb-1 block">Areas for Development</label>
                <textarea
                  rows={2}
                  required
                  value={reviewForm.areasForGrowth}
                  onChange={(e) => setReviewForm({ ...reviewForm, areasForGrowth: e.target.value })}
                  placeholder="Mentorship goals, domain learning, roadmap alignment..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 mb-1 block">Executive Appraisal Summary</label>
                <textarea
                  rows={2}
                  value={reviewForm.feedback}
                  onChange={(e) => setReviewForm({ ...reviewForm, feedback: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddReviewModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold shadow-lg shadow-cyan-600/20"
                >
                  Finalize Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
