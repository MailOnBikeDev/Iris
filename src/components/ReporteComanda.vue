<template>
  <div
    v-if="showComanda"
    class="absolute z-40 w-1/2 px-10 py-4 transform -translate-x-1/2 shadow-xl bg-primary top-12 left-1/2 rounded-xl"
  >
    <div class="absolute -top-4 -right-2">
      <button
        class="px-2 text-2xl text-white rounded-full bg-info hover:bg-secondary focus:outline-none"
        @click.prevent="cerrarComanda"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>

    <div class="flex justify-center">
      <h1
        class="inline-block px-6 pt-1 text-2xl font-bold bg-white text-primary rounded-t-xl"
      >
        Pedido #<span class="text-red-500">{{ currentPedido.id }}</span>
      </h1>
    </div>

    <div class="justify-center bg-white rounded-xl">
      <!-- Texto formateado como mensaje de Telegram a copiar -->
      <div class="hidden" ref="comanda">
        <MensajeComanda :currentPedido="currentPedido" />
      </div>

      <!-- Texto de ejemplo para que el operador confirme la comanda -->
      <!-- Caso en que el Cliente sea Remitente -->
      <div v-if="currentPedido.rolCliente === 'Remitente'" class="p-4">
        <div>
          <span class="resalta">Tipo Envío: </span
          >{{ formatearTipoEnvio(currentPedido.tipoDeEnvio.tipo) }}
        </div>
        <div>
          <span class="resalta">
            Origen:
          </span>
          {{ currentPedido.direccionRemitente }} -
          {{ currentPedido.distritoRemitente }}
        </div>
        <div>
          <span class="resalta">Empresa: </span
          >{{ currentPedido.empresaRemitente }}
        </div>
        <div>
          <span class="resalta">
            Contacto:
          </span>
          {{ currentPedido.contactoRemitente }} -
          {{ currentPedido.telefonoRemitente }}
        </div>
        <div v-if="currentPedido.otroDatoRemitente !== null">
          <span class="resalta">IMPORTANTE: </span
          >{{ currentPedido.otroDatoRemitente }}
        </div>
        <br />
        <div>
          <span class="resalta"> Destino: </span
          >{{ currentPedido.direccionConsignado }} -

          {{ currentPedido.distrito.distrito }}
        </div>
        <div>
          <span class="resalta">Contacto: </span>
          {{ currentPedido.contactoConsignado }}
        </div>
        <div v-if="currentPedido.empresaConsignado !== null">
          <span class="resalta">Empresa: </span>
          {{ currentPedido.empresaConsignado }}
        </div>
        <div>
          <span class="resalta">Teléfono: </span>
          {{ currentPedido.telefonoConsignado }}
        </div>
        <div>
          <span class="resalta">Llevar: </span> {{ currentPedido.tipoCarga }}
        </div>
        <div>
          <span class="resalta">Modalidad: </span>
          {{ currentPedido.modalidad.tipo }}
        </div>
        <div v-if="currentPedido.otroDatoConsignado !== null">
          <span class="resalta">IMPORTANTE: </span
          >{{ currentPedido.otroDatoConsignado }}
        </div>
        <div>
          <span class="resalta">Recaudo: </span>
          S/. {{ currentPedido.recaudo }}
        </div>
        <br />
        <div>
          <span class="resalta">Tarifa: </span> S/. {{ currentPedido.tarifa }} -
          {{ formatearFormaPago(currentPedido.formaPago) }}
        </div>
        <div>
          <span class="resalta">Mi comisión: </span> S/.
          {{ currentPedido.comision }}
        </div>
        <div><span class="resalta">Pedido: </span> #{{ currentPedido.id }}</div>
        <div>
          <span class="resalta">CO2: </span>
          {{ +currentPedido.CO2Ahorrado.toFixed(1) }} Kg
        </div>
        <div>
          <span class="resalta">Horas de Ruido: </span>
          {{ +currentPedido.ruido.toFixed(1) }} h
        </div>
      </div>

      <!-- Caso el Cliente es Destinatario -->
      <div v-else class="p-4">
        <div>
          <span class="resalta">Tipo Envío: </span
          >{{ formatearTipoEnvio(currentPedido.tipoDeEnvio.tipo) }}
        </div>
        <div>
          <span class="resalta">
            Origen:
          </span>
          {{ currentPedido.direccionConsignado }} -
          {{ currentPedido.distrito.distrito }}
        </div>
        <div>
          <span class="resalta">Empresa: </span
          >{{ currentPedido.empresaConsignado }}
        </div>
        <div>
          <span class="resalta">
            Contacto:
          </span>
          {{ currentPedido.contactoConsignado }} -
          {{ currentPedido.telefonoConsignado }}
        </div>
        <div v-if="currentPedido.otroDatoConsignado !== null">
          <span class="resalta">IMPORTANTE: </span
          >{{ currentPedido.otroDatoConsignado }}
        </div>
        <br />
        <div>
          <span class="resalta"> Destino: </span
          >{{ currentPedido.direccionRemitente }} -

          {{ currentPedido.distritoRemitente }}
        </div>
        <div>
          <span class="resalta">Contacto: </span>
          {{ currentPedido.contactoRemitente }}
        </div>
        <div v-if="currentPedido.empresaRemitente !== null">
          <span class="resalta">Empresa: </span>
          {{ currentPedido.empresaRemitente }}
        </div>
        <div>
          <span class="resalta">Teléfono: </span>
          {{ currentPedido.telefonoRemitente }}
        </div>
        <div>
          <span class="resalta">Llevar: </span> {{ currentPedido.tipoCarga }}
        </div>
        <div>
          <span class="resalta">Modalidad: </span>
          {{ currentPedido.modalidad.tipo }}
        </div>
        <div v-if="currentPedido.otroDatoRemitente !== null">
          <span class="resalta">IMPORTANTE: </span
          >{{ currentPedido.otroDatoRemitente }}
        </div>
        <div>
          <span class="resalta">Recaudo: </span>
          S/. {{ currentPedido.recaudo }}
        </div>
        <br />
        <div>
          <span class="resalta">Tarifa: </span> S/. {{ currentPedido.tarifa }} -
          {{ formatearFormaPago(currentPedido.formaPago) }}
        </div>
        <div>
          <span class="resalta">Mi comisión: </span> S/.
          {{ currentPedido.comision }}
        </div>
        <div><span class="resalta">Pedido: </span> #{{ currentPedido.id }}</div>
        <div>
          <span class="resalta">CO2: </span> {{ currentPedido.CO2Ahorrado }} Kg
        </div>
        <div>
          <span class="resalta">Horas de Ruido: </span>
          {{ currentPedido.ruido }} h
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-4">
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

export default {
  name: "ReporteComanda",
  components: { MensajeComanda },
  props: {
    showComanda: {
      type: Boolean,
      required: true,
    },
    currentPedido: {
      type: Object,
    },
  },
  data() {
    return {
      comandaCopiada: false,
    };
  },
  methods: {
    cerrarComanda() {
      this.comandaCopiada = false;
      this.$emit("cerrarComanda");
    },

    copiarComanda() {
      console.log(this.$refs.comanda.innerText);
      this.$copyText(this.$refs.comanda.innerText).then(() => {
        this.comandaCopiada = true;
        console.log("Texto copiado");
      });
    },

    formatearFormaPago(pago) {
      let nuevaFormaPago;

      let compararPago = pago.split(" ")[0];

      if (compararPago === "Crédito") {
        nuevaFormaPago = "Crédito";
      } else {
        nuevaFormaPago = pago;
      }

      return nuevaFormaPago;
    },

    formatearTipoEnvio(envio) {
      let nuevoTipoEnvio;

      if (envio === "EmpresaG" || envio === "Persona") {
        nuevoTipoEnvio = "Express";
      } else {
        nuevoTipoEnvio = envio;
      }

      return nuevoTipoEnvio;
    },
  },
};
</script>
