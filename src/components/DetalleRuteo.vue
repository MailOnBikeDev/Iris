<template>
  <div
    class="absolute z-40 w-11/12 h-auto px-10 py-4 transform -translate-x-1/2 shadow-xl bg-primary top-12 left-1/2 rounded-xl"
  >
    <div class="absolute -top-4 -right-2">
      <button
        class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
        @click.prevent="cerrarResumen"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>

    <div class="flex justify-center">
      <h1
        class="inline-block px-6 pt-1 text-2xl font-bold bg-white text-primary rounded-t-xl"
      >
        Ruta
        <span class="text-red-500">{{
          currentRuta.ruta.id.split("-")[0]
        }}</span>
      </h1>
    </div>

    <InfoRuteo :infoRuta="currentRuta" />

    <div class="flex flex-row justify-around mt-6">
      <button
        class="px-6 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        @click="asignarRuteo"
      >
        Marcar para Asignar
      </button>
    </div>
  </div>
</template>

<script>
import InfoRuteo from "./InfoRuteo.vue";

export default {
  props: {
    currentRuta: {
      type: Object,
    },
  },
  components: { InfoRuteo },
  methods: {
    cerrarResumen() {
      this.$emit("cerrarResumen");
    },

    asignarRuteo() {
      this.$emit("asignarRuteo");
    },
  },
};
</script>
