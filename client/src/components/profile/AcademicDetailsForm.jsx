import React from 'react';
import { GraduationCap, BookOpen, Calendar, Hash, AlertCircle } from 'lucide-react';

export default function AcademicDetailsForm({ data, onChange, errors = {} }) {
  const currentYear = data.current_year ? String(data.current_year) : (data.year ? String(data.year) : '');
  const currentSemester = data.current_semester ? String(data.current_semester) : (data.semester ? String(data.semester) : '');
  const gradYear = data.graduation_year || data.gradYear || '';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Degree */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
          <span>Degree <span className="text-rose-500">*</span></span>
        </label>
        <input
          id="degree_input"
          type="text"
          autoComplete="off"
          value={data.degree || ''}
          onChange={(e) => onChange('degree', e.target.value)}
          placeholder="e.g. B.Tech / B.E. / B.Sc"
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none ${
            errors.degree
              ? 'border-rose-400 bg-rose-50/50 text-rose-900 placeholder:text-rose-300 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
              : 'border-slate-200/90 bg-slate-50/60 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
          }`}
        />
        {errors.degree && (
          <p className="mt-1.5 text-xs font-bold text-rose-600 flex items-center gap-1 animate-in fade-in duration-150">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.degree}</span>
          </p>
        )}
      </div>

      {/* Branch */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>Branch / Specialization <span className="text-rose-500">*</span></span>
        </label>
        <input
          id="branch_input"
          type="text"
          autoComplete="off"
          value={data.branch || ''}
          onChange={(e) => onChange('branch', e.target.value)}
          placeholder="e.g. Computer Science / CSIT"
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none ${
            errors.branch
              ? 'border-rose-400 bg-rose-50/50 text-rose-900 placeholder:text-rose-300 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
              : 'border-slate-200/90 bg-slate-50/60 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
          }`}
        />
        {errors.branch && (
          <p className="mt-1.5 text-xs font-bold text-rose-600 flex items-center gap-1 animate-in fade-in duration-150">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.branch}</span>
          </p>
        )}
      </div>

      {/* Current Year */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-indigo-600" />
          <span>Current Academic Year</span>
        </label>
        <select
          id="current_year_input"
          value={currentYear}
          onChange={(e) => {
            const val = e.target.value ? Number(e.target.value) : '';
            onChange('current_year', val);
            onChange('year', e.target.value);
          }}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none cursor-pointer ${
            errors.current_year
              ? 'border-rose-400 bg-rose-50/50 text-rose-900 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
              : 'border-slate-200/90 bg-slate-50/60 text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
          }`}
        >
          <option value="">Select Academic Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
        {errors.current_year && (
          <p className="mt-1.5 text-xs font-bold text-rose-600 flex items-center gap-1 animate-in fade-in duration-150">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.current_year}</span>
          </p>
        )}
      </div>

      {/* Current Semester */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-indigo-600" />
          <span>Current Semester</span>
        </label>
        <select
          id="current_semester_input"
          value={currentSemester}
          onChange={(e) => {
            const val = e.target.value ? Number(e.target.value) : '';
            onChange('current_semester', val);
            onChange('semester', e.target.value);
          }}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none cursor-pointer ${
            errors.current_semester
              ? 'border-rose-400 bg-rose-50/50 text-rose-900 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
              : 'border-slate-200/90 bg-slate-50/60 text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
          }`}
        >
          <option value="">Select Semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
            <option key={sem} value={String(sem)}>Semester {sem}</option>
          ))}
        </select>
        {errors.current_semester && (
          <p className="mt-1.5 text-xs font-bold text-rose-600 flex items-center gap-1 animate-in fade-in duration-150">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.current_semester}</span>
          </p>
        )}
      </div>

      {/* Graduation Year */}
      <div className="md:col-span-2">
        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          <span>Graduation Year</span>
        </label>
        <input
          id="graduation_year_input"
          type="number"
          min="2000"
          max="2100"
          autoComplete="off"
          value={gradYear}
          onChange={(e) => {
            const val = e.target.value ? Number(e.target.value) : '';
            onChange('graduation_year', val);
            onChange('gradYear', val);
          }}
          placeholder="e.g. 2026"
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none ${
            errors.graduation_year
              ? 'border-rose-400 bg-rose-50/50 text-rose-900 placeholder:text-rose-300 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
              : 'border-slate-200/90 bg-slate-50/60 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
          }`}
        />
        {errors.graduation_year && (
          <p className="mt-1.5 text-xs font-bold text-rose-600 flex items-center gap-1 animate-in fade-in duration-150">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.graduation_year}</span>
          </p>
        )}
      </div>
    </div>
  );
}
