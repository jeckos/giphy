<template>
    <div class="logo">
        <router-link to="/" class="logo_link"><slot></slot></router-link>
    </div>
</template>

<script>
  export default {
    name: "Logo"
  }
</script>

<style scoped>

</style>
