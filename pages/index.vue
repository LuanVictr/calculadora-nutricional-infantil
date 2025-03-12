<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page
        class="flex items-center justify-center p-8 min-h-screen bg-gray-100 overflow-hidden"
      >
        <div
          class="relative flex max-w-5xl transition-transform duration-500 ease-in-out"
          v-if="!isMobile"
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

        <div v-else>
          <FormularioIMC @calcular="calcularIMC" />
          <Teleport to="body">
            <div v-if="mostrarModal" class="modal-overlay">
              <div class="modal-content">
                <q-card class="p-8 shadow-2xl rounded-2xl bg-white text-center">
                  <q-card-section>
                    <h2 class="text-3xl font-bold mb-4">Resultado</h2>
                    <p class="text-4xl font-semibold text-blue-500">
                      IMC: {{ imc.toFixed(2) }}
                    </p>
                    <p class="text-lg mt-2 text-gray-700">
                      {{ interpretacaoIMC }}
                    </p>
                    <q-btn
                      label="Calcular Outro"
                      color="secondary"
                      class="mt-6"
                      @click="resetarFormulario"
                    />
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </Teleport>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import FormularioIMC from "./components/FormularioIMC.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const imc = ref(null);
const interpretacaoIMC = ref("");
const mostrarModal = ref(false);
const isMobile = computed(() => $q.platform.is.mobile);

const calcularIMC = async ({ peso, altura }) => {
  if (peso && altura) {
    const alturaMetros = altura / 100;
    imc.value = peso / (alturaMetros * alturaMetros);
    interpretacaoIMC.value = interpretarIMC(imc.value);

    if (isMobile.value) {
      await nextTick();
      mostrarModal.value = true;
    }
  }
};

const interpretarIMC = (valor) => {
  if (valor < 14) return "Abaixo do peso";
  if (valor >= 14 && valor <= 18) return "Peso adequado";
  return "Acima do peso";
};

const resetarFormulario = () => {
  imc.value = null;
  interpretacaoIMC.value = "";
  mostrarModal.value = false;
};
</script>

<style scoped>
.q-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.translate-x-[-200px] {
  transform: translateX(-200px);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90vw;
  max-width: 400px;
  text-align: center;
}
</style>
