<template>
    <q-card
      class="w-full max-w-md p-6 shadow-2xl rounded-2xl bg-white transition-transform duration-500"
    >
      <q-card-section>
        <h1 class="text-2xl font-bold text-center mb-4">Calculadora Nutricional Infantil</h1>
        <p class="text-sm text-center text-gray-600 mb-4">
          Informe os dados para calcular o IMC.
        </p>
  
        <q-select
          v-model="genero"
          :options="['Masculino', 'Feminino']"
          label="Gênero"
          outlined
          class="mb-4"
        />
  
        <div class="flex gap-2 mb-4">
          <q-input
            v-model="idade"
            :label="`Idade (${unidadeIdade})`"
            type="number"
            outlined
            class="flex-1"
          />
          <q-select
            v-model="unidadeIdade"
            :options="['anos', 'meses']"
            outlined
            class="w-1/3"
          />
        </div>
  
        <q-input
          v-model="peso"
          label="Peso (kg)"
          type="number"
          outlined
          class="mb-4"
        />
        <q-input
          v-model="altura"
          label="Altura (cm)"
          type="number"
          outlined
          class="mb-4"
        />
        <q-btn
          label="Calcular"
          color="primary"
          class="w-full mt-2"
          @click="emitirCalculo"
        />
      </q-card-section>
    </q-card>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  const emit = defineEmits(['calcular'])
  
  const genero = ref(null)
  const idade = ref(null)
  const unidadeIdade = ref('anos')
  const peso = ref(null)
  const altura = ref(null)
  
  watch(unidadeIdade, () => {
    idade.value = null
  })
  
  const emitirCalculo = () => {
    emit('calcular', { peso: peso.value, altura: altura.value })
  }
  </script>
  