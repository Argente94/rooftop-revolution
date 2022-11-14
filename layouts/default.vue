<template>
  <div class="layout">
    <Nuxt />
  </div>
</template>

<style lang="scss">
    .layout {
        min-height: 100vh;
        overflow: hidden;
        background-color: $background-color;
        padding: 30px;

        @media screen and (max-width:480px){
          padding: 15px;
        }
    }
</style>
