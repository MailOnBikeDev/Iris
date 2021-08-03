<template>
  <div>
    <div class="flex flex-col text-xs max-h-96" v-if="currentRuta">
      <p class="mb-2">
        <span class="resalta">Contacto: </span>
        {{ currentRuta[0].contactoRemitente }}
      </p>
      <p class="mb-2">
        <span class="resalta">Empresa: </span
        >{{ currentRuta[0].empresaRemitente }}
      </p>
      <p class="mb-2">
        <span class="resalta">Dirección: </span
        >{{ currentRuta[0].direccionRemitente }}
      </p>
      <p class="mb-2">
        <span class="resalta">Distrito: </span
        >{{ currentRuta[0].distritoRemitente }}
      </p>
      <p class="mb-2">
        <span class="resalta">Teléfono: </span
        >{{ currentRuta[0].telefonoRemitente }}
      </p>
      <p class="mb-2">
        <span class="resalta">Observaciones: </span
        >{{ currentRuta[0].otroDatoRemitente }}
      </p>
      <p class="mb-2">
        <span class="resalta">Forma de Pago: </span
        >{{ currentRuta[0].formaPago }}
      </p>
      <p class="mb-2">
        <span class="resalta">Tarifa Total: </span>S/.
        {{ totalTarifa(currentRuta) }}
      </p>
      <p class="mb-2">
        <span class="resalta">Recaudo Total: </span>S/.
        {{ totalRecaudo(currentRuta) }}
      </p>
      <p class="mb-2">
        <span class="resalta">Tramite Total: </span>S/.
        {{ totalTramite(currentRuta) }}
      </p>
      <p class="mb-2"><span class="resalta">Modalidad: </span> Ruteo</p>
      <p class="mb-2">
        <span class="resalta">Rol: </span>{{ currentRuta[0].rolCliente }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentRuta: {
      type: Array,
    },
  },
  methods: {
    totalTarifa(pedidos) {
      let total = pedidos.reduce((acc, tarifa) => +tarifa.tarifa + acc, 0);

      return total;
    },

    totalRecaudo(pedidos) {
      let total = pedidos.reduce((acc, recaudo) => +recaudo.recaudo + acc, 0);

      return total;
    },

    totalTramite(pedidos) {
      let total = pedidos.reduce((acc, tramite) => +tramite.tramite + acc, 0);

      return total;
    },
  },
};
</script>

<style></style>
