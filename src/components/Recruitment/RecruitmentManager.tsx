import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { JobPosting, Candidate, CandidateStage, EmploymentType, JobStatus } from '../../types';
import {
  Briefcase,
  Users,
  Plus,
  Star,
  MapPin,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  XCircle,
  FileText,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const RecruitmentManager: React.FC = () => {
  const {
    jobs,
    candidates,
    departments,
    addJobPosting,
    updateJobPosting,
    addCandidate,
    updateCandidateStage,
    updateCandidateNotes
  } = useHR();

  const [activeView, setActiveView] = useState<'pipeline' | 'jobs'>('pipeline');
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');
  const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false);

  // New Job Form State
  const [jobForm, setJobForm] = useState({
    title: '',
    department: departments[0]?.name || 'Engineering & Technology',
    location: 'Remote - North America',
    type: 'Full-time' as EmploymentType,
    experienceLevel: 'Mid-Senior (4+ yrs)',
    salaryMin: 120000,
    salaryMax: 150000,
    openings: 1,
    status: 'open' as JobStatus,
    description: '',
    requirements: 'Strong analytical skills, 4+ years relevant domain experience, team leadership capability.'
  });

  // New Candidate Form State
  const [candidateForm, setCandidateForm] = useState({
    jobId: jobs[0]?.id || '',
    name: '',
    email: '',
    phone: '',
    experienceYears: 4,
    rating: 5,
    currentCompany: '',
    portfolioOrLinkedin: '',
    resumeSummary: '',
    notes: 'Initial profile screening looks positive.'
  });

  const pipelineStages: { id: CandidateStage; label: string; color: string }[] = [
    { id: 'applied', label: 'Applied', color: 'border-slate-700 bg-slate-900/60' },
    { id: 'screening', label: 'Screening', color: 'border-blue-500/30 bg-blue-950/20' },
    { id: 'interview', label: 'Interview', color: 'border-purple-500/30 bg-purple-950/20' },
    { id: 'offered', label: 'Offer Sent', color: 'border-amber-500/30 bg-amber-950/20' },
    { id: 'hired', label: 'Hired', color: 'border-emerald-500/30 bg-emerald-950/20' }
  ];

  const filteredCandidates = candidates.filter((c) => {
    return selectedJobFilter === 'all' || c.jobId === selectedJobFilter;
  });

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    addJobPosting({
      title: jobForm.title,
      department: jobForm.department,
      location: jobForm.location,
      type: jobForm.type,
      experienceLevel: jobForm.experienceLevel,
      salaryMin: Number(jobForm.salaryMin),
      salaryMax: Number(jobForm.salaryMax),
      openings: Number(jobForm.openings),
      status: jobForm.status,
      description: jobForm.description,
      requirements: jobForm.requirements.split(',').map((r) => r.trim()).filter(Boolean)
    });
    setIsAddJobModalOpen(false);
  };

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    const targetJob = jobs.find((j) => j.id === candidateForm.jobId);
    addCandidate({
      jobId: candidateForm.jobId,
      jobTitle: targetJob?.title || 'Open Position',
      name: candidateForm.name,
      email: candidateForm.email,
      phone: candidateForm.phone,
      rating: Number(candidateForm.rating),
      experienceYears: Number(candidateForm.experienceYears),
      currentCompany: candidateForm.currentCompany,
      portfolioOrLinkedin: candidateForm.portfolioOrLinkedin,
      resumeSummary: candidateForm.resumeSummary,
      notes: candidateForm.notes
    });
    setIsAddCandidateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & ATS Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Recruitment & ATS Pipeline</h2>
          <p className="text-xs text-slate-400">
            Source top talent, manage requisitions, track candidate stages, and evaluate interview scorecards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddCandidateModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add Candidate</span>
          </button>
          <button
            onClick={() => setIsAddJobModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Post Job Vacancy</span>
          </button>
        </div>
      </div>

      {/* Navigation Switch & Job Filter */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('pipeline')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeView === 'pipeline'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Candidate Kanban Pipeline
          </button>
          <button
            onClick={() => setActiveView('jobs')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeView === 'jobs'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Job Postings ({jobs.length})
          </button>
        </div>

        {activeView === 'pipeline' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Filter by Opening:</span>
            <select
              value={selectedJobFilter}
              onChange={(e) => setSelectedJobFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Open Positions ({candidates.length} candidates)</option>
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} ({j.department})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* ATS Kanban Pipeline View */}
      {activeView === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pipelineStages.map((stage) => {
            const stageCandidates = filteredCandidates.filter((c) => c.stage === stage.id);
            return (
              <div
                key={stage.id}
                className={`border rounded-2xl p-4 min-h-[500px] flex flex-col justify-between ${stage.color}`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {stage.label}
                    </span>
                    <span className="text-xs font-mono font-bold bg-slate-950 px-2 py-0.5 rounded-full text-slate-300 border border-slate-800">
                      {stageCandidates.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {stageCandidates.map((cand) => (
                      <div
                        key={cand.id}
                        onClick={() => setViewingCandidate(cand)}
                        className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-3.5 cursor-pointer transition-all shadow-sm hover:shadow-md space-y-2 group"
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {cand.name}
                          </h4>
                          <div className="flex items-center text-amber-400 text-[10px]">
                            <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                            <span>{cand.rating}.0</span>
                          </div>
                        </div>

                        <div className="text-[11px] text-cyan-400 font-medium truncate">
                          {cand.jobTitle}
                        </div>

                        <div className="text-[10px] text-slate-400">
                          {cand.experienceYears} yrs exp • {cand.currentCompany || 'Independent'}
                        </div>

                        <p className="text-[11px] text-slate-300 line-clamp-2 italic bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/80">
                          "{cand.resumeSummary}"
                        </p>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                          <span>Applied {cand.appliedDate}</span>
                          <span className="text-cyan-400 group-hover:underline flex items-center gap-0.5">
                            Details <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-500 text-center">
                  Stage: {stage.label}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Job Postings Grid View */}
      {activeView === 'jobs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => {
            const applicantCount = candidates.filter((c) => c.jobId === job.id).length;
            return (
              <div
                key={job.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">{job.title}</h3>
                      <p className="text-xs text-cyan-400 font-medium mt-0.5">{job.department}</p>
                    </div>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                        job.status === 'open'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                      <span>
                        {job.type} • {job.experienceLevel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-slate-300">
                      <span>Salary: ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {job.requirements.slice(0, 2).map((req, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded-md border border-slate-800"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-400">
                    {applicantCount} Active Applicants
                  </span>
                  <button
                    onClick={() => {
                      setSelectedJobFilter(job.id);
                      setActiveView('pipeline');
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    View Pipeline <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Candidate Evaluation & Stage Transition */}
      {viewingCandidate && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{viewingCandidate.name}</h3>
                <p className="text-xs text-cyan-400 font-medium">Candidate for: {viewingCandidate.jobTitle}</p>
              </div>
              <button
                onClick={() => setViewingCandidate(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Quick Details */}
            <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 text-[10px]">CONTACT INFO</span>
                <div className="text-slate-200 mt-0.5">{viewingCandidate.email}</div>
                <div className="text-slate-400">{viewingCandidate.phone}</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">EXPERIENCE & PORTFOLIO</span>
                <div className="text-slate-200 mt-0.5">{viewingCandidate.experienceYears} Years ({viewingCandidate.currentCompany})</div>
                <div className="text-cyan-400 truncate">{viewingCandidate.portfolioOrLinkedin || 'No external URL'}</div>
              </div>
            </div>

            {/* Stage Selector Action Bar */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                Current Pipeline Stage
              </label>
              <div className="flex flex-wrap gap-1.5">
                {pipelineStages.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      updateCandidateStage(viewingCandidate.id, st.id);
                      setViewingCandidate({ ...viewingCandidate, stage: st.id });
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      viewingCandidate.stage === st.id
                        ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Resume Summary */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-300">Executive Resume Summary:</span>
              <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                {viewingCandidate.resumeSummary}
              </p>
            </div>

            {/* Interviewer Notes */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-300">Interviewer Notes & Scorecard:</span>
              <textarea
                rows={3}
                value={viewingCandidate.notes}
                onChange={(e) => {
                  const newNotes = e.target.value;
                  setViewingCandidate({ ...viewingCandidate, notes: newNotes });
                  updateCandidateNotes(viewingCandidate.id, newNotes, viewingCandidate.rating);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setViewingCandidate(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl"
              >
                Close Scorecard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Post New Job Vacancy */}
      {isAddJobModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Post New Job Vacancy</h3>
              <button
                onClick={() => setIsAddJobModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddJob} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Job Title</label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    placeholder="Staff Security Engineer"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Department</label>
                  <select
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Location</label>
                  <input
                    type="text"
                    required
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Employment Type</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value as EmploymentType })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contractor">Contractor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Salary Min ($)</label>
                  <input
                    type="number"
                    value={jobForm.salaryMin}
                    onChange={(e) => setJobForm({ ...jobForm, salaryMin: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Salary Max ($)</label>
                  <input
                    type="number"
                    value={jobForm.salaryMax}
                    onChange={(e) => setJobForm({ ...jobForm, salaryMax: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 mb-1 block">Role Description</label>
                <textarea
                  rows={3}
                  required
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Outline key responsibilities and expectations..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 mb-1 block">Requirements (Comma-separated)</label>
                <input
                  type="text"
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddJobModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold shadow-lg shadow-cyan-600/20"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Candidate */}
      {isAddCandidateModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add Candidate to Pipeline</h3>
              <button
                onClick={() => setIsAddCandidateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCandidate} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 mb-1 block">Target Position</label>
                <select
                  value={candidateForm.jobId}
                  onChange={(e) => setCandidateForm({ ...candidateForm, jobId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Candidate Full Name</label>
                  <input
                    type="text"
                    required
                    value={candidateForm.name}
                    onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Email</label>
                  <input
                    type="email"
                    required
                    value={candidateForm.email}
                    onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Phone</label>
                  <input
                    type="tel"
                    required
                    value={candidateForm.phone}
                    onChange={(e) => setCandidateForm({ ...candidateForm, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Experience (Years)</label>
                  <input
                    type="number"
                    value={candidateForm.experienceYears}
                    onChange={(e) => setCandidateForm({ ...candidateForm, experienceYears: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 mb-1 block">Resume Summary</label>
                <textarea
                  rows={3}
                  required
                  value={candidateForm.resumeSummary}
                  onChange={(e) => setCandidateForm({ ...candidateForm, resumeSummary: e.target.value })}
                  placeholder="Paste executive summary or key qualifications..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddCandidateModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold shadow-lg shadow-cyan-600/20"
                >
                  Add Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
