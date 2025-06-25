
'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '@/contexts/app-context';
import { getTranslation } from '@/lib/translations';

export const Footer: React.FC = () => {
  const { state } = useApp();
  const t = (key: string) => getTranslation(key, state.settings.language);

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Heart className="h-4 w-4 text-red-500" />
            <span>{t('developedBy')}</span>
          </div>
          
          <p className="text-xs text-muted-foreground">
            {t('version')} 1.0 | {new Date().getFullYear()}
          </p>
          
          <p className="text-xs text-muted-foreground max-w-md">
            Baseado nos protocolos da OMS e STRONGkids para triagem nutricional pediátrica
          </p>
        </div>
      </div>
    </footer>
  );
};
