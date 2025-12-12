import React from 'react';
import { Check, X } from 'lucide-react';
import { LocalAnalysisResult, PasswordCriteria } from '../types';
import { getStrengthBarColor, getStrengthColor } from '../utils/passwordLogic';

interface StrengthIndicatorProps {
  result: LocalAnalysisResult;
}

const RequirementItem: React.FC<{ met: boolean; label: string }> = ({ met, label }) => (
  <div className={`flex items-center space-x-3 text-sm transition-colors duration-300 ${met ? 'text-slate-300' : 'text-slate-500'}`}>
    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${met ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>
      {met ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
    </div>
    <span>{label}</span>
  </div>
);

export const StrengthIndicator: React.FC<StrengthIndicatorProps> = ({ result }) => {
  const { score, strength, criteria } = result;
  
  const bars = [0, 1, 2, 3, 4]; // 5 bars for 5 points

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Score Header */}
      <div className="flex items-center justify-between">
        <span className="text-slate-400 font-medium">Strength Estimate</span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStrengthColor(strength)} transition-all duration-300`}>
          {strength}
        </span>
      </div>

      {/* Progress Bars */}
      <div className="flex gap-2 h-2">
        {bars.map((index) => (
          <div
            key={index}
            className={`flex-1 rounded-full transition-all duration-500 ${getStrengthBarColor(score, index)}`}
          />
        ))}
      </div>

      {/* Requirements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <RequirementItem met={criteria.hasLength} label="At least 8 characters" />
        <RequirementItem met={criteria.hasUpper} label="Uppercase letters (A-Z)" />
        <RequirementItem met={criteria.hasLower} label="Lowercase letters (a-z)" />
        <RequirementItem met={criteria.hasNumber} label="Numbers (0-9)" />
        <RequirementItem met={criteria.hasSymbol} label="Special symbols (@#$%)" />
      </div>
    </div>
  );
};
