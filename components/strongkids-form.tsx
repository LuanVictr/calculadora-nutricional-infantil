
'use client';

import React from 'react';
import { AlertTriangle, Activity, TrendingDown } from 'lucide-react';
import { useApp } from '@/contexts/app-context';
import { getTranslation } from '@/lib/translations';
import { calculateSTRONGkidsScore, getSTRONGkidsRiskLevel } from '@/lib/strongkids';

export const STRONGkidsForm: React.FC = () => {
  const { state, dispatch } = useApp();
  const { strongkidsData, settings } = state;
  const t = (key: string) => getTranslation(key, settings.language);

  const updateRiskFactor = (factor: keyof typeof strongkidsData.riskFactors, value: boolean) => {
    const updatedData = {
      ...strongkidsData,
      riskFactors: {
        ...strongkidsData.riskFactors,
        [factor]: value,
      },
    };
    
    const score = calculateSTRONGkidsScore(updatedData);
    const riskLevel = getSTRONGkidsRiskLevel(score);
    
    dispatch({
      type: 'UPDATE_STRONGKIDS_DATA',
      payload: {
        ...updatedData,
        score,
        riskLevel,
      },
    });
  };

  const updateClinicalAssessment = (assessment: keyof typeof strongkidsData.clinicalAssessment, value: boolean) => {
    const updatedData = {
      ...strongkidsData,
      clinicalAssessment: {
        ...strongkidsData.clinicalAssessment,
        [assessment]: value,
      },
    };
    
    const score = calculateSTRONGkidsScore(updatedData);
    const riskLevel = getSTRONGkidsRiskLevel(score);
    
    dispatch({
      type: 'UPDATE_STRONGKIDS_DATA',
      payload: {
        ...updatedData,
        score,
        riskLevel,
      },
    });
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">{t('strongkidsTitle')}</h2>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            {t('strongkidsDescription')}
          </p>

          {/* Score atual */}
          <div className={`rounded-lg border p-4 mb-6 ${getRiskLevelColor(strongkidsData.riskLevel)}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Pontuação STRONGkids: {strongkidsData.score}</h3>
                <p className="text-sm">Nível de risco: {t(strongkidsData.riskLevel + 'Risk')}</p>
              </div>
              <Activity className="h-8 w-8" />
            </div>
          </div>

          <div className="space-y-6">
            {/* Fatores de Risco */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold">{t('riskFactors')}</h3>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={strongkidsData.riskFactors.chronicDisease}
                    onChange={(e) => updateRiskFactor('chronicDisease', e.target.checked)}
                    className="w-5 h-5 text-primary bg-background border-2 border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <span className="text-sm font-medium">{t('chronicDisease')}</span>
                    <p className="text-xs text-muted-foreground">Diabetes, doença cardíaca, doença renal, etc.</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={strongkidsData.riskFactors.diarrhea}
                    onChange={(e) => updateRiskFactor('diarrhea', e.target.checked)}
                    className="w-5 h-5 text-primary bg-background border-2 border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <span className="text-sm font-medium">{t('diarrhea')}</span>
                    <p className="text-xs text-muted-foreground">Diarreia por mais de 5 dias</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={strongkidsData.riskFactors.reducedIntake}
                    onChange={(e) => updateRiskFactor('reducedIntake', e.target.checked)}
                    className="w-5 h-5 text-primary bg-background border-2 border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <span className="text-sm font-medium">{t('reducedIntake')}</span>
                    <p className="text-xs text-muted-foreground">Ingestão alimentar reduzida na última semana</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={strongkidsData.riskFactors.surgery}
                    onChange={(e) => updateRiskFactor('surgery', e.target.checked)}
                    className="w-5 h-5 text-primary bg-background border-2 border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <span className="text-sm font-medium">{t('surgery')}</span>
                    <p className="text-xs text-muted-foreground">Cirurgia de grande porte planejada ou realizada</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Avaliação Clínica */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold">{t('clinicalAssessment')}</h3>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={strongkidsData.clinicalAssessment.severelyIll}
                    onChange={(e) => updateClinicalAssessment('severelyIll', e.target.checked)}
                    className="w-5 h-5 text-primary bg-background border-2 border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <span className="text-sm font-medium">{t('severelyIll')}</span>
                    <p className="text-xs text-muted-foreground">Estado clínico grave, UTI, ventilação mecânica</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={strongkidsData.clinicalAssessment.moderatelyIll}
                    onChange={(e) => updateClinicalAssessment('moderatelyIll', e.target.checked)}
                    className="w-5 h-5 text-primary bg-background border-2 border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <span className="text-sm font-medium">{t('moderatelyIll')}</span>
                    <p className="text-xs text-muted-foreground">Estado clínico moderado, internação hospitalar</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={strongkidsData.clinicalAssessment.weightLoss}
                    onChange={(e) => updateClinicalAssessment('weightLoss', e.target.checked)}
                    className="w-5 h-5 text-primary bg-background border-2 border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <span className="text-sm font-medium">{t('weightLoss')}</span>
                    <p className="text-xs text-muted-foreground">Perda de peso não intencional recente</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
