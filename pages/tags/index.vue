<template>
  <div>
    <div v-if="!$apollo.loading" class="text-center">
      <v-chip link class="mt-4 ma-2" text-color="white" :color="randomColor()" v-for="data in tags" :key="data.id">
        # {{data.label}}
      </v-chip>
      <v-card flat>
        <v-subheader># 留言</v-subheader>
        <v-list flat tile>
          <template>
            <v-list-item>
              <v-list-item-avatar>
                1
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>开发日志</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset
            ></v-divider>
            <v-list-item>
              <v-list-item-avatar>
                2
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>开发日志</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </div>
  </div>
</template>


<script>
  import gql from 'graphql-tag'

  export default {
    name: 'index',
    head() {
      return {
        title: "标签",
        meta: [
          { hid: 'description', name: 'description', content: '生如夏花之绚烂，死如秋叶之静美' }
        ]
      }
    },
    apollo: {
      tags() {
        return {
          prefetch: true,
          query: gql`
          query {
             tags {
                  id
                  order
                  desc
                  createdAt
                  updatedAt
                  label
                  slug
                  color
                  hot
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
    },
    methods: {
      randomColor() {
        const data = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan']
        return data[Math.floor(Math.random() * data.length)]
      }
    }
  }
</script>

<style scoped>

</style>
