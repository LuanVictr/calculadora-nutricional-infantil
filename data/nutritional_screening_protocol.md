# Protocolo de Triagem Nutricional Pediátrica

## Resumo Executivo

Este documento contém as informações extraídas do PDF "Classificação Estado Nutricional de Crianças" para desenvolvimento de uma aplicação web de triagem nutricional pediátrica. O documento fonte contém principalmente as tabelas de referência da OMS para cálculo de escore-z, mas não inclui informações específicas sobre o protocolo STRONGkids.

## 1. Classificação do Estado Nutricional - Escore-Z

### 1.1 Valores Críticos dos Índices Antropométricos

A classificação nutricional é baseada nos escores-z calculados a partir das tabelas de referência da OMS (2007), com os seguintes pontos de corte:

#### Para Crianças de 0 a 5 anos incompletos:

| Escore-z | Peso para Idade | Peso para Estatura | IMC para Idade | Estatura para Idade |
|----------|-----------------|-------------------|----------------|-------------------|
| < -3 | Muito baixo peso para a idade | Magreza acentuada | Magreza acentuada | Muito baixa estatura para a idade |
| ≥ -3 e < -2 | Baixo peso para a idade | Magreza | Magreza | Baixa estatura para a idade |
| ≥ -2 e < -1 | Peso adequado para a idade | Eutrofia | Eutrofia | Estatura adequada para a idade |
| ≥ -1 e < +1 | Peso adequado para a idade | Eutrofia | Eutrofia | Estatura adequada para a idade |
| ≥ +1 e < +2 | Peso adequado para a idade | Risco de sobrepeso | Risco de sobrepeso | Estatura adequada para a idade |
| ≥ +2 e < +3 | Peso elevado para a idade | Sobrepeso | Sobrepeso | Estatura adequada para a idade |
| ≥ +3 | Peso elevado para a idade | Obesidade | Obesidade | Estatura adequada para a idade |

#### Para Crianças de 5 a 10 anos incompletos:

| Escore-z | Peso para Idade | IMC para Idade | Estatura para Idade |
|----------|-----------------|----------------|-------------------|
| < -3 | Muito baixo peso para a idade | Magreza acentuada | Muito baixa estatura para a idade |
| ≥ -3 e < -2 | Baixo peso para a idade | Magreza | Baixa estatura para a idade |
| ≥ -2 e < -1 | Peso adequado para a idade | Eutrofia | Estatura adequada para a idade |
| ≥ -1 e < +1 | Peso adequado para a idade | Eutrofia | Estatura adequada para a idade |
| ≥ +1 e < +2 | Peso adequado para a idade | Sobrepeso | Estatura adequada para a idade |
| ≥ +2 e < +3 | Peso elevado para a idade | Obesidade | Estatura adequada para a idade |
| ≥ +3 | Peso elevado para a idade | Obesidade grave | Estatura adequada para a idade |

#### Para Adolescentes de 10 a 19 anos incompletos:

| Escore-z | IMC para Idade | Estatura para Idade |
|----------|----------------|-------------------|
| < -3 | Magreza | Baixa estatura para a idade |
| ≥ -3 e < -2 | Magreza | Baixa estatura para a idade |
| ≥ -2 e < -1 | Eutrofia | Estatura adequada para a idade |
| ≥ -1 e < +1 | Eutrofia | Estatura adequada para a idade |
| ≥ +1 e < +2 | Sobrepeso | Estatura adequada para a idade |
| ≥ +2 e < +3 | Obesidade | Estatura adequada para a idade |
| ≥ +3 | Obesidade grave | Estatura adequada para a idade |

## 2. Tabelas de Referência da OMS

O documento contém as seguintes tabelas de referência para cálculo de escore-z:

### 2.1 Peso para Idade
- Meninos de 0 a 5 anos (0-60 meses)
- Meninas de 0 a 5 anos (0-60 meses)
- Meninos de 5 a 10 anos (61-120 meses)
- Meninas de 5 a 10 anos (61-120 meses)

### 2.2 IMC para Idade
- Meninos de 0 a 2 anos (0-24 meses)
- Meninas de 0 a 2 anos (0-24 meses)
- Meninos de 2 a 5 anos (24-60 meses)
- Meninas de 2 a 5 anos (24-60 meses)
- Meninos de 5 a 19 anos (61-228 meses)
- Meninas de 5 a 19 anos (61-228 meses)

