<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="7" xs="12">
      <v-article-details
        :loading="$apollo.queries.pageDetails.loading"
        type="list-item-avatar-three-line,article,article,image,article,list-item-avatar-three-line,list-item-avatar-three-line"
      >
        <v-card
          :loading="$apollo.queries.pageDetails.loading"
          flat
          class="markdown"
        >
          <v-list-item>
            <v-list-item-avatar>
              <img
                src="https://s.gravatar.com/avatar/54ed5f99a080b72b65da031c53d44578?s=100&r=x&d=retro"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">lee</v-list-item-title>
              <v-list-item-subtitle>
                {{ pageDetails.createdAt }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-btn icon>
              <v-icon>class</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
          </v-list-item>
          <v-card-text
            v-viewer="{ movable: false }"
            v-html="pageDetails.html"
          ></v-card-text>
        </v-card>
      </v-article-details>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
import '@/assets/markdown.styl'
export default {
  name: 'Default',
  components: {
    VArticleDetails: {
      functional: true,
      render(h, { data, props, children }) {
        return h(
          'v-skeleton-loader',
          {
            ...data,
            props: {
              boilerplate: false,
              ...props
            }
          },
          children
        )
      }
    }
  },
  apollo: {
    pageDetails: {
      prefetch: true,
      query: gql`
        query($id: String!) {
          pageDetails(id: $id) {
            id
            order
            desc
            createdAt
            updatedAt
            title
            slug
            cover
            summary
            text
            html
            template
            type
            status
            publish
            password
            allowComment
            isTop
            exinfo
          }
        }
      `,
      variables() {
        return {
          id: String(this.$route.params.id)
        }
      }
    }
  },
  data() {
    return {
      pageDetails: {}
    }
  }
}
</script>

<style scoped></style>
