import { PasswordCriteria, StrengthLevel, LocalAnalysisResult } from '../types';

export const analyzePasswordLocally = (password: string): LocalAnalysisResult => {
  const criteria: PasswordCriteria = {
    hasLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[@#$%^&*()_+\- =!?]/.test(password), // Specific symbols from prompt
  };

  let score = 0;
  if (criteria.hasLength) score++;
  if (criteria.hasUpper) score++;
  if (criteria.hasLower) score++;
  if (criteria.hasNumber) score++;
  if (criteria.hasSymbol) score++;

  let strength = StrengthLevel.WEAK;
  if (score >= 5) {
    strength = StrengthLevel.STRONG;
  } else if (score >= 3) {
    strength = StrengthLevel.MEDIUM;
  }

  return {
    score,
    strength,
    criteria,
  };
};

export const getStrengthColor = (strength: StrengthLevel) => {
  switch (strength) {
    case StrengthLevel.STRONG:
      return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50';
    case StrengthLevel.MEDIUM:
      return 'text-amber-400 bg-amber-500/20 border-amber-500/50';
    case StrengthLevel.WEAK:
    default:
      return 'text-rose-400 bg-rose-500/20 border-rose-500/50';
  }
};

export const getStrengthBarColor = (score: number, index: number) => {
  if (index >= score) return 'bg-slate-700';
  
  if (score === 5) return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
  if (score >= 3) return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
  return 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]';
};
