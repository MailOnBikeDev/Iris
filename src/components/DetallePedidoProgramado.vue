<template>
  <div
    v-if="showDetalle"
    class="absolute z-40 w-1/2 h-auto px-10 py-4 transform -translate-x-1/2 shadow-xl bg-primary top-12 left-1/2 rounded-xl"
  >
    <div class="absolute -top-4 -right-2">
      <button
        class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
        @click.prevent="cerrarDetalle"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>

    <div class="hidden" ref="comanda">
      <MensajeComandaRuteo v-if="mensajeRuteo" :currentRuta="arrayRuteos" />
      <MensajeComanda v-else :currentPedido="currentComanda" />
    </div>

    <form class="grid grid-cols-2 p-4 bg-white gap-x-4 rounded-t-xl">
      <div>
        <label
          for="status"
          class="block mb-1 ml-1 text-sm font-bold text-primary"
          >Estado del Pedido</label
        >
        <model-list-select
          name="status"
          v-model="pedidoAsignado.statusId"
          :list="statusDelPedido"
          option-text="tag"
          option-value="id"
        />
      </div>

      <div>
        <label
          for="mobiker"
          class="block mb-1 ml-1 text-sm font-bold text-primary"
          >MoBiker</label
        >
        <model-list-select
          name="mobiker"
          v-model="pedidoAsignado.mobiker"
          placeholder="Buscar MoBiker..."
          :list="mobikersFiltrados"
          option-text="fullName"
          option-value="fullName"
        />
      </div>
    </form>

    <div class="grid grid-cols-4 my-2 font-bold text-center text-white">
      <h4>#</h4>
      <h4>Cliente</h4>
      <h4>Origen</h4>
      <h4>Destino</h4>
    </div>

    <div class="p-2 overflow-y-auto bg-white h-72">
      <div
        class="grid grid-cols-4 py-2 mb-2 text-center cursor-pointer"
        :class="{
          'bg-info text-white font-bold': pedido.id == currentComandaIdx,
          'bg-green-600 text-white font-bold': comandasEnviadas.includes(
            pedido.id
          ),
        }"
        v-for="pedido in pedidosArray"
        :key="pedido.id"
        @click="seleccionComanda(pedido, pedido.id)"
      >
        <p>
          {{ pedido.id }}
        </p>

        <p>
          {{ pedido.contactoRemitente }}
        </p>

        <p>
          {{ pedido.distritoRemitente }}
        </p>

        <p>
          {{ pedido.distrito.distrito }}
        </p>
      </div>
    </div>

    <div class="flex flex-row justify-around mt-6">
      <button
        type="button"
        @click="handleAsignarPedido"
        class="px-6 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
      >
        <span v-if="!statusAsignado">
          Asignar MoBiker
        </span>

        <span v-else>Asignado</span>
      </button>

      <button
        v-if="comandaCopiada === false"
        class="px-4 py-2 font-bold text-white bg-secondary rounded-xl focus:outline-none hover:bg-info"
        @click="copiarComanda"
      >
        Copiar
      </button>

      <button
        v-else
        class="px-4 py-2 font-bold text-white bg-green-600 rounded-xl focus:outline-none hover:bg-green-500"
        @click="copiarComanda"
      >
        Copiado
      </button>
    </div>
  </div>
</template>

<script>
import MensajeComanda from "./MensajeComanda.vue";
import MensajeComandaRuteo from "./MensajeComandaRuteo.vue";
import PedidoService from "@/services/pedido.service";
import { ModelListSelect } from "vue-search-select";
import { mapState } from "vuex";

export default {
  name: "DetallePedidoProgramado",
  props: {
    showDetalle: {
      type: Boolean,
      required: true,
    },
    pedidosArray: {
      type: Array,
    },
  },
  components: {
    ModelListSelect,
    MensajeComanda,
    MensajeComandaRuteo,
  },
  data() {
    return {
      pedidoAsignado: {
        statusId: 1,
        mobiker: "Asignar MoBiker",
        comision: 0,
      },
      statusAsignado: false,
      comandaCopiada: false,
      currentComanda: null,
      currentComandaIdx: -1,
      comandasEnviadas: [],
      arrayRuteos: [],
      mensajeRuteo: false,
    };
  },
  computed: {
    ...mapState("mobikers", ["mobikers"]),
    ...mapState("auxiliares", ["statusDelPedido"]),
  },
  async mounted() {
    this.mobikersFiltrados = this.mobikers.filter(
      (mobiker) => mobiker.status === "Activo"
    );
  },
  watch: {
    "pedidoAsignado.mobiker": function() {
      if (this.pedidoAsignado.mobiker === "Asignar MoBiker") {
        this.pedidoAsignado.statusId = 1;
      } else {
        this.pedidoAsignado.statusId = 2;
      }
    },
    "pedidoAsignado.statusId": function() {
      if (this.pedidoAsignado.statusId === 1) {
        this.pedidoAsignado.mobiker = "Asignar MoBiker";
      }
    },
    showDetalle: function() {
      if (this.showDetalle && this.pedidosArray.length === 1) {
        this.pedidoAsignado.mobiker = this.pedidosArray[0].mobiker.fullName;
      }
      if (
        this.pedidosArray[0].mobiker.fullName ===
        this.pedidosArray[1].mobiker.fullName
      ) {
        this.pedidoAsignado.mobiker = this.pedidosArray[0].mobiker.fullName;
      }
    },
  },
  methods: {
    handleAsignarPedido() {
      try {
        const mobikerAsignado = this.mobikers.filter(
          (mobiker) => mobiker.fullName === this.pedidoAsignado.mobiker
        );

        this.pedidosArray.forEach(async (pedido) => {
          this.pedidoAsignado.comision = +(
            parseFloat(pedido.tarifa) *
            parseFloat(mobikerAsignado[0].rango.comision)
          ).toFixed(2);

          const response = await PedidoService.asignarPedido(
            pedido.id,
            this.pedidoAsignado
          );

          console.log(`Respuesta de la asignación: ${response.data.message}`);

          if (
            this.pedidoAsignado.statusId !== 1 &&
            this.pedidoAsignado.mobiker !== "Asignar MoBiker"
          ) {
            this.statusAsignado = true;
          } else {
            this.statusAsignado = false;
          }
        });
      } catch (error) {
        console.error(`Error al asignar Pedidos: ${error.message}`);
      }
    },

    seleccionComanda(comanda, index) {
      this.currentComanda = comanda;
      this.currentComandaIdx = index;
      this.comandaCopiada = false;

      if (comanda.isRuteo) {
        this.arrayRuteos = this.pedidosArray.filter(
          (pedido) => comanda.ruteoId === pedido.ruteoId
        );
        this.mensajeRuteo = true;
      }
    },

    copiarComanda() {
      console.log(this.$refs.comanda.innerText);
      this.$copyText(this.$refs.comanda.innerText).then(() => {
        this.comandaCopiada = true;
        console.log("Texto copiado");
        if (this.mensajeRuteo) {
          let ruteos = this.arrayRuteos.map((pedido) => pedido.id);
          this.comandasEnviadas = [...this.comandasEnviadas, ...ruteos];
        } else {
          this.comandasEnviadas.push(this.currentComandaIdx);
        }
      });
    },

    cerrarDetalle() {
      this.$emit("cerrarDetalle");
      this.comandaCopiada = false;
      this.statusAsignado = false;
      this.pedidoAsignado.statusId = 1;
      this.comandasEnviadas.length = 0;
      this.pedidoAsignado.mobiker = "Asignar MoBiker";

      this.refresh();
    },

    refresh() {
      this.$emit("refresh");
    },
  },
};
</script>
