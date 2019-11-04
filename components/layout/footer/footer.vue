<template>
  <v-footer >
    <v-row
      justify="center"
      no-gutters
      class="mt-2"
    >
<!--      <v-btn-->
<!--        class="d-none d-lg-block d-print-block"-->
<!--        small-->
<!--        absolute-->
<!--        fab-->
<!--        top-->
<!--      >-->
<!--        <v-icon>swap_vertical_circle</v-icon>-->
<!--      </v-btn>-->
      <v-col class="d-none d-lg-block d-print-block" cols="12"
             sm="3"
             md="3"
             xs="3">
        <v-subheader class="headline">标签云</v-subheader>
      </v-col>
      <v-col class="d-none d-lg-block d-print-block" cols="12"
             sm="3"
             md="3"
             xs="3">

        <v-subheader class="headline">最热文章</v-subheader>
      </v-col>
      <v-col class="d-none d-lg-block d-print-block" cols="12"
             sm="3"
             md="3"
             xs="3">
        <v-subheader class="headline">最新文章</v-subheader>
      </v-col>
      <v-col class="d-none d-lg-block d-print-block" cols="12"
             sm="3"
             md="3"
             xs="3">
        <v-subheader class="headline">还没想好放啥</v-subheader>
      </v-col>
      <v-col
        class="py-4 text-center"
        cols="12"
        sm="6"
        md="6"
        xs="12"
      >
        &copy; {{ new Date().getFullYear() }} · <strong>lee</strong>
        蜀ICP备18011318号-1
      </v-col>
      <v-col
        class="py-4 text-center d-none d-lg-block d-print-block"
        cols="12"
        sm="6"
        md="6"
        xs="12"
      >
        <v-icon>home</v-icon>
        <v-icon>email</v-icon>
        <v-icon>rss_feed</v-icon>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    name: 'layout-footer'
  }
</script>

<style scoped>

</style>
