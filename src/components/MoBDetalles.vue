<template>
  <div class="flex flex-col w-full h-full p-4 text-xs" v-if="estadisticas">
    <p class="mb-2">
      <span class="resalta">Nombres: </span>
      {{ estadisticas.nombres }} {{ estadisticas.apellidos }}
    </p>
    <p class="mb-2">
      <span class="resalta">Teléfono: </span>
      <span class="select-all">{{ estadisticas.telefono }}</span>
    </p>
    <p class="mb-2">
      <span class="resalta">Usuario de Telegram: </span>
      <span class="select-all">@{{ estadisticas.telegram }}</span>
    </p>
    <p class="mb-2">
      <span class="resalta">Dirección: </span>
      {{ estadisticas.direccion }}
    </p>
    <p class="mb-2">
      <span class="resalta">Distrito: </span>
      {{ estadisticas.distrito.distrito }}
    </p>
    <p class="mb-2">
      <span class="resalta">Tipo de Documento: </span>
      {{ estadisticas.tipoDocumento }}:
      <span class="select-all">{{ estadisticas.numeroDocumento }}</span>
    </p>
    <p class="mb-2">
      <span class="resalta">Email: </span>
      {{ estadisticas.email }}
    </p>
    <p class="mb-2">
      <span class="resalta">Género: </span>
      {{ estadisticas.genero }}
    </p>
    <p class="mb-2">
      <span class="resalta">Equipo: </span>
      {{ estadisticas.equipo }}
    </p>
    <p class="mb-2">
      <span class="resalta">Tipo de Bicicleta: </span>
      {{ estadisticas.tipoBicicleta }}
    </p>
    <p class="mb-2">
      <span class="resalta">Nivel MoBiker: </span>
      {{ estadisticas.rango.rangoMoBiker }}
    </p>
    <p class="mb-2">
      <span class="resalta">Cumpleaños: </span>
      {{ $date(estadisticas.fechaNacimiento).format("DD MMM YYYY") }}
    </p>
    <p class="mb-2">
      <span class="resalta">Ingreso al equipo: </span>
      {{ $date(estadisticas.fechaIngreso).format("DD MMM YYYY") }}
    </p>
  </div>
</template>

<script>
export default {
  name: "MoBDetalles",
  props: {
    estadisticas: Object,
    pedidos: Array,
  },
};
</script>
