<template>
  <v-row
    no-gutters
    justify="center"
    align="center"
  >
    <v-snackbar v-model="snackbar">
      假的,没数据因为我还没写完!!
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-col
      cols="12"
      sm="8"
      md="6"
      xs="12"
    >
      <v-card flat v-show="!article.length">
        <v-card-text class="text-center">
          <v-alert
            dark
          >
            作者还没发布过文章哦!
          </v-alert>
        </v-card-text>
      </v-card>
      <v-skeleton-loader
        class="mt-4"
        :loading="$apollo.loading"
        type="card-avatar"
        v-for="(data,index) in article"
        :key="index"
      >
        <v-card
          class="article_list"
          flat
          :loading="$apollo.loading"
        >
          <v-hover v-slot:default="{ hover }">
            <v-img
              class="white--text align-end"
              height="220px"
              lazy-src="https://s2.ax1x.com/2019/10/26/KBflQK.md.png"
              aspect-ratio="1"
              :src="data.cover?data.cover:'https://api.ixiaowai.cn/api/api.php'"
            >
              <span class="source d-lg-none">
                原创
              </span>
              <transition name="scroll-x-reverse-transition">
                <v-overlay
                  v-if="hover"
                  absolute
                >
                  <v-btn
                    color="deep-purple accent-4"
                    small
                    rounded
                    :to="`archives/${data.id}`"
                  >READ
                  </v-btn>
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
                >
                  置顶
                </v-chip>
                <span
                  class="ch"
                  v-for="(ch,key) in data.title"
                  :key="key"
                >{{ch}}</span>
              </v-card-title>
            </v-img>
          </v-hover>
          <v-card-subtitle>
            <a>{{data.category.label}}</a> / {{data.createdAt | prettyDate}} / 0 条评论
          </v-card-subtitle>
          <v-card-text>{{ data.html | summary }} ···
            <v-btn
              :to="`archives/${data.id}`"
              color="deep-purple accent-4"
              small
              text
            >阅读全文
            </v-btn>
          </v-card-text>
        </v-card>

        <span class="datecircle d-none d-lg-block d-print-block">
          <span class="month">{{getMonth(data.createdAt)}}月</span>
          <span class="day">{{getDate(data.createdAt)}}</span>
        </span>
      </v-skeleton-loader>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="12"
      xs="12"
    >
      <div class="text-center mt-8 mb-8">
        <v-btn
          v-show="article.length"
          small
          rounded
          color="primary"
          dark
          @click="snackbar=true"
        >加载更多
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { ARTICLE } from '../graphql/query'
export default {
  apollo: {
    article() {
      return {
        prefetch: true,
        query: ARTICLE,
      }
    }
  },
  data() {
    return {
      snackbar: false,
      article: []
    }
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
    }
  }
}
</script>
