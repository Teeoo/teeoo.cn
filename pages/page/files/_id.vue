<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="7" xs="12">
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item color="purple lighten-2" fill-dot right>
          <v-card flat> </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Id'
}
</script>

<style scoped></style>
