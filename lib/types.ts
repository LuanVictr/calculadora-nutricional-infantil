
// Tipos para dados da criança
export interface ChildData {
  id?: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female';
  weight: number; // kg
  height: number; // cm
  assessmentDate: string;
  ageMonths?: number;
  bmi?: number;
}

// Tipos para resultados dos cálculos nutricionais
export interface NutritionalResults {
  weightForAge?: {
    zScore: number;
    classification: string;
    color: 'green' | 'yellow' | 'red';
  };
  heightForAge: {
    zScore: number;
    classification: string;
    color: 'green' | 'yellow' | 'red';
  };
  weightForHeight?: {
    zScore: number;
    classification: string;
    color: 'green' | 'yellow' | 'red';
  };
  bmiForAge: {
    zScore: number;
    classification: string;
    color: 'green' | 'yellow' | 'red';
  };
}

// Tipos para protocolo STRONGkids
export interface STRONGkidsData {
  riskFactors: {
    chronicDisease: boolean;
    diarrhea: boolean;
    reducedIntake: boolean;
    surgery: boolean;
  };
  clinicalAssessment: {
    severelyIll: boolean;
    moderatelyIll: boolean;
    weightLoss: boolean;
  };
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
}

// Tipos para dados completos da avaliação
export interface Assessment {
  id: string;
  childData: ChildData;
  nutritionalResults: NutritionalResults;
  strongkids: STRONGkidsData;
  createdAt: string;
  updatedAt: string;
}

// Tipos para tradução
export interface Translation {
  [key: string]: string | Translation;
}

// Tipos para tema
export type Theme = 'light' | 'dark';

// Tipos para linguagem
export type Language = 'pt' | 'en';

// Tipos para configurações da aplicação
export interface AppSettings {
  theme: Theme;
  language: Language;
}

// Tipos para referências da OMS
export interface WHOReference {
  month: number;
  L: number;
  M: number;
  S: number;
}

export interface WHOTable {
  [key: string]: WHOReference[];
}

// Tipos para classificação nutricional
export interface NutritionalClassification {
  zScore: number;
  classification: string;
  color: 'green' | 'yellow' | 'red';
  description: string;
}
