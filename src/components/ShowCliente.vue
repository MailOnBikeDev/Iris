<template>
  <div>
    <div class="flex flex-col text-xs max-h-96" v-if="currentPedido">
      <p class="mb-2">
        <span class="resalta">Contacto: </span>
        {{ currentPedido.contactoRemitente }}
      </p>
      <p class="mb-2">
        <span class="resalta">Empresa: </span
        >{{ currentPedido.empresaRemitente }}
      </p>
      <p class="mb-2">
        <span class="resalta">Dirección: </span
        >{{ currentPedido.direccionRemitente }}
      </p>
      <p class="mb-2">
        <span class="resalta">Distrito: </span
        >{{ currentPedido.distritoRemitente }}
      </p>
      <p class="mb-2">
        <span class="resalta">Teléfono: </span
        >{{ currentPedido.telefonoRemitente }}
      </p>
      <p class="mb-2">
        <span class="resalta">Observaciones: </span
        >{{ currentPedido.otroDatoRemitente }}
      </p>
      <p class="mb-2">
        <span class="resalta">Forma de Pago: </span
        >{{ currentPedido.formaPago }}
      </p>
      <p class="mb-2">
        <span class="resalta">Tarifa: </span>S/.
        {{ currentPedido.tarifa }}
      </p>
      <p class="mb-2">
        <span class="resalta">Recaudo: </span>S/.
        {{ currentPedido.recaudo }}
      </p>
      <p class="mb-2">
        <span class="resalta">Tramite: </span>S/.
        {{ currentPedido.tramite }}
      </p>
      <p class="mb-2">
        <span class="resalta">Modalidad: </span
        >{{ currentPedido.modalidad.tipo }}
      </p>
      <p class="mb-2">
        <span class="resalta">Rol: </span>{{ currentPedido.rolCliente }}
      </p>
    </div>

    <div class="flex flex-col text-xs max-h-96" v-else>
      <p class="mb-2">
        <span class="resalta">Contacto: </span>
      </p>
      <p class="mb-2">
        <span class="resalta">Empresa: </span>
      </p>
      <p class="mb-2">
        <span class="resalta">Dirección: </span>
      </p>
      <p class="mb-2"><span class="resalta">Distrito: </span></p>
      <p class="mb-2"><span class="resalta">Teléfono: </span></p>
      <p class="mb-2">
        <span class="resalta">Observaciones: </span>
      </p>
      <p class="mb-2">
        <span class="resalta">Forma de Pago: </span>
      </p>
      <p class="mb-2"><span class="resalta">Tarifa: </span>S/.</p>
      <p class="mb-2"><span class="resalta">Recaudo: </span>S/.</p>
      <p class="mb-2"><span class="resalta">Tramite: </span>S/.</p>
      <p class="mb-2"><span class="resalta">Modalidad: </span></p>
      <p class="mb-2"><span class="resalta">Rol: </span></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPedido: {
      type: Object,
    },
  },
};
</script>
