<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="6" xs="12">
      <v-skeleton-loader
        v-for="(data, index) in article.data"
        :key="index"
        :loading="$apollo.loading"
        type="card-avatar"
        class="mt-4"
      >
        <v-card :loading="$apollo.loading" flat>
          <v-hover v-slot:default="{ hover }">
            <v-img
              height="220px"
              lazy-src="https://s2.ax1x.com/2019/10/26/KBflQK.md.png"
              :src="`https://api.ixiaowai.cn/api/api.php?${index}`"
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
          <v-card-subtitle>
            <a>{{ data.category.label }}</a>
            / {{ data.createdAt }} / 0 条评论
          </v-card-subtitle>
          <v-card-text v-html="data.summary"></v-card-text>
        </v-card>
      </v-skeleton-loader>
      <div class="text-center mt-4">
        <v-btn
          rounded
          color="primary"
          dark
          @click=";`${$toast.warning(`骚瑞,这里还没写!`)}`"
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
              createdAt
            }
          }
        }
      `
    }
  },
  data() {
    return {
      article: {},
      title: '往事不提',
      colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange']
    }
  },
  methods: {
    lazy() {
      //
    }
  }
}
</script>
