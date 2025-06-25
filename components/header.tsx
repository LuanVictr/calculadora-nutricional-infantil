
'use client';

import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { useApp } from '@/contexts/app-context';
import { getTranslation } from '@/lib/translations';

export const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const { theme, language } = state.settings;
  
  const t = (key: string) => getTranslation(key, language);

  const toggleTheme = () => {
    dispatch({ 
      type: 'SET_THEME', 
      payload: theme === 'light' ? 'dark' : 'light' 
    });
  };

  const toggleLanguage = () => {
    dispatch({ 
      type: 'SET_LANGUAGE', 
      payload: language === 'pt' ? 'en' : 'pt' 
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-foreground">
            {t('title')}
          </h1>
          <p className="text-sm text-muted-foreground hidden sm:block">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
            title={t('toggleLanguage')}
          >
            <Globe className="h-5 w-5" />
            <span className="sr-only">{t('toggleLanguage')}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
            title={t('toggleTheme')}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">{t('toggleTheme')}</span>
          </button>

          {/* Language Indicator */}
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span className="font-medium">{language.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
