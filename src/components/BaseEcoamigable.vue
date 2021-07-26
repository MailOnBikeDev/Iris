<template>
  <div
    class="flex flex-col justify-center w-full h-full p-4 text-sm"
    v-if="estadisticas"
  >
    <div class="mb-2 text-center">
      <span class="resalta">CO2 Ahorrado: </span>
      <span class="select-all">{{ +estadisticas.CO2Ahorrado.toFixed(1) }}</span>
    </div>

    <div class="mb-2 text-center">
      <span class="resalta">Ruido evitado: </span>
      <span class="select-all">{{ +estadisticas.ruido.toFixed(1) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseEcoamigable",
  props: {
    estadisticas: Object,
    pedidos: Array,
  },
};
</script>
