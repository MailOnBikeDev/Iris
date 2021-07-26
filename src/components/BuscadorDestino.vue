<template>
  <div
    v-if="showBuscadorDestinos"
    class="absolute z-40 w-1/2 p-8 py-10 transform -translate-x-1/2 shadow-xl bg-primary top-12 left-1/2 rounded-xl"
  >
    <div class="absolute -top-4 -right-2">
      <button
        class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
        @click.prevent="cerrarBuscador"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>

    <div class="flex flex-row justify-center">
      <input
        type="search"
        class="input"
        v-model="buscador"
        @keyup.enter="searchDestino"
        placeholder="Buscar contacto o empresa..."
        autofocus
      />
    </div>

    <div class="h-56 mt-6 overflow-y-auto bg-white">
      <div
        class="grid items-center grid-cols-3 py-2 text-sm text-center bg-white border-b-2 cursor-default hover:bg-info border-primary"
        :class="{ 'bg-info': destino.id == currentIndex }"
        v-for="destino in destinosFiltrados"
        :key="destino.id"
        @click="setActiveDestino(destino, destino.id)"
      >
        <div class="col-span-1">
          <p>
            {{ destino.empresa }}
          </p>
        </div>
        <div class="col-span-1">
          <p>
            {{ destino.contacto }}
          </p>
        </div>
        <div>
          <p>
            {{ destino.distrito.distrito }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <button
        class="px-4 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        @click.prevent="enviarDestino"
      >
        Capturar Destino
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DestinoService from "@/services/destino.service";

export default {
  name: "BuscadorDestino",
  props: {
    showBuscadorDestinos: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      buscador: "",
      destinosFiltrados: [],
      currentDestino: null,
      currentIndex: -1,
    };
  },
  mounted() {
    this.destinosFiltrados = this.destinos;
  },
  computed: {
    ...mapState("destinos", ["destinos"]),
  },
  methods: {
    async searchDestino() {
      try {
        this.destinosFiltrados = await DestinoService.searchDestinos(
          this.buscador
        );

        if (this.buscador.trim() === "") {
          this.destinosFiltrados = this.destinos;
        }
      } catch (error) {
        console.error(`Error en el buscador de Destinos: ${error.message}`);
      }
    },

    setActiveDestino(destino, index) {
      this.currentDestino = destino;
      this.currentIndex = index;
    },

    cerrarBuscador() {
      this.$emit("cerrarBuscador");
    },

    enviarDestino() {
      this.$emit("activarDestino", this.currentDestino);
      this.$emit("cerrarBuscador");
    },
  },
};
</script>
