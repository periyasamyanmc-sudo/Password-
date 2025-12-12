import React, { useState } from 'react';
import { Eye, EyeOff, KeyRound } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, disabled }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <KeyRound className={`h-5 w-5 transition-colors duration-300 ${value ? 'text-indigo-400' : 'text-slate-500'}`} />
      </div>
      
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="block w-full pl-12 pr-12 py-4 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 font-mono text-lg shadow-inner"
        placeholder="Enter a password to analyze..."
        autoComplete="off"
        spellCheck="false"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-indigo-400 transition-colors focus:outline-none"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
      
      {/* Decorative glow effect on focus within parent group */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-20 transition duration-500 pointer-events-none blur"></div>
    </div>
  );
};
