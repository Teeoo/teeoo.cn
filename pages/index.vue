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
        class="mt-4"
        :loading="$apollo.loading"
        type="card-avatar"
        v-for="data in article" :key="data.id"
      >
        <v-card
          flat
          hover
          :loading="$apollo.loading"
        >
          <v-img
            class="white--text align-end"
            height="250px"
            src="https://api.dujin.org/bing/1920.php"
          >
            <v-card-title>{{data.title}}</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">{{ data.html | summary }}</v-card-subtitle>
          <v-card-actions>
            <v-layout align-center>
              <v-btn
                text
                icon
                small
                color="blue lighten-2"
              >
                <v-icon small>message</v-icon>
              </v-btn>
              <span class="subheading mr-2 ">0</span>
              <span class="mr-1">·</span>
              <v-btn
                text
                small
                icon
                color="red lighten-2"
              >
                <v-icon small>timer</v-icon>
              </v-btn>
              <span class="subheading">
                {{data.createdAt | prettyDate}}
              </span>
            </v-layout>
            <v-layout
              align-center
              justify-end
            >
              <v-btn
                text
                small
                color="pink"
                :to="`archives/${data.slug}`"
              >去围观</v-btn>
            </v-layout>
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
      article() {
        return {
          prefetch: true,
          query: gql`
          query {
            article {
              id
              order
              html
              desc
              createdAt
              updatedAt
              title
            }
          }
        `,
          watchLoading(isLoading, countModifier) {
            // console.info(isLoading, countModifier)
          },
          result({ data, loading, networkStatus }) {
            // console.info(data, loading, networkStatus)
          }
        }
      }
    },
    data() {
      return {
        article: []
      }
    }
  }
</script>
