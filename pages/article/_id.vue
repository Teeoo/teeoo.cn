<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="7" xs="12">
      <v-skeleton-loader
        :loading="$apollo.queries.articleDetails.loading"
        type="list-item-avatar-three-line,article,article,image,article,list-item-avatar-three-line,list-item-avatar-three-line"
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
                {{ articleDetails.createdAt | formatDate }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-btn icon>
              <v-icon>class</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
          </v-list-item>
          <v-card-text v-html="articleDetails.html"></v-card-text>
          <v-card-subtitle class="text-center">
            <blockquote>
              <p>
                <strong>
                  本文链接：
                  <a>url</a>
                </strong>
                <br />
                <strong>
                  本文采用
                  <a
                    href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh"
                    target="_blank"
                    rel="noopener"
                    >CC BY-NC-SA 3.0 Unported</a
                  >
                  协议进行许可
                </strong>
              </p>
            </blockquote>
            <v-btn icon>
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
          </v-card-subtitle>
        </v-card>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>
<script>
import '@/assets/markdown.styl'
import gql from 'graphql-tag'

export default {
  apollo: {
    articleDetails: {
      prefetch: true,
      query: gql`
        query($id: String!) {
          articleDetails(id: $id) {
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
      articleDetails: {}
    }
  },
  head() {
    return {
      title: this.articleDetails.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '愿你历尽千帆,归来仍是少年'
        },
        {
          itemprop: 'name',
          content: this.articleDetails.title
        },
        {
          itemprop: 'description',
          content: this.articleDetails.summary
        },
        {
          itemprop: 'image',
          content: `https://api.ixiaowai.cn/api/api.php?${Math.random()}`
        }
      ]
    }
  }
}
</script>
