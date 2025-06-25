
'use client';

import React from 'react';
import { Header } from '@/components/header';
import { ChildDataForm } from '@/components/child-data-form';
import { STRONGkidsForm } from '@/components/strongkids-form';
import { ActionButtons } from '@/components/action-buttons';
import { ResultsDisplay } from '@/components/results-display';
import { Footer } from '@/components/footer';
import { useApp } from '@/contexts/app-context';

export default function Home() {
  const { state } = useApp();
  const { hasResults } = state;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        <div className="space-y-8">
          
          {/* Seção de entrada de dados */}
          {!hasResults && (
            <>
              <div className="space-y-8">
                <ChildDataForm />
                <STRONGkidsForm />
                <ActionButtons />
              </div>
            </>
          )}

          {/* Seção de resultados */}
          {hasResults && (
            <div className="space-y-8">
              <ResultsDisplay />
              <ActionButtons />
            </div>
          )}

          {/* Instruções de uso quando não há dados */}
          {!hasResults && Object.keys(state.childData).length === 0 && (
            <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Bem-vindo ao Sistema de Triagem Nutricional Pediátrica</h2>
                <div className="max-w-3xl mx-auto space-y-4 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">📋 Avaliação Antropométrica</h3>
                      <p className="text-sm text-muted-foreground">
                        Calcule indicadores nutricionais baseados nas tabelas de referência da OMS:
                        peso para idade, estatura para idade, peso para estatura e IMC para idade.
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">🏥 Protocolo STRONGkids</h3>
                      <p className="text-sm text-muted-foreground">
                        Triagem de risco nutricional através de fatores de risco clínicos e
                        avaliação do estado geral da criança.
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">📊 Resultados Visuais</h3>
                      <p className="text-sm text-muted-foreground">
                        Visualize os resultados com código de cores (verde/amarelo/vermelho)
                        para identificação rápida de alterações nutricionais.
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">📄 Relatório PDF</h3>
                      <p className="text-sm text-muted-foreground">
                        Gere relatórios completos em PDF com todos os dados da criança,
                        resultados dos cálculos e avaliação STRONGkids.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <h4 className="font-semibold text-blue-800 mb-2">Como usar:</h4>
                    <ol className="text-sm text-blue-700 space-y-1">
                      <li>1. Preencha os dados antropométricos da criança</li>
                      <li>2. Complete a avaliação STRONGkids (opcional)</li>
                      <li>3. Clique em "Calcular Resultados" para ver a análise</li>
                      <li>4. Gere o relatório PDF para documentação</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
