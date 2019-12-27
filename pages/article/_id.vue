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
                {{ articleDetails.createdAt | formatRelativeTime }}
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
            v-html="articleDetails.html"
          ></v-card-text>
          <v-card-subtitle class="text-center">
            <blockquote>
              <p>
                <strong>
                  本文链接：
                  <a :href="url">{{ url }}</a>
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
          </v-card-subtitle>
          <v-card-subtitle>
            <h3>评论</h3>
          </v-card-subtitle>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    prepend-icon="textsms"
                    label="快来写下你的骚操作吧"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="account_circle"
                    label="昵称"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" :md="links ? 6 : 12" xs="12" sm="12">
                  <v-text-field
                    prepend-icon="email"
                    label="邮箱"
                  ></v-text-field>
                </v-col>
                <v-col v-if="links" cols="12" md="6" xs="12" sm="12">
                  <v-text-field
                    prepend-icon="link"
                    label="网站（如果有）http(s)://"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="links = !links">
              <v-icon>link</v-icon>
            </v-btn>
            <v-btn text dark color="pink">提交 </v-btn>
          </v-card-actions>
          <v-card-text> </v-card-text>
        </v-card>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>
<script>
import gql from 'graphql-tag'
import { mapActions } from 'vuex'
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
      url: ``,
      links: false,
      articleDetails: {}
    }
  },
  watch: {
    articleDetails(val) {
      this.title(val.title)
      this.cover(
        val.cover
          ? val.cover
          : `https://api.ixiaowai.cn/api/api.php?${Math.floor(
              Math.random() * 100
            )}`
      )
    }
  },
  created() {
    if (process.browser) {
      this.url = `${location.href}`
    }
  },
  destroyed() {
    this.reset()
  },
  methods: {
    ...mapActions(['title', 'cover', 'reset'])
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
          content: `https://api.ixiaowai.cn/api/api.php?${Math.floor(
            Math.random() * 100
          )}`
        }
      ]
    }
  }
}
</script>
