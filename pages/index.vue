<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="5" xs="12">
      <v-skeleton-loader
        v-for="(data, index) in article.data"
        :key="index"
        v-scroll-reveal.reset
        :loading="$apollo.queries.article.loading"
        type="card"
        transition="slide-y-reverse-transition"
        class="article mt-4"
      >
        <v-card flat :loading="$apollo.queries.article.loading">
          <v-hover v-slot:default="{ hover }">
            <v-img
              lazy-src="https://s2.ax1x.com/2019/10/26/KBflQK.md.png"
              :src="`https://api.ixiaowai.cn/api/api.php?${data.id}`"
              transition="slide-y-reverse-transition"
            >
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
            </v-img>
          </v-hover>
          <v-card-title>
            <v-chip color="secondary" class="ma-2" small label dark>置顶</v-chip
            >{{ data.title }}
          </v-card-title>
          <v-card-text v-html="data.summary"></v-card-text>
          <v-card-actions>
            <span
              style="letter-spacing: .0375rem;
    line-height: 1.375rem;
    font-size: .875rem;
    color:#a9b0bc
    "
              ><v-icon class="pl-2" small color="#a9b0bc">person</v-icon>
              {{ data.author.name }}</span
            >
            <span
              style="letter-spacing: .0375rem;
    line-height: 1.375rem;
    font-size: .875rem;
    color:#a9b0bc
    "
              ><v-icon class="pl-2" small color="#a9b0bc">bookmark</v-icon>
              {{ data.category.label }}</span
            >
            <span
              style="letter-spacing: .0375rem;
    line-height: 1.375rem;
    font-size: .875rem;
    color:#a9b0bc
    "
              ><v-icon class="pl-2" small color="#a9b0bc">comment</v-icon> 28
            </span>
            <v-spacer></v-spacer>
            <v-btn color="deep-purple accent-4" small text>
              阅读全文
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import { ARTICLELIST } from '../graphql/query'
export default {
  components: {},
  apollo: {
    article: {
      prefetch: true,
      query: ARTICLELIST
    }
  },
  data() {
    return {
      article: {}
    }
  }
}
</script>
