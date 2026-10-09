import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export default function PreparationTimeForm({ data, onChange, errors = {} }) {
  const prepValue = data.preparation_value !== undefined && data.preparation_value !== null ? data.preparation_value : '';
  const prepUnit = data.preparation_unit || 'Months';

  return (
    <div>
      <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-indigo-600" />
        <span>Preparation Time Horizon</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <input
            id="preparation_value_input"
            type="number"
            min="1"
            max="100"
            autoComplete="off"
            value={prepValue}
            onChange={(e) => {
              const val = e.target.value ? Number(e.target.value) : '';
              onChange('preparation_value', val);
              onChange('prepValue', val);
            }}
            placeholder="e.g. 6"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none ${
              errors.preparation_value
                ? 'border-rose-400 bg-rose-50/50 text-rose-900 placeholder:text-rose-300 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-200/90 bg-slate-50/60 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
            }`}
          />
          {errors.preparation_value && (
            <p className="mt-1.5 text-xs font-bold text-rose-600 flex items-center gap-1 animate-in fade-in duration-150">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.preparation_value}</span>
            </p>
          )}
        </div>

        <div>
          <select
            id="preparation_unit_input"
            value={prepUnit}
            onChange={(e) => {
              const val = e.target.value;
              onChange('preparation_unit', val);
              onChange('prepUnit', val);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-slate-50/60 text-sm font-semibold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none cursor-pointer"
          >
            <option value="Days">Days</option>
            <option value="Months">Months</option>
            <option value="Years">Years</option>
          </select>
        </div>
      </div>
    </div>
  );
}
