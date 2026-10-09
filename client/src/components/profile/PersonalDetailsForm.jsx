import React from 'react';
import { User, Camera, AlertCircle } from 'lucide-react';

export default function PersonalDetailsForm({ data, onChange, errors = {} }) {
  const fullNameValue = data.full_name !== undefined ? data.full_name : (data.fullName || '');
  const photoUrlValue = data.profile_photo_url !== undefined ? data.profile_photo_url : (data.photoUrl || '');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Full Name Field */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-indigo-600" />
          <span>Full Name <span className="text-rose-500">*</span></span>
        </label>
        <div className="relative">
          <input
            id="full_name_input"
            type="text"
            required
            autoComplete="off"
            value={fullNameValue}
            onChange={(e) => {
              onChange('full_name', e.target.value);
              onChange('fullName', e.target.value);
            }}
            placeholder="e.g. Rahul Sharma"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none ${
              errors.full_name
                ? 'border-rose-400 bg-rose-50/50 text-rose-900 placeholder:text-rose-300 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-200/90 bg-slate-50/60 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
            }`}
          />
        </div>
        {errors.full_name && (
          <p className="mt-1.5 text-xs font-bold text-rose-600 flex items-center gap-1 animate-in fade-in duration-150">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.full_name}</span>
          </p>
        )}
      </div>

      {/* Profile Photo URL Field (Optional) */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-indigo-600" />
          <span>Profile Photo URL <span className="text-slate-400 font-normal">(Optional)</span></span>
        </label>
        <div className="relative">
          <input
            type="url"
            autoComplete="off"
            value={photoUrlValue}
            onChange={(e) => {
              onChange('profile_photo_url', e.target.value);
              onChange('photoUrl', e.target.value);
            }}
            placeholder="https://example.com/photo.jpg"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-slate-50/60 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
          />
        </div>
      </div>
    </div>
  );
}
