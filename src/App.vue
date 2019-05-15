<template>
    <div id="app">
        <app-header></app-header>
        <router-view/>
    </div>
</template>

<script>
  import AppHeader from "@/components/Header"

  export default {
    components: {
      AppHeader
    }
  }
</script>

<style lang="scss">
    @import "assets/scss/main";
</style>
