
import { STRONGkidsData } from './types';

// Função para calcular pontuação STRONGkids
export const calculateSTRONGkidsScore = (data: STRONGkidsData): number => {
  let score = 0;
  
  // Fatores de risco (1 ponto cada)
  if (data.riskFactors.chronicDisease) score += 1;
  if (data.riskFactors.diarrhea) score += 1;
  if (data.riskFactors.reducedIntake) score += 1;
  if (data.riskFactors.surgery) score += 1;
  
  // Avaliação clínica (2 pontos para severo, 1 para moderado)
  if (data.clinicalAssessment.severelyIll) score += 2;
  else if (data.clinicalAssessment.moderatelyIll) score += 1;
  
  if (data.clinicalAssessment.weightLoss) score += 1;
  
  return score;
};

// Função para determinar nível de risco baseado na pontuação
export const getSTRONGkidsRiskLevel = (score: number): 'low' | 'medium' | 'high' => {
  if (score === 0) return 'low';
  if (score <= 3) return 'medium';
  return 'high';
};

// Função para obter recomendações baseadas no nível de risco
export const getSTRONGkidsRecommendations = (riskLevel: 'low' | 'medium' | 'high', language: string): string[] => {
  const recommendations = {
    pt: {
      low: [
        'Nenhuma intervenção nutricional específica necessária',
        'Monitoramento de rotina',
        'Reavaliação em 7 dias se hospitalizado'
      ],
      medium: [
        'Consulta com nutricionista',
        'Monitoramento de ingestão alimentar',
        'Reavaliação em 3 dias',
        'Considerar suplementação se necessário'
      ],
      high: [
        'Intervenção nutricional imediata',
        'Consulta com nutricionista urgente',
        'Monitoramento diário',
        'Considerar nutrição enteral ou parenteral',
        'Reavaliação em 24-48 horas'
      ]
    },
    en: {
      low: [
        'No specific nutritional intervention needed',
        'Routine monitoring',
        'Reassessment in 7 days if hospitalized'
      ],
      medium: [
        'Nutritionist consultation',
        'Food intake monitoring',
        'Reassessment in 3 days',
        'Consider supplementation if necessary'
      ],
      high: [
        'Immediate nutritional intervention',
        'Urgent nutritionist consultation',
        'Daily monitoring',
        'Consider enteral or parenteral nutrition',
        'Reassessment in 24-48 hours'
      ]
    }
  };
  
  return recommendations[language as keyof typeof recommendations]?.[riskLevel] || [];
};

// Função para criar dados STRONGkids vazios
export const createEmptySTRONGkidsData = (): STRONGkidsData => ({
  riskFactors: {
    chronicDisease: false,
    diarrhea: false,
    reducedIntake: false,
    surgery: false,
  },
  clinicalAssessment: {
    severelyIll: false,
    moderatelyIll: false,
    weightLoss: false,
  },
  score: 0,
  riskLevel: 'low',
});
