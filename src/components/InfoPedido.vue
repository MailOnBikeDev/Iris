<template>
  <div class="grid grid-cols-2 p-4 bg-white rounded-xl gap-x-8">
    <div
      class="grid w-full grid-cols-3 col-span-2 mx-auto text-sm border-b-2 gap-x-8 border-secondary place-items-center"
    >
      <p class="mb-2">
        <span class="resalta">Fecha: </span>
        {{ $date(currentPedido.fecha).format("DD MMM YYYY") }}
      </p>

      <p class="mb-2 text-center">
        <span class="resalta">Tipo Envío: </span
        >{{ currentPedido.tipoDeEnvio.tipo }}
      </p>

      <div class="mb-2">
        <p v-if="currentPedido.status.id === 1" class="tag-programado">
          {{ currentPedido.status.tag }}
        </p>
        <p v-if="currentPedido.status.id === 2" class="tag-recoger">
          {{ currentPedido.status.tag }}
        </p>
        <p v-if="currentPedido.status.id === 3" class="tag-transito">
          {{ currentPedido.status.tag }}
        </p>
        <p v-if="currentPedido.status.id === 4" class="tag-entregado">
          {{ currentPedido.status.tag }}
        </p>
        <p v-if="currentPedido.status.id === 5" class="tag-falso-flete">
          {{ currentPedido.status.tag }}
        </p>
        <p v-if="currentPedido.status.id === 6" class="tag-anulado">
          {{ currentPedido.status.tag }}
        </p>
      </div>
    </div>

    <!-- Caso Cliente es Origen -->
    <div
      v-if="currentPedido.rolCliente === 'Remitente'"
      class="grid grid-cols-2 col-span-2"
    >
      <div class="grid w-full grid-flow-row px-4 py-2 text-xs">
        <h2 class="mb-4 text-2xl font-bold text-center text-primary">
          Origen
        </h2>
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
          <span class="font-bold text-red-600">Observaciones del Cliente: </span
          >{{ currentPedido.otroDatoRemitente }}
        </p>
      </div>

      <div class="grid w-full grid-flow-row px-4 py-2 text-xs">
        <h2 class="mb-4 text-2xl font-bold text-center text-primary">
          Destino
        </h2>
        <p class="mb-2">
          <span class="resalta">Contacto: </span>
          {{ currentPedido.contactoConsignado }}
        </p>
        <p class="mb-2">
          <span class="resalta">Empresa: </span
          >{{ currentPedido.empresaConsignado }}
        </p>
        <p class="mb-2">
          <span class="resalta">Dirección: </span
          >{{ currentPedido.direccionConsignado }}
        </p>
        <p class="mb-2">
          <span class="resalta">Distrito: </span
          >{{ currentPedido.distrito.distrito }}
        </p>
        <p class="mb-2">
          <span class="resalta">Teléfono: </span
          >{{ currentPedido.telefonoConsignado }}
        </p>
        <p class="mb-2">
          <span class="font-bold text-red-600">Observaciones del Destino: </span
          >{{ currentPedido.otroDatoConsignado }}
        </p>
      </div>
    </div>

    <!-- Caso Cliente es Destino -->
    <div class="grid grid-cols-2 col-span-2" v-else>
      <div class="grid w-full grid-flow-row px-4 py-2 text-xs">
        <h2 class="mb-4 text-2xl font-bold text-center text-primary">
          Origen
        </h2>
        <p class="mb-2">
          <span class="resalta">Contacto: </span>
          {{ currentPedido.contactoConsignado }}
        </p>
        <p class="mb-2">
          <span class="resalta">Empresa: </span
          >{{ currentPedido.empresaConsignado }}
        </p>
        <p class="mb-2">
          <span class="resalta">Dirección: </span
          >{{ currentPedido.direccionConsignado }}
        </p>
        <p class="mb-2">
          <span class="resalta">Distrito: </span
          >{{ currentPedido.distrito.distrito }}
        </p>
        <p class="mb-2">
          <span class="resalta">Teléfono: </span
          >{{ currentPedido.telefonoConsignado }}
        </p>
        <p class="mb-2">
          <span class="font-bold text-red-600">Observaciones del Origen: </span
          >{{ currentPedido.otroDatoConsignado }}
        </p>
      </div>

      <div class="grid grid-flow-row px-4 py-2 text-xs">
        <h2 class="mb-4 text-2xl font-bold text-center text-primary">
          Destino
        </h2>
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
          <span class="font-bold text-red-600">Observaciones del Cliente: </span
          >{{ currentPedido.otroDatoRemitente }}
        </p>
      </div>
    </div>

    <div class="grid w-full col-span-2 py-2 mb-2 text-xs place-items-center ">
      <p>
        <span class="resalta">Comentario: </span>{{ currentPedido.comentario }}
      </p>
    </div>

    <div
      class="grid w-full col-span-2 py-2 mb-2 text-xs border-t-2 place-items-center border-secondary"
    >
      <p>
        <span class="resalta">MoBiker: </span
        >{{ currentPedido.mobiker.fullName }}
      </p>
    </div>

    <div
      class="grid w-full grid-cols-2 col-span-2 gap-2 mx-auto text-xs place-items-center"
    >
      <p class="mb-2">
        <span class="resalta">Tarifa: </span>S/.
        {{ currentPedido.tarifa }}
      </p>
      <p class="mb-2">
        <span class="resalta">Comisión: </span>S/.
        {{ +currentPedido.comision.toFixed(2) }}
      </p>
      <p class="mb-2">
        <span class="resalta">Distancia: </span
        >{{ +currentPedido.distancia.toFixed(1) }}Km
      </p>
      <p class="mb-2">
        <span class="resalta">Pago: </span>{{ currentPedido.formaPago }}
      </p>
      <p class="mb-2">
        <span class="resalta">Carga: </span>
        {{ currentPedido.tipoCarga }}
      </p>
      <p class="mb-2">
        <span class="resalta">Modalidad: </span
        >{{ currentPedido.modalidad.tipo }}
      </p>
      <p class="mb-2">
        <span class="resalta">Recaudo: </span>S/.
        {{ currentPedido.recaudo }}
      </p>
      <p class="mb-2">
        <span class="resalta">Trámite: </span>S/.
        {{ currentPedido.tramite }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoPedido",
  props: {
    currentPedido: {
      type: Object,
      required: true,
    },
  },
};
</script>
