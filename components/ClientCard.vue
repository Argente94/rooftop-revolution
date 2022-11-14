<template>
  <div v-if="client !== null && supplyPoint !== null" class="client-card stack--large-gap">
    <div class="stack--small-gap">
      <h3 class="heading--small">
        Cliente
      </h3>
      <div class="stack--small-gap">
        <div class="client-item">
          <div>Nombre completo:</div>
          <div>{{ client.full_name }}</div>
        </div>
        <div class="client-item">
          <div>Dirección:</div>
          <div>{{ client.address }}</div>
        </div>
      </div>
    </div>
    <div class="stack--small-gap">
      <h3 class="heading--small">
        Punto de suministro
      </h3>
      <div class="stack--small-gap">
        <div class="client-item">
          <div>Tarifa:</div>
          <div>{{ supplyPoint.tariff }}</div>
        </div>
        <div class="client-item">
          <div>Cantidad facturada:</div>
          <div>{{ supplyPoint.invoiced_amount }}</div>
        </div>
        <div class="client-item">
          <div>p1:</div>
          <div>{{ supplyPoint.power.p1 }}</div>
        </div>
        <div class="client-item">
          <div>p2:</div>
          <div>{{ supplyPoint.power.p2 }}</div>
        </div>
      </div>
    </div>
    <div class="stack--small-gap">
      <h3 class="heading--small">
        Oferta
      </h3>
      <div class="client-offer">
        {{ clientOffer }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Client, Neighbor, SupplyPoint } from '@/types'

export default Vue.extend({
  name: 'ClientCard',
  props: {
    cups: {
      type: String,
      required: true
    }
  },

  computed: {
    client (): Client {
      return this.$store.getters.getClientByCups(this.cups)
    },

    supplyPoint (): SupplyPoint {
      return this.$store.getters.getSupplyPointByCups(this.cups)
    },

    neighbors () : Neighbor[] {
      return this.supplyPoint.neighbors.map((cups) => {
        return {
          client: this.$store.getters.getClientByCups(cups),
          supplyPoint: this.$store.getters.getSupplyPointByCups(cups)
        }
      })
    },

    clientOffer (): string {
      /* Client not allowed to have solar products */
      if (this.client.building_type !== 'house' || this.supplyPoint.neighbors.length === 0) {
        return 'Lo sentimos, no cumples con las condiciones para acceder a este tipo de productos.'
      }

      /* Client with Special discount */
      const totalInvoice = this.neighbors.reduce((acc, neighbor) => { return acc + parseInt(neighbor.supplyPoint.invoiced_amount) }, 0)

      if (totalInvoice > 100) {
        return 'Oferta especial: 12% de descuento'
      }

      /* Client with Basic discount */
      const basicConditions = this.neighbors.map(neighbor => neighbor.supplyPoint.power.p1 < this.supplyPoint.power.p1 && neighbor.supplyPoint.power.p2 < this.supplyPoint.power.p2)
        .reduce((prev, next) => prev && next)

      if (basicConditions) {
        return 'Oferta básica: 5% de descuento'
      }

      return 'Ahora mismo no podemos aplicarte ningún descuento.'
    }
  }
})
</script>
