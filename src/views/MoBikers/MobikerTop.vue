<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        MoBikers Top
      </h1>
    </div>

    <div class="flex flex-row mb-4 -mt-10 justify-evenly">
      <div class="flex flex-row">
        <datepicker
          v-model="fechaInicio"
          name="fechaInicio"
          input-class="w-24 p-2 font-bold text-center cursor-pointer rounded-l-xl focus:outline-none text-primary"
          :monday-first="true"
          :language="es"
          format="dd MMM"
        />
        <datepicker
          v-model="fechaFin"
          name="fechaFin"
          input-class="w-24 p-2 font-bold text-center cursor-pointer focus:outline-none text-primary"
          :monday-first="true"
          :language="es"
          format="dd MMM"
        />
        <button
          type="button"
          class="px-2 py-1 font-bold bg-white rounded-r-xl hover:bg-info hover:text-white focus:outline-none text-secondary"
          @click="retrieveMoBikersConPedidos"
        >
          Buscar
        </button>
      </div>

      <div>
        <button
          v-if="reporteCopiado === false"
          class="px-4 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
          @click="copiarReporte"
        >
          Copiar reporte
        </button>

        <button
          v-else
          class="px-4 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
          @click="copiarReporte"
        >
          Copiado
        </button>
      </div>
    </div>

    <div ref="mobikersTop" class="overflow-y-auto max-h-96">
      <Loading v-if="loading" />
      <TablaMobikerTop v-else :mobikers="mobikers" />
    </div>
  </div>
</template>

<script>
import MobikerService from "@/services/mobiker.service";
import Datepicker from "vuejs-datepicker";
import { es } from "vuejs-datepicker/dist/locale";
import TablaMobikerTop from "@/components/TablaMobikerTop.vue";
import Loading from "@/components/Loading";

const primerDia = new Date();

export default {
  name: "MobikerTop",
  components: {
    Datepicker,
    TablaMobikerTop,
    Loading,
  },
  data() {
    return {
      mobikers: [],
      fechaInicio: new Date(primerDia.getFullYear(), primerDia.getMonth(), 1),
      fechaFin: new Date(),
      reporteCopiado: false,
      es: es,
      loading: false,
    };
  },
  mounted() {
    this.retrieveMoBikersConPedidos();
  },
  methods: {
    async retrieveMoBikersConPedidos() {
      try {
        this.loading = true;
        const params = {
          desde: this.$date(this.fechaInicio).format("YYYY-MM-DD"),
          hasta: this.$date(this.fechaFin).format("YYYY-MM-DD"),
        };

        const response = await MobikerService.getMobikersConPedidos(params);

        this.mobikers = response.data.sort((a, b) => {
          return b.cantidadPedidos - a.cantidadPedidos;
        });
        this.loading = false;
      } catch (error) {
        console.error(
          `Error al obtener MoBikers con Pedidos: ${error.message}`
        );
      }
    },

    copiarReporte() {
      this.$copyText(this.$refs.mobikersTop.innerText).then(() => {
        this.reporteCopiado = true;
        console.log("Texto copiado");
      });
    },
  },
};
</script>

<style></style>
