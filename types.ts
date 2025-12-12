export enum StrengthLevel {
  WEAK = 'Weak',
  MEDIUM = 'Medium',
  STRONG = 'Strong',
}

export interface PasswordCriteria {
  hasLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
}

export interface LocalAnalysisResult {
  score: number; // 0 to 5
  strength: StrengthLevel;
  criteria: PasswordCriteria;
}

export interface AiAnalysisResult {
  strength: StrengthLevel;
  explanation: string;
  suggestions: string[];
}
