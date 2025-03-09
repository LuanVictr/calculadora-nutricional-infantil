<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex items-center justify-center p-8 min-h-screen bg-gray-100 overflow-hidden">
        <div
          class="relative flex max-w-5xl transition-transform duration-500 ease-in-out"
        >
          <FormularioIMC
            :class="{ 'translate-x-[-200px]': imc !== null }"
            @calcular="calcularIMC"
          />

          <ResultadoIMC
            v-if="imc !== null"
            :imc="imc"
            :interpretacao="interpretacaoIMC"
            @reiniciar="resetarFormulario"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import FormularioIMC from './components/FormularioIMC.vue'
import ResultadoIMC from './components/ResultadoIMC.vue'

const imc = ref(null)
const interpretacaoIMC = ref('')

const calcularIMC = ({ peso, altura }) => {
  if (peso && altura) {
    const alturaMetros = altura / 100
    imc.value = peso / (alturaMetros * alturaMetros)
    interpretacaoIMC.value = interpretarIMC(imc.value)
  }
}

const interpretarIMC = (valor) => {
  if (valor < 14) return 'Abaixo do peso'
  if (valor >= 14 && valor <= 18) return 'Peso adequado'
  return 'Acima do peso'
}

const resetarFormulario = () => {
  imc.value = null
  interpretacaoIMC.value = ''
}
</script>

<style scoped>
.q-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.translate-x-[-200px] {
  transform: translateX(-200px);
}
</style>
