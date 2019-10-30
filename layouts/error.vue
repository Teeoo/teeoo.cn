<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12">
        <v-row
          justify="center"
          align="center"
        >
          <h1 class="display-2 primary--text">404</h1>
          <p>404</p>
          <v-btn
            to="/dashboard"
            color="primary"
          >000</v-btn>
        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {
    layout: 'fullscreen',
    props: {
      error: {
        type: Object,
        default: null
      }
    },
    head() {
      const title =
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError
      return {
        title
      }
    },
    data() {
      return {
        pageNotFound: '',
        otherError: 'An error occurred'
      }
    },
    mounted() {
    }
  }
</script>
