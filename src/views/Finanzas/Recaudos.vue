<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Recaudos
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
          @click="retrievePedidos"
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

    <div ref="recaudos" class="my-4 overflow-y-auto max-h-96">
      <Loading v-if="loading" />
      <TablaRecaudos v-else :pedidos="pedidos" />
    </div>

    <Pagination
      :page="page"
      :cantidadItems="cantidadPedidos"
      :pageSize="pageSize"
      @prevPageChange="
        page--;
        retrievePedidos();
      "
      @nextPageChange="
        page++;
        retrievePedidos();
      "
      @handlePageChange="handlePageChange"
    />
  </div>
</template>

<script>
import PedidoService from "@/services/pedido.service";
import Datepicker from "vuejs-datepicker";
import { es } from "vuejs-datepicker/dist/locale";
import Pagination from "@/components/Pagination.vue";
import Loading from "@/components/Loading";
import TablaRecaudos from "@/components/TablaRecaudos.vue";

const seisDiasAtras = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;

export default {
  name: "Recaudos",
  components: {
    Datepicker,
    Pagination,
    TablaRecaudos,
    Loading,
  },
  data() {
    return {
      pedidos: [],
      fechaInicio: new Date(seisDiasAtras),
      fechaFin: new Date(),
      reporteCopiado: false,

      loading: false,

      page: 1,
      cantidadPedidos: 0,
      pageSize: 200,
      es: es,
    };
  },
  mounted() {
    this.retrievePedidos();
  },
  methods: {
    getRequestParams(desde, hasta, page, pageSize) {
      let params = {};

      if (desde) {
        params["desde"] = desde;
      }

      if (hasta) {
        params["hasta"] = hasta;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    async retrievePedidos() {
      try {
        this.loading = true;
        this.reporteCopiado = false;

        const params = this.getRequestParams(
          this.$date(this.fechaInicio).format("YYYY-MM-DD"),
          this.$date(this.fechaFin).format("YYYY-MM-DD"),
          this.page,
          this.pageSize
        );

        const response = await PedidoService.getPedidosRecaudo(params);
        const { pedidos, totalPedidos } = response.data;
        this.pedidos = pedidos; // rows
        this.cantidadPedidos = totalPedidos; // count

        this.loading = false;
      } catch (error) {
        console.error(`Error al obtener Pedidos. ${error.message}`);
      }
    },

    handlePageChange(value) {
      this.page = value;
      this.retrievePedidos();
    },

    copiarReporte() {
      this.$copyText(this.$refs.recaudos.innerText).then(() => {
        this.reporteCopiado = true;
        console.log("Texto copiado");
      });
    },
  },
};
</script>
