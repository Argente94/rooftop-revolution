<template>
  <div>
      <h2>Introduce tu CUPS para descubrir si cumples con los requisitos para sumarte a la revolución de los tejados</h2>
      <input type="text" placeholder="Introduce el CUPS" @input="onChangeInput">
      <button :disabled="isDisabled()">Search</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  
  data() {
    return {
      inputText: '',
    }
  },

  methods: {
    onChangeInput(event: Event){
      const target = (event.target as HTMLInputElement);
      this.inputText = target.value;
    },

    isDisabled(){
        const CUPS_LENGTH = 6;
        return this.inputText.length !== CUPS_LENGTH;
    }
  },
})
</script>
