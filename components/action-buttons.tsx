
'use client';

import React from 'react';
import { Calculator, FileText, RotateCcw, Loader2 } from 'lucide-react';
import { useApp } from '@/contexts/app-context';
import { getTranslation } from '@/lib/translations';
import { calculateNutritionalIndicators, calculateAgeInMonths, calculateBMI } from '@/lib/who-calculations';
import { generatePDFReport } from '@/lib/pdf-generator';
import { generateId } from '@/lib/storage';
import { Assessment } from '@/lib/types';

export const ActionButtons: React.FC = () => {
  const { state, dispatch } = useApp();
  const { childData, strongkidsData, nutritionalResults, isCalculating, settings } = state;
  const t = (key: string) => getTranslation(key, settings.language);

  const isFormValid = () => {
    return (
      childData.name &&
      childData.birthDate &&
      childData.gender &&
      childData.weight &&
      childData.height &&
      childData.assessmentDate
    );
  };

  const handleCalculate = async () => {
    if (!isFormValid()) {
      // Adicionar validação visual aqui se necessário
      return;
    }

    dispatch({ type: 'SET_CALCULATING', payload: true });
    dispatch({ type: 'CLEAR_ALL_ERRORS' });

    try {
      // Calcular idade e IMC
      const ageMonths = calculateAgeInMonths(childData.birthDate!, childData.assessmentDate!);
      const bmi = calculateBMI(childData.weight!, childData.height!);

      // Atualizar dados da criança com valores calculados
      dispatch({
        type: 'UPDATE_CHILD_DATA',
        payload: {
          ageMonths,
          bmi,
        },
      });

      // Simular um pequeno delay para melhor UX
      await new Promise(resolve => setTimeout(resolve, 500));

      // Calcular indicadores nutricionais
      const results = calculateNutritionalIndicators({
        ...childData,
        ageMonths,
        bmi,
      } as any);

      dispatch({ type: 'SET_NUTRITIONAL_RESULTS', payload: results });
      
    } catch (error) {
      console.error('Erro no cálculo:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: { field: 'calculation', message: t('calculationError') } 
      });
    } finally {
      dispatch({ type: 'SET_CALCULATING', payload: false });
    }
  };

  const handleGeneratePDF = () => {
    if (!nutritionalResults || !isFormValid()) return;

    try {
      const assessment: Assessment = {
        id: generateId(),
        childData: {
          ...childData,
          ageMonths: childData.ageMonths || calculateAgeInMonths(childData.birthDate!, childData.assessmentDate!),
          bmi: childData.bmi || calculateBMI(childData.weight!, childData.height!),
        } as any,
        nutritionalResults,
        strongkids: strongkidsData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      generatePDFReport(assessment, settings.language);
      
      // Opcional: mostrar mensagem de sucesso
      console.log(t('pdfGenerated'));
      
    } catch (error) {
      console.error('Erro na geração do PDF:', error);
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Botão Calcular */}
        <button
          onClick={handleCalculate}
          disabled={!isFormValid() || isCalculating}
          className="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Calculando...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-5 w-5" />
              {t('calculate')}
            </>
          )}
        </button>

        {/* Botão Gerar PDF */}
        <button
          onClick={handleGeneratePDF}
          disabled={!nutritionalResults || !isFormValid()}
          className="flex-1 inline-flex items-center justify-center rounded-md bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <FileText className="mr-2 h-5 w-5" />
          {t('generatePDF')}
        </button>

        {/* Botão Reset */}
        <button
          onClick={handleReset}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <RotateCcw className="h-5 w-5" />
          <span className="sr-only">{t('reset')}</span>
        </button>
      </div>

      {/* Mensagens de erro */}
      {state.errors.calculation && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{state.errors.calculation}</p>
        </div>
      )}
    </div>
  );
};
