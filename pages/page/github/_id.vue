<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="7" xs="12">
      <v-skeleton-loader :loading="$apollo.loading" type="card">
        <v-card flat class="markdown">
          <v-card-text>
            {{ viewer.repositories.edges }}
          </v-card-text>
        </v-card>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    viewer: {
      prefetch: true,
      client: 'github',
      query: gql`
        query {
          viewer {
            repositories(first: 50, isFork: false) {
              edges {
                node {
                  id
                  name
                  url
                  descriptionHTML
                  forkCount
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
        }
      `,
      variables() {}
    }
  },
  data() {
    return {
      viewer: {
        repositories: {
          edges: {}
        }
      }
    }
  }
}
</script>

<style scoped></style>
