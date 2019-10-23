<template>
  <v-row
    no-gutters
    justify="center"
    align="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="6"
      xs="12"
    >
      <v-skeleton-loader
        :loading="this.$apollo.loading"
        type="card-avatar"
      >
        <v-card
          flat
          v-for="(data,index) in article"
          :key="index"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>{{data.title}}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            {{data.createdAt}}
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange"
              text
            >
              Share
            </v-btn>

            <v-btn
              color="orange"
              text
            >
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    article: {
      query: gql`
        query {
          article {
            id
            order
            desc
            createdAt
            updatedAt
            title
          }
        }
      `
    }
  }
}
</script>
