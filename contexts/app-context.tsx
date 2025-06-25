
'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  ChildData, 
  NutritionalResults, 
  STRONGkidsData, 
  Assessment, 
  AppSettings,
  Language,
  Theme 
} from '@/lib/types';
import { 
  loadAppSettings, 
  saveAppSettings, 
  saveCurrentAssessment, 
  loadCurrentAssessment,
  generateId 
} from '@/lib/storage';
import { createEmptySTRONGkidsData } from '@/lib/strongkids';

interface AppState {
  // Configurações da aplicação
  settings: AppSettings;
  
  // Dados da avaliação atual
  childData: Partial<ChildData>;
  strongkidsData: STRONGkidsData;
  nutritionalResults: NutritionalResults | null;
  
  // Estado da interface
  isCalculating: boolean;
  hasResults: boolean;
  errors: Record<string, string>;
}

type AppAction = 
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'UPDATE_CHILD_DATA'; payload: Partial<ChildData> }
  | { type: 'UPDATE_STRONGKIDS_DATA'; payload: Partial<STRONGkidsData> }
  | { type: 'SET_NUTRITIONAL_RESULTS'; payload: NutritionalResults }
  | { type: 'SET_CALCULATING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: { field: string; message: string } }
  | { type: 'CLEAR_ERROR'; payload: string }
  | { type: 'CLEAR_ALL_ERRORS' }
  | { type: 'RESET_ASSESSMENT' }
  | { type: 'LOAD_SAVED_DATA'; payload: Partial<Assessment> };

const initialState: AppState = {
  settings: {
    theme: 'light',
    language: 'pt',
  },
  childData: {},
  strongkidsData: createEmptySTRONGkidsData(),
  nutritionalResults: null,
  isCalculating: false,
  hasResults: false,
  errors: {},
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      const newLanguageSettings = { ...state.settings, language: action.payload };
      saveAppSettings(newLanguageSettings);
      return { ...state, settings: newLanguageSettings };
      
    case 'SET_THEME':
      const newThemeSettings = { ...state.settings, theme: action.payload };
      saveAppSettings(newThemeSettings);
      return { ...state, settings: newThemeSettings };
      
    case 'UPDATE_CHILD_DATA':
      const updatedChildData = { ...state.childData, ...action.payload };
      saveCurrentAssessment({ childData: updatedChildData as ChildData });
      return { ...state, childData: updatedChildData, hasResults: false };
      
    case 'UPDATE_STRONGKIDS_DATA':
      const updatedSTRONGkidsData = { ...state.strongkidsData, ...action.payload };
      saveCurrentAssessment({ strongkids: updatedSTRONGkidsData });
      return { ...state, strongkidsData: updatedSTRONGkidsData };
      
    case 'SET_NUTRITIONAL_RESULTS':
      return { 
        ...state, 
        nutritionalResults: action.payload, 
        hasResults: true,
        isCalculating: false 
      };
      
    case 'SET_CALCULATING':
      return { ...state, isCalculating: action.payload };
      
    case 'SET_ERROR':
      return { 
        ...state, 
        errors: { ...state.errors, [action.payload.field]: action.payload.message } 
      };
      
    case 'CLEAR_ERROR':
      const { [action.payload]: removed, ...remainingErrors } = state.errors;
      return { ...state, errors: remainingErrors };
      
    case 'CLEAR_ALL_ERRORS':
      return { ...state, errors: {} };
      
    case 'RESET_ASSESSMENT':
      return {
        ...state,
        childData: {},
        strongkidsData: createEmptySTRONGkidsData(),
        nutritionalResults: null,
        hasResults: false,
        errors: {},
      };
      
    case 'LOAD_SAVED_DATA':
      return {
        ...state,
        childData: action.payload.childData || {},
        strongkidsData: action.payload.strongkids || createEmptySTRONGkidsData(),
        nutritionalResults: action.payload.nutritionalResults || null,
        hasResults: !!action.payload.nutritionalResults,
      };
      
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Carregar configurações salvas na inicialização
  useEffect(() => {
    const savedSettings = loadAppSettings();
    if (savedSettings.language !== state.settings.language) {
      dispatch({ type: 'SET_LANGUAGE', payload: savedSettings.language });
    }
    if (savedSettings.theme !== state.settings.theme) {
      dispatch({ type: 'SET_THEME', payload: savedSettings.theme });
    }

    // Carregar dados da avaliação atual se existirem
    const savedAssessment = loadCurrentAssessment();
    if (savedAssessment) {
      dispatch({ type: 'LOAD_SAVED_DATA', payload: savedAssessment });
    }
  }, []);

  // Aplicar tema ao documento
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(state.settings.theme);
    }
  }, [state.settings.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
