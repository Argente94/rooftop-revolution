<template>
  <div class="container">
    <div class="stack">
      <h2 class="heading center">
        Súmate a la Revolución de los Tejados
      </h2>
      <form class="form-card">
        <div class="stack--small-gap">
          <p class="text">
            Introduce tu CUPS y <strong>descubre tu oferta</strong>
          </p>
          <div class="columns">
            <input v-model="input" class="text-field" type="text" placeholder="Introduce el CUPS">
            <button class="button--primary" :disabled="isButtonDisabled" @click="onClickButton">
              Busca tu oferta
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="container">
      <div v-show="loading" class="text center">
        Cargando...
      </div>
      <ClientCard v-show="ready" :cups="cups" />
      <ErrorMessage v-show="error" :msg="errorMessage" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',

  data () {
    return {
      cups: '',
      input: '',
      ready: false,
      loading: false,
      error: false,
      errorMessage: ''
    }
  },

  computed: {
    isButtonDisabled (): boolean {
      const CUPS_LENGTH = 6
      return this.input.length !== CUPS_LENGTH
    }
  },

  methods: {
    async onClickButton (event: Event) {
      event.preventDefault()

      this.cups = this.input

      this.ready = false
      this.error = false
      this.loading = true

      try {
        await this.$store.dispatch('fetchClients')
      } catch (e: any) {
        this.error = true
        this.errorMessage = e.message
      }

      if (!this.error) {
        try {
          await this.$store.dispatch('fetchSupplyPoints')
        } catch (e: any) {
          this.error = true
          this.errorMessage = e.message
        }
      }

      if (this.$store.getters.getClientByCups(this.cups) === null ||
      this.$store.getters.getSupplyPointByCups(this.cups) === null) {
        this.error = true
        this.errorMessage = 'CUPS not found'
      }

      this.ready = !this.error
      this.loading = false
    }
  }
})
</script>
