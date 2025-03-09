<template>
    <q-card
      class="absolute w-full p-8 shadow-2xl rounded-2xl bg-white transition-opacity duration-500 ml-72"
    >
      <q-card-section class="text-center">
        <h2 class="text-3xl font-bold mb-4">Resultado</h2>
        <p class="text-4xl font-semibold text-blue-500">IMC: {{ imc.toFixed(2) }}</p>
        <p class="text-lg mt-2 text-gray-700">{{ interpretacao }}</p>
        <q-btn
          label="Calcular Outro"
          color="secondary"
          class="mt-6"
          @click="$emit('reiniciar')"
        />
      </q-card-section>
    </q-card>
  </template>
  
  <script setup>
  defineProps({
    imc: Number,
    interpretacao: String
  })
  </script>
  