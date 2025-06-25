
import jsPDF from 'jspdf';
import { Assessment } from './types';
import { getTranslation } from './translations';

export const generatePDFReport = (assessment: Assessment, language: string): void => {
  const pdf = new jsPDF();
  const t = (key: string) => getTranslation(key, language);
  
  // Configurações do PDF
  const margin = 20;
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  let yPosition = margin;
  
  // Função para adicionar texto com quebra de linha
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    if (yPosition + 10 > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    
    pdf.text(text, margin, yPosition);
    yPosition += fontSize * 0.8;
  };
  
  // Função para adicionar linha horizontal
  const addLine = () => {
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  };
  
  // Cabeçalho
  addText(t('title'), 18, true);
  addText(t('subtitle'), 12);
  addLine();
  
  // Dados da criança
  addText(t('childData'), 16, true);
  yPosition += 5;
  addText(`${t('childName')}: ${assessment.childData.name}`);
  addText(`${t('gender')}: ${t(assessment.childData.gender)}`);
  addText(`${t('birthDate')}: ${new Date(assessment.childData.birthDate).toLocaleDateString('pt-BR')}`);
  addText(`${t('weight')}: ${assessment.childData.weight} kg`);
  addText(`${t('height')}: ${assessment.childData.height} cm`);
  addText(`${t('assessmentDate')}: ${new Date(assessment.childData.assessmentDate).toLocaleDateString('pt-BR')}`);
  
  if (assessment.childData.ageMonths) {
    addText(`Idade: ${assessment.childData.ageMonths} meses`);
  }
  
  if (assessment.childData.bmi) {
    addText(`IMC: ${assessment.childData.bmi.toFixed(1)} kg/m²`);
  }
  
  yPosition += 10;
  addLine();
  
  // Resultados nutricionais
  addText(t('results'), 16, true);
  yPosition += 5;
  
  // Tabela de resultados
  const results = assessment.nutritionalResults;
  
  if (results.weightForAge) {
    addText(`${t('weightForAge')}: Z-score ${results.weightForAge.zScore}, ${results.weightForAge.classification}`);
  }
  
  addText(`${t('heightForAge')}: Z-score ${results.heightForAge.zScore}, ${results.heightForAge.classification}`);
  
  if (results.weightForHeight) {
    addText(`${t('weightForHeight')}: Z-score ${results.weightForHeight.zScore}, ${results.weightForHeight.classification}`);
  }
  
  addText(`${t('bmiForAge')}: Z-score ${results.bmiForAge.zScore}, ${results.bmiForAge.classification}`);
  
  yPosition += 10;
  addLine();
  
  // Protocolo STRONGkids
  addText(t('strongkidsTitle'), 16, true);
  yPosition += 5;
  addText(`Pontuação: ${assessment.strongkids.score}`);
  addText(`Nível de risco: ${t(assessment.strongkids.riskLevel + 'Risk')}`);
  
  yPosition += 5;
  addText('Fatores de risco avaliados:', 12, true);
  
  const riskFactors = assessment.strongkids.riskFactors;
  addText(`${t('chronicDisease')}: ${riskFactors.chronicDisease ? 'Sim' : 'Não'}`);
  addText(`${t('diarrhea')}: ${riskFactors.diarrhea ? 'Sim' : 'Não'}`);
  addText(`${t('reducedIntake')}: ${riskFactors.reducedIntake ? 'Sim' : 'Não'}`);
  addText(`${t('surgery')}: ${riskFactors.surgery ? 'Sim' : 'Não'}`);
  
  yPosition += 5;
  addText('Avaliação clínica:', 12, true);
  
  const clinicalAssessment = assessment.strongkids.clinicalAssessment;
  addText(`${t('severelyIll')}: ${clinicalAssessment.severelyIll ? 'Sim' : 'Não'}`);
  addText(`${t('moderatelyIll')}: ${clinicalAssessment.moderatelyIll ? 'Sim' : 'Não'}`);
  addText(`${t('weightLoss')}: ${clinicalAssessment.weightLoss ? 'Sim' : 'Não'}`);
  
  // Rodapé
  yPosition = pageHeight - 30;
  addLine();
  addText(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 10);
  addText(`${t('developedBy')} - ${t('version')} 1.0`, 10);
  
  // Salvar PDF
  const fileName = `avaliacao-nutricional-${assessment.childData.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};
