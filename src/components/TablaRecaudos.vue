<template>
  <div>
    <table class="table w-full border-collapse table-auto">
      <tr
        class="table-row text-sm text-center text-white border-2 bg-secondary border-secondary"
      >
        <th class="table-cell">Fecha</th>
        <th class="table-cell"># Pedido</th>
        <th class="table-cell">Contacto</th>
        <th class="table-cell">Empresa</th>
        <th class="table-cell">Tarifa</th>
        <th class="table-cell">Destinatario</th>
        <th class="table-cell">Recaudo</th>
        <th class="table-cell">Trámite</th>
        <th class="table-cell">MoBiker</th>
      </tr>

      <tr
        class="table-row max-h-full overflow-y-auto text-xs border-2 odd:bg-info odd:text-white border-secondary"
        v-for="pedido in pedidos"
        :key="pedido.id"
      >
        <td class="table-cell px-2 text-center border-2 border-secondary">
          {{ $date(pedido.fecha).format("DD MMM") }}
        </td>
        <td class="table-cell px-2 text-center border-2 border-secondary">
          {{ pedido.id }}
        </td>
        <td class="table-cell px-2 border-2 border-secondary">
          {{ capitalizar(pedido.contactoRemitente) }}
        </td>
        <td class="table-cell px-2 border-2 border-secondary">
          {{ capitalizar(pedido.empresaRemitente) }}
        </td>
        <td class="table-cell px-2 text-center border-2 border-secondary">
          {{ pedido.tarifa }}
        </td>
        <td class="table-cell px-2 text-center border-2 border-secondary">
          {{ capitalizar(pedido.contactoConsignado) }}
        </td>
        <td class="table-cell px-2 text-center border-2 border-secondary">
          {{ pedido.recaudo }}
        </td>
        <td class="table-cell px-2 text-center border-2 border-secondary">
          {{ pedido.tramite }}
        </td>
        <td class="table-cell px-2 text-center border-2 border-secondary">
          {{ pedido.mobiker.fullName }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    pedidos: {
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
