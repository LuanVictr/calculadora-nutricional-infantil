
'use client';

import React from 'react';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '@/contexts/app-context';
import { getTranslation } from '@/lib/translations';
import { NutritionalResults } from '@/lib/types';

interface ResultRowProps {
  label: string;
  zScore: number;
  classification: string;
  color: 'green' | 'yellow' | 'red';
}

const ResultRow: React.FC<ResultRowProps> = ({ label, zScore, classification, color }) => {
  const getColorClasses = (color: 'green' | 'yellow' | 'red') => {
    switch (color) {
      case 'green':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'red':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIcon = (color: 'green' | 'yellow' | 'red') => {
    switch (color) {
      case 'green':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'yellow':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'red':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getColorClasses(color)}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            {getIcon(color)}
            <h4 className="font-semibold text-sm">{label}</h4>
          </div>
          <p className="text-xs mb-2">Z-score: {zScore}</p>
          <p className="text-sm font-medium">{classification}</p>
        </div>
        <TrendingUp className="h-5 w-5 opacity-50" />
      </div>
    </div>
  );
};

export const ResultsDisplay: React.FC = () => {
  const { state } = useApp();
  const { nutritionalResults, strongkidsData, settings, childData } = state;
  const t = (key: string) => getTranslation(key, settings.language);

  if (!nutritionalResults) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
          <div className="p-6 text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t('noData')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Resumo da criança */}
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">{t('results')}</h2>
          </div>
          
          {childData.name && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">{childData.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <span>Idade: {childData.ageMonths} meses</span>
                <span>Peso: {childData.weight} kg</span>
                <span>Altura: {childData.height} cm</span>
                {childData.bmi && <span>IMC: {childData.bmi.toFixed(1)} kg/m²</span>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resultados Nutricionais */}
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Indicadores Antropométricos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Weight for Age */}
            {nutritionalResults.weightForAge && (
              <ResultRow
                label={t('weightForAge')}
                zScore={nutritionalResults.weightForAge.zScore}
                classification={nutritionalResults.weightForAge.classification}
                color={nutritionalResults.weightForAge.color}
              />
            )}

            {/* Height for Age */}
            <ResultRow
              label={t('heightForAge')}
              zScore={nutritionalResults.heightForAge.zScore}
              classification={nutritionalResults.heightForAge.classification}
              color={nutritionalResults.heightForAge.color}
            />

            {/* Weight for Height */}
            {nutritionalResults.weightForHeight && (
              <ResultRow
                label={t('weightForHeight')}
                zScore={nutritionalResults.weightForHeight.zScore}
                classification={nutritionalResults.weightForHeight.classification}
                color={nutritionalResults.weightForHeight.color}
              />
            )}

            {/* BMI for Age */}
            <ResultRow
              label={t('bmiForAge')}
              zScore={nutritionalResults.bmiForAge.zScore}
              classification={nutritionalResults.bmiForAge.classification}
              color={nutritionalResults.bmiForAge.color}
            />
          </div>
        </div>
      </div>

      {/* Resultados STRONGkids */}
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Protocolo STRONGkids</h3>
          
          <div className={`rounded-lg border p-4 ${
            strongkidsData.riskLevel === 'low' ? 'bg-green-50 border-green-200' :
            strongkidsData.riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' :
            'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold">Pontuação: {strongkidsData.score}</h4>
                <p className="text-sm">Nível de risco: {t(strongkidsData.riskLevel + 'Risk')}</p>
              </div>
              <AlertCircle className={`h-8 w-8 ${
                strongkidsData.riskLevel === 'low' ? 'text-green-600' :
                strongkidsData.riskLevel === 'medium' ? 'text-yellow-600' :
                'text-red-600'
              }`} />
            </div>
            
            {/* Fatores de risco ativados */}
            <div className="space-y-1 text-sm">
              {strongkidsData.riskFactors.chronicDisease && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t('chronicDisease')}</span>
                </div>
              )}
              {strongkidsData.riskFactors.diarrhea && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t('diarrhea')}</span>
                </div>
              )}
              {strongkidsData.riskFactors.reducedIntake && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t('reducedIntake')}</span>
                </div>
              )}
              {strongkidsData.riskFactors.surgery && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t('surgery')}</span>
                </div>
              )}
              {strongkidsData.clinicalAssessment.severelyIll && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t('severelyIll')}</span>
                </div>
              )}
              {strongkidsData.clinicalAssessment.moderatelyIll && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t('moderatelyIll')}</span>
                </div>
              )}
              {strongkidsData.clinicalAssessment.weightLoss && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t('weightLoss')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
