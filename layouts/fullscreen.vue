<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <transition name="scroll-y-transition">
          <nuxt/>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'fullscreen'
  }
</script>

<style scoped>

</style>
