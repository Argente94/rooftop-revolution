<template>
  <div class="text--large center">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ErrorMessage',

  props: {
    msg: {
      type: String,
      required: true
    }
  },

  data () {
    return {}
  }
})
</script>
