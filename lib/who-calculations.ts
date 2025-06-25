
import { ChildData, NutritionalResults, WHOReference } from './types';
import { getWHOReferenceData } from './who-reference-data';

// Função para calcular idade em meses
export const calculateAgeInMonths = (birthDate: string, assessmentDate: string): number => {
  const birth = new Date(birthDate);
  const assessment = new Date(assessmentDate);
  
  const months = (assessment.getFullYear() - birth.getFullYear()) * 12 + 
                 (assessment.getMonth() - birth.getMonth());
  
  // Ajustar se o dia da avaliação é anterior ao dia de nascimento
  if (assessment.getDate() < birth.getDate()) {
    return months - 1;
  }
  
  return Math.max(0, months); // Garantir que não seja negativo
};

// Função para calcular IMC
export const calculateBMI = (weight: number, height: number): number => {
  const heightInM = height / 100;
  return weight / (heightInM * heightInM);
};

// Função para calcular Z-score usando método LMS
export const calculateZScore = (value: number, L: number, M: number, S: number): number => {
  if (L !== 0) {
    return ((Math.pow(value / M, L) - 1) / (L * S));
  } else {
    return Math.log(value / M) / S;
  }
};

// Função para classificar baseado no Z-score
export const classifyZScore = (
  zScore: number, 
  indicator: string, 
  ageMonths: number
): { classification: string; color: 'green' | 'yellow' | 'red' } => {
  
  // Classificações baseadas nas tabelas do protocolo
  if (indicator === 'weightForAge') {
    if (zScore < -3) return { classification: 'Muito baixo peso para a idade', color: 'red' };
    if (zScore < -2) return { classification: 'Baixo peso para a idade', color: 'yellow' };
    if (zScore < 2) return { classification: 'Peso adequado para a idade', color: 'green' };
    return { classification: 'Peso elevado para a idade', color: 'yellow' };
  }
  
  if (indicator === 'heightForAge') {
    if (zScore < -3) return { classification: 'Muito baixa estatura para a idade', color: 'red' };
    if (zScore < -2) return { classification: 'Baixa estatura para a idade', color: 'yellow' };
    return { classification: 'Estatura adequada para a idade', color: 'green' };
  }
  
  if (indicator === 'weightForHeight') {
    if (zScore < -3) return { classification: 'Magreza acentuada', color: 'red' };
    if (zScore < -2) return { classification: 'Magreza', color: 'yellow' };
    if (zScore < 1) return { classification: 'Eutrofia', color: 'green' };
    if (zScore < 2) return { classification: 'Risco de sobrepeso', color: 'yellow' };
    if (zScore < 3) return { classification: 'Sobrepeso', color: 'yellow' };
    return { classification: 'Obesidade', color: 'red' };
  }
  
  if (indicator === 'bmiForAge') {
    // Para crianças de 5-10 anos
    if (ageMonths >= 60 && ageMonths < 120) {
      if (zScore < -3) return { classification: 'Magreza acentuada', color: 'red' };
      if (zScore < -2) return { classification: 'Magreza', color: 'yellow' };
      if (zScore < 1) return { classification: 'Eutrofia', color: 'green' };
      if (zScore < 2) return { classification: 'Sobrepeso', color: 'yellow' };
      if (zScore < 3) return { classification: 'Obesidade', color: 'red' };
      return { classification: 'Obesidade grave', color: 'red' };
    }
    
    // Para adolescentes 10-19 anos
    if (ageMonths >= 120) {
      if (zScore < -2) return { classification: 'Magreza', color: 'yellow' };
      if (zScore < 1) return { classification: 'Eutrofia', color: 'green' };
      if (zScore < 2) return { classification: 'Sobrepeso', color: 'yellow' };
      if (zScore < 3) return { classification: 'Obesidade', color: 'red' };
      return { classification: 'Obesidade grave', color: 'red' };
    }
    
    // Para crianças menores de 5 anos
    if (zScore < -3) return { classification: 'Magreza acentuada', color: 'red' };
    if (zScore < -2) return { classification: 'Magreza', color: 'yellow' };
    if (zScore < 1) return { classification: 'Eutrofia', color: 'green' };
    if (zScore < 2) return { classification: 'Risco de sobrepeso', color: 'yellow' };
    if (zScore < 3) return { classification: 'Sobrepeso', color: 'yellow' };
    return { classification: 'Obesidade', color: 'red' };
  }
  
  return { classification: 'Indeterminado', color: 'yellow' };
};

// Função principal para calcular todos os indicadores nutricionais
export const calculateNutritionalIndicators = (childData: ChildData): NutritionalResults => {
  const ageMonths = calculateAgeInMonths(childData.birthDate, childData.assessmentDate);
  const bmi = calculateBMI(childData.weight, childData.height);
  
  const results: NutritionalResults = {
    heightForAge: {
      zScore: 0,
      classification: '',
      color: 'green'
    },
    bmiForAge: {
      zScore: 0,
      classification: '',
      color: 'green'
    }
  };
  
  try {
    // Calcular Height for Age (sempre disponível)
    const heightRef = getWHOReferenceData('heightForAge', childData.gender, ageMonths);
    if (heightRef) {
      const heightZScore = calculateZScore(childData.height, heightRef.L, heightRef.M, heightRef.S);
      const heightClassification = classifyZScore(heightZScore, 'heightForAge', ageMonths);
      results.heightForAge = {
        zScore: Math.round(heightZScore * 100) / 100,
        classification: heightClassification.classification,
        color: heightClassification.color
      };
    }
    
    // Calcular BMI for Age (sempre disponível)
    const bmiRef = getWHOReferenceData('bmiForAge', childData.gender, ageMonths);
    if (bmiRef) {
      const bmiZScore = calculateZScore(bmi, bmiRef.L, bmiRef.M, bmiRef.S);
      const bmiClassification = classifyZScore(bmiZScore, 'bmiForAge', ageMonths);
      results.bmiForAge = {
        zScore: Math.round(bmiZScore * 100) / 100,
        classification: bmiClassification.classification,
        color: bmiClassification.color
      };
    }
    
    // Weight for Age (disponível até 10 anos - 120 meses)
    if (ageMonths <= 120) {
      const weightRef = getWHOReferenceData('weightForAge', childData.gender, ageMonths);
      if (weightRef) {
        const weightZScore = calculateZScore(childData.weight, weightRef.L, weightRef.M, weightRef.S);
        const weightClassification = classifyZScore(weightZScore, 'weightForAge', ageMonths);
        results.weightForAge = {
          zScore: Math.round(weightZScore * 100) / 100,
          classification: weightClassification.classification,
          color: weightClassification.color
        };
      }
    }
    
    // Weight for Height (disponível até 5 anos - 60 meses)
    if (ageMonths <= 60) {
      const weightHeightRef = getWHOReferenceData('weightForHeight', childData.gender, ageMonths);
      if (weightHeightRef) {
        const weightHeightZScore = calculateZScore(childData.weight, weightHeightRef.L, weightHeightRef.M, weightHeightRef.S);
        const weightHeightClassification = classifyZScore(weightHeightZScore, 'weightForHeight', ageMonths);
        results.weightForHeight = {
          zScore: Math.round(weightHeightZScore * 100) / 100,
          classification: weightHeightClassification.classification,
          color: weightHeightClassification.color
        };
      }
    }
  } catch (error) {
    console.error('Erro no cálculo dos indicadores nutricionais:', error);
  }
  
  return results;
};
