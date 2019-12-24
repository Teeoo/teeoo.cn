<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="6" xs="12">
      <v-skeleton-loader
        v-for="(data, index) in article.data"
        :key="index"
        :loading="$apollo.queries.article.loading"
        transition="flow"
        type="card-avatar"
        class="mt-4"
      >
        <q-intersection transition="flow">
          <v-card flat>
            <v-hover v-slot:default="{ hover }">
              <v-img
                height="220px"
                lazy-src="https://s2.ax1x.com/2019/10/26/KBflQK.md.png"
                :src="`https://api.ixiaowai.cn/api/api.php?${data.id}`"
                class="white--text align-end"
              >
                <span class="source">原创</span>
                <transition name="slide-y-transition">
                  <v-overlay v-if="hover" absolute>
                    <v-btn
                      :to="`article/${data.id}`"
                      color="deep-purple accent-4"
                      small
                      rounded
                      >Read more</v-btn
                    >
                  </v-overlay>
                </transition>
                <v-card-title style="background:rgba(0, 0, 0, 0.4);">
                  <v-chip
                    v-if="data.isTop"
                    color="secondary"
                    class="ma-2"
                    small
                    label
                    dark
                    >置顶</v-chip
                  >
                  <span v-for="(ch, key) in data.title" :key="key" class="ch">{{
                    ch
                  }}</span>
                </v-card-title>
              </v-img>
            </v-hover>
            <v-card-subtitle class="font-weight-medium">
              <a class="font-weight-medium">{{ data.category.label }}</a>
              / {{ data.createdAt | formatRelativeTime }} / 0 条评论
            </v-card-subtitle>
            <v-card-text v-html="data.summary"></v-card-text>
          </v-card>
        </q-intersection>
      </v-skeleton-loader>
      <div class="text-center mt-4">
        <v-btn rounded color="primary" dark @click=";`${$q.notify('Message')}`"
          >加载更多</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    article: {
      prefetch: true,
      query: gql`
        query {
          article {
            total
            per_page
            current_page
            last_page
            data {
              id
              title
              summary
              category {
                label
              }
              isTop
              createdAt
            }
          }
        }
      `
    }
  },
  data() {
    return {
      article: {}
    }
  },
  methods: {
    lazy() {
      //
    }
  },
  head() {
    return {
      title: `lee的小窝`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '愿你历尽千帆,归来仍是少年'
        },
        {
          itemprop: 'name',
          content: `lee的小窝`
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
