<template>
  <div>
    <div
      v-if="!$apollo.loading"
      class="text-center"
    >
      <v-chip
        link
        class="mt-4 ma-2"
        text-color="white"
        :color="randomColor()"
        v-for="data in category"
        :key="data.id"
      >
        {{data.label}} {{data.archNum}}
      </v-chip>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'index',
    head() {
      return {
        title: "分类",
        meta: [
          { hid: 'description', name: 'description', content: '生如夏花之绚烂，死如秋叶之静美' }
        ]
      }
    },
    apollo: {
      category() {
        return {
          prefetch: true,
          query: gql`
            query{
                 category{
                      id
                      order
                      desc
                      createdAt
                      updatedAt
                      label
                      slug
                      cateNum
                      archNum
                      children
                      parent
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
      return {}
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
