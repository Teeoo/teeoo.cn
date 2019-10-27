<template>
  <div class="container">
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
  export default {
    layout: 'error',
    props: ['error'],
    name: '404.vue',
  }
</script>

<style scoped>

</style>