### 2.3 Estatura/Comprimento para Idade
- Comprimento para meninos de 0 a 2 anos (0-24 meses)
- Comprimento para meninas de 0 a 2 anos (0-24 meses)
- Estatura para meninos de 2 a 5 anos (24-60 meses)
- Estatura para meninas de 2 a 5 anos (24-60 meses)
- Estatura para meninos de 5 a 19 anos (61-228 meses)
- Estatura para meninas de 5 a 19 anos (61-228 meses)

### 2.4 Peso para Estatura/Comprimento
- Peso para comprimento para meninos (45-110 cm)
- Peso para comprimento para meninas (45-110 cm)
- Peso para estatura para meninos (65-120 cm)
- Peso para estatura para meninas (65-120 cm)

## 3. Metodologia de Cálculo do Escore-Z

### 3.1 Fórmula do Escore-Z
```
Escore-Z = (Valor observado - Valor mediano da referência) / Desvio padrão da referência
```

### 3.2 Processo de Cálculo
1. **Determinar a idade exata** da criança em meses completos
2. **Identificar o sexo** para selecionar a tabela apropriada
3. **Localizar os valores de referência** na tabela correspondente
4. **Calcular o escore-z** usando a fórmula apropriada
5. **Classificar o estado nutricional** baseado nos pontos de corte

### 3.3 Considerações Especiais
- Para crianças menores de 2 anos, usar comprimento (deitado)
- Para crianças de 2 anos ou mais, usar estatura (em pé)
- A idade deve ser calculada em meses completos
- Usar sempre as tabelas específicas por sexo

## 4. Interpretação dos Resultados

### 4.1 Indicadores Principais
- **Peso para Idade (P/I)**: Indicador global de desnutrição
- **Estatura para Idade (E/I)**: Indicador de desnutrição crônica (stunting)
- **Peso para Estatura (P/E)**: Indicador de desnutrição aguda (wasting)
- **IMC para Idade**: Indicador de sobrepeso e obesidade

### 4.2 Sinais de Alerta Nutricional
- Escore-z < -2 em qualquer indicador
- Escore-z > +2 para IMC (sobrepeso/obesidade)
- Múltiplos indicadores alterados
- Tendência de declínio nos escores ao longo do tempo

## 5. Protocolo STRONGkids

**NOTA IMPORTANTE**: O documento analisado não contém informações específicas sobre o protocolo STRONGkids. Para implementar este protocolo na aplicação web, será necessário obter informações adicionais sobre:

- Fatores de risco avaliados
- Sistema de pontuação
- Classificação de risco nutricional
- Critérios de triagem
- Recomendações de seguimento

### 5.1 Informações Necessárias (a serem obtidas)
- [ ] Questionário STRONGkids completo
- [ ] Sistema de pontuação
- [ ] Interpretação dos resultados
- [ ] Algoritmo de decisão clínica
- [ ] Recomendações de intervenção

## 6. Implementação na Aplicação Web

### 6.1 Funcionalidades Principais
1. **Entrada de Dados**
   - Data de nascimento
   - Sexo
   - Peso atual
   - Estatura/comprimento atual
   - Data da avaliação

2. **Cálculos Automáticos**
   - Idade em meses
   - IMC
   - Escores-z para todos os indicadores
   - Classificação nutricional

3. **Apresentação de Resultados**
   - Tabela com todos os indicadores
   - Classificação por cores (verde/amarelo/vermelho)
   - Gráficos de crescimento
   - Recomendações baseadas nos resultados

### 6.2 Validações Necessárias
- Verificar se a idade está dentro dos limites das tabelas
- Validar se peso e estatura são valores plausíveis
- Alertar para valores extremos
- Verificar consistência entre os indicadores

## 7. Referências

- Organização Mundial da Saúde (OMS), 2007
- Tabelas de referência de crescimento infantil da OMS
- Documento fonte: "Classificação Estado Nutricional de Crianças PDF.pdf"

## 8. Observações para Desenvolvimento

### 8.1 Estrutura de Dados
As tabelas de referência devem ser armazenadas em formato JSON ou banco de dados para consulta rápida pela aplicação.

### 8.2 Algoritmo de Interpolação
Para idades que não estão exatamente nas tabelas, pode ser necessário implementar interpolação linear entre os valores mais próximos.

### 8.3 Interface do Usuário
- Formulário intuitivo para entrada de dados
- Visualização clara dos resultados
- Gráficos de crescimento interativos
- Relatórios imprimíveis

---

**Data de criação**: 23 de junho de 2025
**Fonte**: Análise do documento "Classificação Estado Nutricional de Crianças PDF.pdf"
**Status**: Documento base criado - Necessário complementar com informações do protocolo STRONGkids
