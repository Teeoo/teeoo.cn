<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="7" xs="12">
      <v-card flat class="markdown">
        <v-card-text>
          <v-row no-gutters justify="center" align="center">
            <v-col
              v-for="(data, index) in viewer.repositories.edges"
              :key="index"
              cols="12"
              sm="12"
              md="6"
            >
              <v-card
                class="p2-2 ma-2 github"
                flat
                :loading="$apollo.loading"
                hover
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="headline text-center">{{
                      data.node.name
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-card-subtitle class="text-center">
                  <v-btn small text>
                    <v-icon small>
                      star
                    </v-icon>
                    {{ data.node.stargazers.totalCount }} stars
                  </v-btn>
                  /
                  <v-btn small text>
                    <v-icon small>
                      merge_type
                    </v-icon>
                    {{ data.node.forkCount }} forks
                  </v-btn>
                </v-card-subtitle>
                <v-card-text
                  class="text-center"
                  v-html="data.node.descriptionHTML"
                >
                </v-card-text>
                <v-card-text class="text-center">
                  <v-btn text small rounded>
                    <a :href="data.node.url" target="_blank">访问</a>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
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
      viewer: {}
    }
  }
}
</script>

<style scoped></style>
