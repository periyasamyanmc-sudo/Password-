import React, { useState, useEffect, useCallback } from 'react';
import { PasswordInput } from './components/PasswordInput';
import { StrengthIndicator } from './components/StrengthIndicator';
import { AiFeedback } from './components/AiFeedback';
import { analyzePasswordLocally } from './utils/passwordLogic';
import { analyzePasswordWithGemini } from './services/geminiService';
import { LocalAnalysisResult, AiAnalysisResult } from './types';
import { Shield, Lock } from 'lucide-react';

const App: React.FC = () => {
  const [password, setPassword] = useState('');
  const [localResult, setLocalResult] = useState<LocalAnalysisResult | null>(null);
  
  const [aiResult, setAiResult] = useState<AiAnalysisResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Analyze locally whenever password changes
  useEffect(() => {
    if (password) {
      setLocalResult(analyzePasswordLocally(password));
      // Reset AI result when password changes to avoid stale data
      setAiResult(null); 
    } else {
      setLocalResult(null);
      setAiResult(null);
    }
  }, [password]);

  const handleAiAnalysis = useCallback(async () => {
    if (!password) return;
    
    setAiLoading(true);
    try {
      const result = await analyzePasswordWithGemini(password);
      setAiResult(result);
    } catch (error) {
      console.error("Analysis failed", error);
      // Fallback UI or toast could go here
    } finally {
      setAiLoading(false);
    }
  }, [password]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-indigo-500/30">
      
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl mb-6">
            <Shield className="w-8 h-8 text-indigo-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 tracking-tight mb-3">
            Sentinel
          </h1>
          <p className="text-slate-500 text-lg">Advanced Password Analysis & Security Assessment</p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Password Check
              </label>
              <PasswordInput 
                value={password} 
                onChange={setPassword} 
                disabled={aiLoading} 
              />
            </div>

            {localResult && (
              <StrengthIndicator result={localResult} />
            )}

            {!localResult && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-600 space-y-3 opacity-50">
                <Lock className="w-12 h-12 mb-2" />
                <p className="text-sm font-mono">Enter a password to begin analysis</p>
              </div>
            )}
          </div>

          <AiFeedback 
            analysis={aiResult}
            loading={aiLoading}
            onAnalyze={handleAiAnalysis}
            canAnalyze={!!localResult && !aiLoading}
          />
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-xs">
            Powered by React, Tailwind & Gemini 2.5 Flash. <br/>
            Passwords are processed securely for demonstration purposes.
          </p>
        </div>

      </div>
    </div>
  );
};

export default App;
