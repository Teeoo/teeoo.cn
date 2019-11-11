<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="6" xs="12">
      <v-skeleton-loader :loading="$apollo.loading" v-for="(data, index) in article" :key="index" class="mt-4" type="card-avatar">
        <v-card class="article_list" flat>
          <v-hover v-slot:default="{ hover }">
            <v-img
              class="white--text align-end"
              height="220px"
              lazy-src="https://s2.ax1x.com/2019/10/26/KBflQK.md.png"
              aspect-ratio="1"
              :src="data.cover ? data.cover : 'https://api.ixiaowai.cn/api/api.php'"
            >
              <span class="source d-lg-none">
                原创
              </span>
              <transition name="slide-y-transition">
                <v-overlay v-if="hover" absolute>
                  <v-btn color="deep-purple accent-4" small rounded :to="`archives/${data.id}`">READ</v-btn>
                </v-overlay>
              </transition>
              <v-card-title style="background:rgba(0, 0, 0, 0.4);">
                <v-chip v-if="data.isTop" color="secondary" class="ma-2" small label dark>
                  置顶
                </v-chip>
                <span v-for="(ch, key) in data.title" :key="key" class="ch">{{ ch }}</span>
              </v-card-title>
            </v-img>
          </v-hover>
          <v-card-subtitle>
            <a>{{ data.category.label }}</a> / {{ data.createdAt | prettyDate }} / 0 条评论
          </v-card-subtitle>
          <v-card-text
            >{{ data.html | summary }} ···
            <v-btn :to="`archives/${data.id}`" color="deep-purple accent-4" small text>阅读全文</v-btn>
          </v-card-text>
        </v-card>
        <span class="datecircle d-none d-lg-block d-print-block">
          <span class="month">{{ getMonth(data.createdAt) }}月</span>
          <span class="day">{{ getDate(data.createdAt) }}</span>
        </span>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import { ARTICLE } from '../graphql/query'

export default {
  apollo: {
    article() {
      return {
        prefetch: true,
        query: ARTICLE,
        result({ data, loading, networkStatus }) {
          if (!loading && networkStatus === 7) {
            this.setArticleList(data ? data.article : [])
          }
        }
      }
    }
  },
  destroyed() {
    this.setArticleList([])
  },
  methods: {
    getMonth(data) {
      const date = new Date(data)
      const month = date.getMonth()
      return month + 1
    },
    getDate(data) {
      const date = new Date(data)
      const m = date.getDate()
      return m
    },
    ...mapActions('article', ['setArticleList'])
  }
}
</script>
