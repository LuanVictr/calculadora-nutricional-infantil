
// Dados de referência simulados da OMS para demonstração
// Em produção, estes dados devem ser carregados das tabelas oficiais da OMS

import { WHOReference, WHOTable } from './types';

// Dados simplificados para peso/idade - meninos (0-60 meses)
export const weightForAgeBoysData: WHOReference[] = [
  { month: 0, L: 0.3487, M: 3.3464, S: 0.14602 },
  { month: 1, L: 0.2297, M: 4.4709, S: 0.13395 },
  { month: 2, L: 0.1970, M: 5.5675, S: 0.12385 },
  { month: 3, L: 0.1738, M: 6.3762, S: 0.11727 },
  { month: 6, L: 0.1194, M: 7.9340, S: 0.10500 },
  { month: 12, L: 0.0436, M: 9.6479, S: 0.09108 },
  { month: 24, L: -0.0328, M: 12.2315, S: 0.08265 },
  { month: 36, L: -0.0700, M: 14.3288, S: 0.08015 },
  { month: 48, L: -0.0853, M: 16.3435, S: 0.07966 },
  { month: 60, L: -0.0912, M: 18.3024, S: 0.08120 },
];

// Dados simplificados para peso/idade - meninas (0-60 meses)
export const weightForAgeGirlsData: WHOReference[] = [
  { month: 0, L: 0.3809, M: 3.2322, S: 0.14171 },
  { month: 1, L: 0.1233, M: 4.1873, S: 0.13724 },
  { month: 2, L: 0.0402, M: 5.1282, S: 0.13000 },
  { month: 3, L: 0.0176, M: 5.8458, S: 0.12619 },
  { month: 6, L: -0.0172, M: 7.2970, S: 0.11474 },
  { month: 12, L: -0.0513, M: 8.9480, S: 0.10090 },
  { month: 24, L: -0.0756, M: 11.5485, S: 0.09218 },
  { month: 36, L: -0.0820, M: 13.9219, S: 0.08990 },
  { month: 48, L: -0.0756, M: 16.0535, S: 0.09021 },
  { month: 60, L: -0.0651, M: 18.1263, S: 0.09249 },
];

// Dados simplificados para estatura/idade - meninos (0-228 meses)
export const heightForAgeBoysData: WHOReference[] = [
  { month: 0, L: 1, M: 49.8842, S: 0.03490 },
  { month: 1, L: 1, M: 54.7244, S: 0.03668 },
  { month: 2, L: 1, M: 58.4249, S: 0.03752 },
  { month: 3, L: 1, M: 61.4292, S: 0.03788 },
  { month: 6, L: 1, M: 67.6236, S: 0.03714 },
  { month: 12, L: 1, M: 75.7488, S: 0.03597 },
  { month: 24, L: 1, M: 87.0769, S: 0.03647 },
  { month: 36, L: 1, M: 96.1285, S: 0.03795 },
  { month: 48, L: 1, M: 103.3044, S: 0.03957 },
  { month: 60, L: 1, M: 109.9044, S: 0.04119 },
  { month: 120, L: 1, M: 147.0929, S: 0.06056 },
  { month: 180, L: 1, M: 169.0384, S: 0.06989 },
  { month: 228, L: 1, M: 176.9698, S: 0.07227 },
];

// Dados simplificados para estatura/idade - meninas (0-228 meses)
export const heightForAgeGirlsData: WHOReference[] = [
  { month: 0, L: 1, M: 49.1477, S: 0.03790 },
  { month: 1, L: 1, M: 53.6872, S: 0.03959 },
  { month: 2, L: 1, M: 57.0673, S: 0.04019 },
  { month: 3, L: 1, M: 59.8029, S: 0.04032 },
  { month: 6, L: 1, M: 65.7311, S: 0.03871 },
  { month: 12, L: 1, M: 74.3977, S: 0.03777 },
  { month: 24, L: 1, M: 86.4130, S: 0.03842 },
  { month: 36, L: 1, M: 95.1036, S: 0.03984 },
  { month: 48, L: 1, M: 101.9077, S: 0.04127 },
  { month: 60, L: 1, M: 108.4452, S: 0.04266 },
  { month: 120, L: 1, M: 148.1116, S: 0.06379 },
  { month: 180, L: 1, M: 160.8058, S: 0.06743 },
  { month: 228, L: 1, M: 162.5574, S: 0.06731 },
];

