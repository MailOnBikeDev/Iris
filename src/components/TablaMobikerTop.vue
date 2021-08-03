<template>
  <div>
    <table class="table w-full border-collapse table-auto">
      <tr
        class="table-row text-sm text-center text-white border-2 bg-secondary border-secondary"
      >
        <th class="table-cell">Puesto</th>
        <th class="table-cell">MoBiker</th>
        <th class="table-cell">Nivel MoB</th>
        <th class="table-cell">Cantidad de Pedidos</th>
        <th class="table-cell">Kilómetros Recorridos</th>
      </tr>

      <tr
        class="table-row text-sm border-2 odd:bg-info odd:text-white border-secondary"
        v-for="(mobiker, idx) in mobikers"
        :key="idx"
      >
        <td class="table-cell px-2 text-center border-2 border-secondary">
          {{ idx + 1 }}
        </td>
        <td class="table-cell px-2 text-center border-2 border-secondary">
          {{ mobiker.mobiker.fullName }}
        </td>
        <td class="table-cell px-2 text-center border-2 border-secondary">
          {{ mobiker.mobiker.rango.rangoMoBiker }}
        </td>
        <td class="table-cell px-2 text-center border-2 border-secondary">
          {{ mobiker.cantidadPedidos }}
        </td>
        <td class="table-cell px-2 text-center border-2 border-secondary">
          {{ mobiker.mobiker.kilometros }} Km
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    mobikers: {
      type: Array,
    },
  },
  methods: {
    capitalizar(texto) {
      const nuevoTexto = texto
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

      return nuevoTexto;
    },
  },
};
</script>
