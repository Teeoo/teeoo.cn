<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <transition name="fade-transform" mode="out-in">
          <div v-if="$nuxt.isOffline">
            <v-overlay absolute>
              <v-row class="fill-height" align-content="center" justify="center">
                <v-col class="subtitle-1 text-center" cols="12">
                  You are offline
                </v-col>
                <v-col cols="6">
                  <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
                </v-col>
              </v-row>
            </v-overlay>
          </div>
          <nuxt />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Httpstatus'
}
</script>

<style scoped></style>
