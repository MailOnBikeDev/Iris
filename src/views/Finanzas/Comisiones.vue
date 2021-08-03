<template>
  <div class="w-full max-h-screen p-4 mt-10 bg-gray-100 rounded-xl">
    <div class="flex justify-end">
      <h1
        class="relative inline-block px-6 py-2 mb-4 text-2xl font-bold text-center bg-gray-100 text-primary rounded-xl -top-12"
      >
        Comisiones de Pedidos
      </h1>
    </div>

    <div class="overlay" v-if="showDetalle || showResumen"></div>

    <ReporteComisiones
      :showDetalle="showDetalle"
      @cerrarDetalle="showDetalle = false"
      :detalles="pedidosMobiker"
      :mobiker="currentMobiker"
    />

    <DetallePedidoComisiones
      :showResumen="showResumen"
      @cerrarResumen="closeResumen"
      :currentPedido="currentPedido"
    />

    <div class="flex flex-row mb-4 -mt-10 justify-evenly">
      <div>
        <input
          type="search"
          class="input"
          v-model="buscador"
          @keyup="searchMobiker"
          placeholder="Buscar mobiker..."
        />
      </div>

      <div class="flex flex-row">
        <datepicker
          v-model="fechaInicio"
          name="fechaInicio"
          input-class="w-24 p-2 font-bold text-center cursor-pointer rounded-l-xl focus:outline-none text-primary"
          :monday-first="true"
          :language="es"
          format="dd MMM"
          @input="buscarPorFecha"
        />
        <datepicker
          v-model="fechaFin"
          name="fechaFin"
          input-class="w-24 p-2 font-bold text-center cursor-pointer rounded-r-xl focus:outline-none text-primary"
          :monday-first="true"
          :language="es"
          format="dd MMM"
          @input="buscarPorFecha"
        />
      </div>

      <router-link
        to="/finanzas/historial-pedidos"
        class="px-6 py-2 font-bold text-white bg-indigo-600 rounded-xl focus:outline-none hover:bg-indigo-500"
        custom
        v-slot="{ navigate }"
      >
        <span @click="navigate" role="link" class="text-center cursor-pointer"
          >Volver al Historial</span
        >
      </router-link>

      <button class="refresh-btn" @click="refreshList">
        <font-awesome-icon
          class="text-white group-hover:animate-spin"
          icon="sync-alt"
        />
      </button>

      <button
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500 disabled:bg-green-900"
        @click="showDetalle = true"
        :disabled="!currentMobiker"
      >
        Enviar reporte
      </button>
    </div>

    <div class="grid grid-cols-4 gap-2">
      <div class="flex flex-row justify-center">
        <p>
          <span class="resalta">Total de Pedidos:</span>
          {{ cantidadPedidos }}
        </p>
      </div>

      <div
        class="inline-grid items-center grid-cols-6 col-span-3 text-sm font-bold text-center text-primary"
      >
        <button @click="sortPorId" class="focus:outline-none">
          <p class="font-bold"># Pedido</p>
        </button>
        <button @click="sortPorId" class="focus:outline-none">
          <p class="font-bold">Empresa</p>
        </button>
        <button @click="sortPorOrigen" class="focus:outline-none">
          <p class="font-bold">Origen</p>
        </button>
        <button @click="sortPorDestino" class="focus:outline-none">
          <p class="font-bold">Destino</p>
        </button>
        <button @click="sortPorEstado" class="focus:outline-none">
          <p class="font-bold">Estado</p>
        </button>
        <button @click="sortPorFecha" class="focus:outline-none">
          <p class="font-bold">Fecha</p>
        </button>
      </div>
      <div
        class="overflow-y-auto bg-white border border-black max-h-96 h-96 pedidos-scroll"
      >
        <Loading v-if="loading" />

        <div
          v-else
          class="grid items-center h-10 grid-cols-3 py-2 text-sm text-center border-b-2 cursor-pointer border-primary hover:bg-info"
          :class="{
            'bg-info text-white font-bold': mobiker.mobiker.id == currentIndex,
          }"
          v-for="mobiker in mobikersFiltrados"
          :key="mobiker.mobiker.id"
          @click="setActiveMobiker(mobiker.mobiker, mobiker.mobiker.id)"
        >
          <div class="col-span-2">
            {{ mobiker.mobiker.fullName }}
          </div>

          <div>
            {{ mobiker.cantidadPedidos }}
          </div>
        </div>
      </div>

      <div
        class="col-span-3 overflow-y-auto bg-white border border-black pedidos-scroll max-h-96"
      >
        <Loading v-if="loading" />
        <div
          v-else
          class="grid items-center h-auto grid-cols-6 py-4 text-xs text-center border-b-2 cursor-pointer gap-x-1 border-primary hover:bg-info"
          :class="{
            'bg-info text-white font-bold': pedido.id == currentPedidoIndex,
          }"
          v-for="pedido in pedidosMobiker"
          :key="pedido.id"
        >
          <div @click="setActivePedido(pedido, pedido.id)">
            <p>{{ pedido.id }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p>
              {{ pedido.empresaRemitente }}
            </p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p v-if="pedido.rolCliente === 'Remitente'">
              {{ pedido.distritoRemitente }}
            </p>
            <p v-else>{{ pedido.distrito.distrito }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p v-if="pedido.rolCliente === 'Remitente'">
              {{ pedido.distrito.distrito }}
            </p>
            <p v-else>{{ pedido.distritoRemitente }}</p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p v-if="pedido.status.id === 4" class="tag-entregado">
              {{ pedido.status.tag }}
            </p>
            <p v-if="pedido.status.id === 5" class="tag-falso-flete">
              {{ pedido.status.tag }}
            </p>
            <p v-if="pedido.status.id === 6" class="tag-anulado">
              {{ pedido.status.tag }}
            </p>
          </div>

          <div @click="setActivePedido(pedido, pedido.id)">
            <p>{{ $date(pedido.fecha).format("DD MMM YYYY") }}</p>
          </div>
        </div>
      </div>
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
import DetallePedidoComisiones from "@/components/DetallePedidoComisiones";
import MobikerService from "@/services/mobiker.service";
import ReporteComisiones from "@/components/ReporteComisiones";
import Loading from "@/components/Loading";
import Datepicker from "vuejs-datepicker";
import Pagination from "@/components/Pagination.vue";
import { es } from "vuejs-datepicker/dist/locale";

const seisDiasAtras = new Date().getTime() - 1000 * 60 * 60 * 24 * 6;

export default {
  name: "Comisiones",
  components: {
    ReporteComisiones,
    Datepicker,
    Pagination,
    DetallePedidoComisiones,
    Loading,
  },
  data() {
    return {
      mobikers: [],
      mobikersFiltrados: [],
      pedidosMobiker: [],
      showDetalle: false,
      showResumen: false,
      currentMobiker: null,
      currentIndex: -1,
      currentPedido: null,
      currentPedidoIndex: -1,
      fechaInicio: new Date(seisDiasAtras),
      fechaFin: new Date(),
      buscador: "",

      loading: false,

      page: 1,
      cantidadPedidos: 0,
      pageSize: 200,
      es: es,
    };
  },
  mounted() {
    this.retrieveMoBikersConPedidos();
  },
  methods: {
    getRequestParams(desde, hasta, id, page, pageSize) {
      let params = {};

      if (desde) {
        params["desde"] = desde;
      }

      if (hasta) {
        params["hasta"] = hasta;
      }

      if (id) {
        params["id"] = id;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrievePedidosMobikers() {
      const params = this.getRequestParams(
        this.$date(this.fechaInicio).format("YYYY-MM-DD"),
        this.$date(this.fechaFin).format("YYYY-MM-DD"),
        this.currentIndex,
        this.page,
        this.pageSize
      );

      MobikerService.getPedidosDelMobiker(params).then(
        (response) => {
          const { pedidos, totalPedidos } = response.data;
          this.pedidosMobiker = pedidos; // rows
          this.cantidadPedidos = totalPedidos; // count
        },
        (error) => {
          this.pedidosMobiker =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },

    async retrieveMoBikersConPedidos() {
      try {
        this.loading = true;
        const params = {
          desde: this.$date(this.fechaInicio).format("YYYY-MM-DD"),
          hasta: this.$date(this.fechaFin).format("YYYY-MM-DD"),
        };

        const response = await MobikerService.getMobikersConPedidos(params);

        this.mobikers = response.data;
        this.mobikersFiltrados = response.data;

        this.loading = false;
      } catch (error) {
        console.error(
          `Error al obtener MoBikers con Pedidos: ${error.message}`
        );
      }
    },

    buscarPorFecha() {
      this.retrieveMoBikersConPedidos();
      this.currentMobiker = null;
      this.currentIndex = -1;
      this.pedidosMobiker = [];
    },

    handlePageChange(value) {
      this.page = value;
      this.retrievePedidos();
    },

    setActiveMobiker(mobiker, index) {
      this.currentMobiker = mobiker;
      this.currentIndex = index;
      this.retrievePedidosMobikers();
    },

    async refreshList() {
      try {
        this.retrieveMoBikersConPedidos();
        this.pedidosMobiker = [];
        this.cantidadPedidos = 0;

        this.currentMobiker = null;
        this.currentIndex = -1;
      } catch (error) {
        console.error(`Error al refrescar la lista: ${error.message}`);
      }
    },

    setActivePedido(pedido, index) {
      this.currentPedido = pedido;
      this.currentPedidoIndex = index;

      this.showResumen = true;
    },

    closeResumen() {
      this.showResumen = false;

      this.currentPedido = null;
      this.currentPedidoIndex = -1;
    },

    async searchMobiker() {
      try {
        this.mobikersFiltrados = this.mobikers
          .filter((mobiker) => {
            if (
              mobiker.mobiker.fullName
                .toLowerCase()
                .includes(this.buscador.toLowerCase())
            ) {
              return mobiker;
            }
          })
          .sort((a, b) => {
            return a.mobiker.fullName.toLowerCase() >
              b.mobiker.fullName.toLowerCase()
              ? 1
              : -1;
          });

        if (this.buscador.trim() === "") {
          this.mobikersFiltrados = this.mobikers;
        }
      } catch (error) {
        console.error(`Error en el buscador de MoBikers: ${error.message}`);
      }
    },

    sortPorId() {
      this.pedidos.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    },

    sortPorOrigen() {
      this.pedidos.sort((a, b) => {
        return a.distritoRemitente.toLowerCase() >
          b.distritoRemitente.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorDestino() {
      this.pedidos.sort((a, b) => {
        return a.distrito.distrito.toLowerCase() >
          b.distrito.distrito.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorMobiker() {
      this.pedidos.sort((a, b) => {
        return a.mobiker.fullName.toLowerCase() >
          b.mobiker.fullName.toLowerCase()
          ? 1
          : -1;
      });
    },

    sortPorEstado() {
      this.pedidos.sort((a, b) => {
        return a.status.tag.toLowerCase() > b.status.tag.toLowerCase() ? 1 : -1;
      });
    },

    sortPorFecha() {
      this.pedidos.sort((a, b) => {
        return a.fecha > b.fecha ? -1 : 1;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pedidos-scroll::-webkit-scrollbar {
  width: 0.5rem;
  background: white;

  &-thumb {
    background: #52678e;
    border-radius: 1rem;
  }
}
</style>
