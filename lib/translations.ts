
import { Translation } from './types';

export const translations: Record<string, Translation> = {
  pt: {
    // Header
    title: 'Triagem Nutricional Pediátrica',
    subtitle: 'Sistema de avaliação nutricional baseado em protocolos da OMS e STRONGkids',
    
    // Navigation
    toggleTheme: 'Alternar tema',
    toggleLanguage: 'Alternar idioma',
    
    // Child Data Form
    childData: 'Dados da Criança',
    childName: 'Nome da criança',
    birthDate: 'Data de nascimento',
    gender: 'Sexo',
    male: 'Masculino',
    female: 'Feminino',
    weight: 'Peso (kg)',
    height: 'Altura/Comprimento (cm)',
    assessmentDate: 'Data da avaliação',
    
    // STRONGkids Protocol
    strongkidsTitle: 'Protocolo STRONGkids (Opcional)',
    strongkidsDescription: 'Avaliação de fatores de risco nutricional',
    riskFactors: 'Fatores de Risco',
    clinicalAssessment: 'Avaliação Clínica',
    chronicDisease: 'Doença crônica',
    diarrhea: 'Diarreia (>5 dias)',
    reducedIntake: 'Ingestão reduzida',
    surgery: 'Cirurgia maior',
    severelyIll: 'Gravemente doente',
    moderatelyIll: 'Moderadamente doente',
    weightLoss: 'Perda de peso',
    
    // Actions
    calculate: 'Calcular Resultados',
    generatePDF: 'Gerar Relatório PDF',
    reset: 'Limpar Dados',
    
    // Results
    results: 'Resultados da Avaliação',
    indicator: 'Indicador',
    zScore: 'Escore-Z',
    classification: 'Classificação',
    weightForAge: 'Peso para Idade',
    heightForAge: 'Estatura para Idade',
    weightForHeight: 'Peso para Estatura',
    bmiForAge: 'IMC para Idade',
    
    // Classifications
    'Muito baixo peso para a idade': 'Muito baixo peso para a idade',
    'Baixo peso para a idade': 'Baixo peso para a idade',
    'Peso adequado para a idade': 'Peso adequado para a idade',
    'Peso elevado para a idade': 'Peso elevado para a idade',
    'Muito baixa estatura para a idade': 'Muito baixa estatura para a idade',
    'Baixa estatura para a idade': 'Baixa estatura para a idade',
    'Estatura adequada para a idade': 'Estatura adequada para a idade',
    'Magreza acentuada': 'Magreza acentuada',
    'Magreza': 'Magreza',
    'Eutrofia': 'Eutrofia',
    'Risco de sobrepeso': 'Risco de sobrepeso',
    'Sobrepeso': 'Sobrepeso',
    'Obesidade': 'Obesidade',
    'Obesidade grave': 'Obesidade grave',
    
    // STRONGkids Risk Levels
    lowRisk: 'Baixo Risco',
    mediumRisk: 'Risco Moderado',
    highRisk: 'Alto Risco',
    
    // Validation
    required: 'Campo obrigatório',
    invalidDate: 'Data inválida',
    invalidWeight: 'Peso deve ser entre 0.5 e 200 kg',
    invalidHeight: 'Altura deve ser entre 30 e 220 cm',
    
    // Messages
    noData: 'Nenhum dado inserido',
    calculationError: 'Erro no cálculo. Verifique os dados inseridos.',
    pdfGenerated: 'Relatório PDF gerado com sucesso',
    
    // Footer
    developedBy: 'Desenvolvido para profissionais de saúde',
    version: 'Versão',
  },
  
  en: {
    // Header
    title: 'Pediatric Nutritional Screening',
    subtitle: 'Nutritional assessment system based on WHO and STRONGkids protocols',
    
    // Navigation
    toggleTheme: 'Toggle theme',
    toggleLanguage: 'Toggle language',
    
    // Child Data Form
    childData: 'Child Data',
    childName: 'Child name',
    birthDate: 'Birth date',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    weight: 'Weight (kg)',
    height: 'Height/Length (cm)',
    assessmentDate: 'Assessment date',
    
    // STRONGkids Protocol
    strongkidsTitle: 'STRONGkids Protocol (Optional)',
    strongkidsDescription: 'Nutritional risk factors assessment',
    riskFactors: 'Risk Factors',
    clinicalAssessment: 'Clinical Assessment',
    chronicDisease: 'Chronic disease',
    diarrhea: 'Diarrhea (>5 days)',
    reducedIntake: 'Reduced intake',
    surgery: 'Major surgery',
    severelyIll: 'Severely ill',
    moderatelyIll: 'Moderately ill',
    weightLoss: 'Weight loss',
    
    // Actions
    calculate: 'Calculate Results',
    generatePDF: 'Generate PDF Report',
    reset: 'Clear Data',
    
    // Results
    results: 'Assessment Results',
    indicator: 'Indicator',
    zScore: 'Z-Score',
    classification: 'Classification',
    weightForAge: 'Weight for Age',
    heightForAge: 'Height for Age',
    weightForHeight: 'Weight for Height',
    bmiForAge: 'BMI for Age',
    
    // Classifications
    'Muito baixo peso para a idade': 'Very low weight for age',
    'Baixo peso para a idade': 'Low weight for age',
    'Peso adequado para a idade': 'Adequate weight for age',
    'Peso elevado para a idade': 'High weight for age',
    'Muito baixa estatura para a idade': 'Very low height for age',
    'Baixa estatura para a idade': 'Low height for age',
    'Estatura adequada para a idade': 'Adequate height for age',
    'Magreza acentuada': 'Severe thinness',
    'Magreza': 'Thinness',
    'Eutrofia': 'Normal',
    'Risco de sobrepeso': 'Risk of overweight',
    'Sobrepeso': 'Overweight',
    'Obesidade': 'Obesity',
    'Obesidade grave': 'Severe obesity',
    
    // STRONGkids Risk Levels
    lowRisk: 'Low Risk',
    mediumRisk: 'Medium Risk',
    highRisk: 'High Risk',
    
    // Validation
    required: 'Required field',
    invalidDate: 'Invalid date',
    invalidWeight: 'Weight must be between 0.5 and 200 kg',
    invalidHeight: 'Height must be between 30 and 220 cm',
    
    // Messages
    noData: 'No data entered',
    calculationError: 'Calculation error. Please check the entered data.',
    pdfGenerated: 'PDF report generated successfully',
    
    // Footer
    developedBy: 'Developed for healthcare professionals',
    version: 'Version',
  }
};

export const getTranslation = (key: string, language: string): string => {
  const keys = key.split('.');
  let translation: any = translations[language];
  
  for (const k of keys) {
    if (translation && typeof translation === 'object') {
      translation = translation[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof translation === 'string' ? translation : key;
};