// Dados simplificados para IMC/idade - meninos (0-228 meses)
export const bmiForAgeBoysData: WHOReference[] = [
  { month: 0, L: -1.7647, M: 13.4059, S: 0.09189 },
  { month: 3, L: -1.5576, M: 16.3348, S: 0.08619 },
  { month: 6, L: -1.3576, M: 17.7644, S: 0.08270 },
  { month: 12, L: -1.0423, M: 17.2738, S: 0.08327 },
  { month: 24, L: -0.6073, M: 16.0628, S: 0.08808 },
  { month: 36, L: -0.2991, M: 15.6895, S: 0.09305 },
  { month: 48, L: -0.0550, M: 15.5264, S: 0.09785 },
  { month: 60, L: 0.1395, M: 15.4747, S: 0.10243 },
  { month: 120, L: 0.8559, M: 17.2768, S: 0.13884 },
  { month: 180, L: 0.9508, M: 20.1388, S: 0.15973 },
  { month: 228, L: 0.9508, M: 22.4597, S: 0.17016 },
];

// Dados simplificados para IMC/idade - meninas (0-228 meses)
export const bmiForAgeGirlsData: WHOReference[] = [
  { month: 0, L: -1.5201, M: 13.2219, S: 0.09550 },
  { month: 3, L: -1.3547, M: 15.9951, S: 0.08866 },
  { month: 6, L: -1.1776, M: 17.3211, S: 0.08541 },
  { month: 12, L: -0.8568, M: 16.8177, S: 0.08565 },
  { month: 24, L: -0.4267, M: 15.7688, S: 0.08882 },
  { month: 36, L: -0.1333, M: 15.4654, S: 0.09294 },
  { month: 48, L: 0.1034, M: 15.3046, S: 0.09710 },
  { month: 60, L: 0.2986, M: 15.2102, S: 0.10120 },
  { month: 120, L: 0.9781, M: 17.0012, S: 0.14142 },
  { month: 180, L: 1.0543, M: 20.7400, S: 0.17706 },
  { month: 228, L: 1.0543, M: 21.7500, S: 0.18532 },
];

// Função para obter dados de referência baseados no indicador, sexo e idade
export const getWHOReferenceData = (
  indicator: 'weightForAge' | 'heightForAge' | 'bmiForAge' | 'weightForHeight',
  gender: 'male' | 'female',
  ageMonths: number
): WHOReference | null => {
  let data: WHOReference[] = [];
  
  switch (indicator) {
    case 'weightForAge':
      data = gender === 'male' ? weightForAgeBoysData : weightForAgeGirlsData;
      break;
    case 'heightForAge':
      data = gender === 'male' ? heightForAgeBoysData : heightForAgeGirlsData;
      break;
    case 'bmiForAge':
      data = gender === 'male' ? bmiForAgeBoysData : bmiForAgeGirlsData;
      break;
    case 'weightForHeight':
      // Para peso/altura, usamos dados baseados na altura, não idade
      // Por simplicidade, retornamos valores simulados
      return {
        month: ageMonths,
        L: 1,
        M: gender === 'male' ? 15.5 : 15.2, // Valores simulados
        S: 0.1
      };
    default:
      return null;
  }
  
  // Encontrar referência exata ou interpolar
  const exactMatch = data.find(ref => ref.month === ageMonths);
  if (exactMatch) return exactMatch;
  
  // Interpolar entre dois pontos
  const lowerRef = data.filter(ref => ref.month < ageMonths).pop();
  const upperRef = data.find(ref => ref.month > ageMonths);
  
  if (!lowerRef || !upperRef) {
    // Se não há dados suficientes para interpolar, usar o mais próximo
    if (lowerRef) return lowerRef;
    if (upperRef) return upperRef;
    return null;
  }
  
  const ratio = (ageMonths - lowerRef.month) / (upperRef.month - lowerRef.month);
  
  return {
    month: ageMonths,
    L: lowerRef.L + ratio * (upperRef.L - lowerRef.L),
    M: lowerRef.M + ratio * (upperRef.M - lowerRef.M),
    S: lowerRef.S + ratio * (upperRef.S - lowerRef.S),
  };
};
