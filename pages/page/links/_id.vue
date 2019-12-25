<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="7" xs="12">
      <v-skeleton-loader
        :loading="$apollo.queries.pageDetails.loading"
        type="list-item-avatar-three-line,article,article,image,article,date-picker,date-picker,date-picker,date-picker"
      >
        <v-card flat class="markdown">
          <v-list-item>
            <v-list-item-avatar>
              <img
                src="https://s.gravatar.com/avatar/54ed5f99a080b72b65da031c53d44578?s=100&r=x&d=retro"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">lee</v-list-item-title>
              <v-list-item-subtitle>
                {{ pageDetails.createdAt | formatRelativeTime }}
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
          <hr />
          <v-card-text>
            <v-row no-gutters justify="center" align="center">
              <v-col
                v-for="(data, index) in links"
                :key="index"
                sm="12"
                md="4"
                xs="12"
                lg="4"
                xl="4"
                cols="12"
              >
                <v-card class="p2-2 ma-2" flat :loading="$apollo.loading" hover>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">👬 左邻右舍</div>
                      <v-list-item-title class="headline mb-1">
                        <span
                          v-for="(span, key) in data.name"
                          :key="key"
                          class="tilt"
                          >{{ span }}</span
                        >
                      </v-list-item-title>
                      <v-list-item-subtitle>{{
                        data.desc
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar size="64">
                      <v-img class="logo" :src="data.logo" />
                    </v-list-item-avatar>
                  </v-list-item>
                  <v-card-actions>
                    <v-btn text small rounded>
                      <a :href="data.url" :target="data.target">戳进去</a>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
import '@/assets/markdown.styl'
export default {
  name: 'Links',
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
    },
    links: {
      prefetch: true,
      query: gql`
        query {
          links {
            id
            order
            desc
            createdAt
            updatedAt
            url
            name
            email
            logo
            target
            status
          }
        }
      `
    }
  },
  data() {
    return {
      pageDetails: {},
      links: []
    }
  },
  head() {
    return {
      title: this.pageDetails.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '愿你历尽千帆,归来仍是少年'
        },
        {
          itemprop: 'name',
          content: this.pageDetails.title
        },
        {
          itemprop: 'description',
          content: '愿你历尽千帆,归来仍是少年'
        },
        {
          itemprop: 'image',
          content: `https://api.ixiaowai.cn/api/api.php?${Math.floor(
            Math.random() * 100
          )}`
        }
      ]
    }
  }
}
</script>

<style scoped></style>
