import React from 'react';
import { AiAnalysisResult, StrengthLevel } from '../types';
import { ShieldAlert, ShieldCheck, Shield, Sparkles } from 'lucide-react';

interface AiFeedbackProps {
  analysis: AiAnalysisResult | null;
  loading: boolean;
  onAnalyze: () => void;
  canAnalyze: boolean;
}

export const AiFeedback: React.FC<AiFeedbackProps> = ({ analysis, loading, onAnalyze, canAnalyze }) => {
  
  if (!analysis && !loading) {
    return (
      <div className="mt-8 pt-8 border-t border-slate-800/50 flex justify-center">
        <button
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className={`
            group relative flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300
            ${canAnalyze 
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] cursor-pointer' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
          `}
        >
          <Sparkles className={`w-5 h-5 ${canAnalyze ? 'animate-pulse' : ''}`} />
          <span>Get Advanced AI Security Report</span>
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-8 pt-8 border-t border-slate-800/50">
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-r-2 border-purple-500 rounded-full animate-spin reverse"></div>
            <div className="absolute inset-4 border-b-2 border-emerald-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-400 animate-pulse font-mono text-sm">Analyzing entropy & patterns...</p>
        </div>
      </div>
    );
  }

  if (analysis) {
    const isStrong = analysis.strength === StrengthLevel.STRONG;
    const isWeak = analysis.strength === StrengthLevel.WEAK;

    return (
      <div className="mt-8 pt-8 border-t border-slate-800/50 animate-fade-in-up">
        <div className={`rounded-2xl border backdrop-blur-sm overflow-hidden ${
          isStrong 
            ? 'bg-emerald-950/20 border-emerald-500/30' 
            : isWeak 
              ? 'bg-rose-950/20 border-rose-500/30' 
              : 'bg-amber-950/20 border-amber-500/30'
        }`}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isStrong ? 'bg-emerald-500/20 text-emerald-400' : isWeak ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {isStrong ? <ShieldCheck size={24} /> : isWeak ? <ShieldAlert size={24} /> : <Shield size={24} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">AI Security Assessment</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Verdict: <span className={isStrong ? 'text-emerald-400' : isWeak ? 'text-rose-400' : 'text-amber-400'}>{analysis.strength}</span>
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {analysis.explanation}
            </p>

            {analysis.suggestions.length > 0 && (
              <div className="bg-slate-900/50 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Recommended Actions</h4>
                <ul className="space-y-2">
                  {analysis.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
