
import { Assessment, ChildData, AppSettings } from './types';

const STORAGE_KEYS = {
  ASSESSMENTS: 'pediatric_assessments',
  SETTINGS: 'app_settings',
  CURRENT_ASSESSMENT: 'current_assessment',
};

// Funções para gerenciar configurações da aplicação
export const saveAppSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving app settings:', error);
  }
};

export const loadAppSettings = (): AppSettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading app settings:', error);
  }
  
  return {
    theme: 'light',
    language: 'pt',
  };
};

// Funções para gerenciar avaliações
export const saveAssessment = (assessment: Assessment): void => {
  try {
    const assessments = loadAssessments();
    const existingIndex = assessments.findIndex(a => a.id === assessment.id);
    
    if (existingIndex >= 0) {
      assessments[existingIndex] = assessment;
    } else {
      assessments.push(assessment);
    }
    
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
  } catch (error) {
    console.error('Error saving assessment:', error);
  }
};

export const loadAssessments = (): Assessment[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading assessments:', error);
  }
  
  return [];
};

export const deleteAssessment = (id: string): void => {
  try {
    const assessments = loadAssessments();
    const filtered = assessments.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting assessment:', error);
  }
};

// Funções para gerenciar avaliação atual (dados temporários)
export const saveCurrentAssessment = (data: Partial<Assessment>): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ASSESSMENT, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving current assessment:', error);
  }
};

export const loadCurrentAssessment = (): Partial<Assessment> | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_ASSESSMENT);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading current assessment:', error);
  }
  
  return null;
};

export const clearCurrentAssessment = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ASSESSMENT);
  } catch (error) {
    console.error('Error clearing current assessment:', error);
  }
};

// Função utilitária para gerar ID único
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
