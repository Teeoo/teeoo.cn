<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="7" xs="12">
      <v-article-details :loading="this.$apollo.loading" type="card-avatar,article,article">
        <v-card :loading="this.$apollo.loading" flat class="markdown">
          <v-img
            lazy-src="https://s2.ax1x.com/2019/10/26/KBflQK.md.png"
            class="white--text align-end"
            height="300px"
            :src="details.cover ? details.cover : 'https://api.ixiaowai.cn/api/api.php'"
            ><span class="source">原创</span>
            <v-card-title class="text-center" style="background:rgba(0, 0, 0, 0.4);">
              {{ details.title }}
            </v-card-title>
          </v-img>
          <v-card-text v-viewer="{ movable: false }" v-html="details.html"> </v-card-text>
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
                  <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh" target="_blank" rel="noopener">CC BY-NC-SA 3.0 Unported</a>
                  协议进行许可
                </strong>
              </p>
            </blockquote>
            <v-btn icon>
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
          </v-card-subtitle>
        </v-card>
      </v-article-details>
      <v-lazy
        :options="{
          threshold: 0.5
        }"
        transition="fade-transition"
      >
        <Comments />
      </v-lazy>
    </v-col>
  </v-row>
</template>

<script>
import Prism from 'prismjs'
import '@/assets/markdown.styl'
import { mapState, mapActions } from 'vuex'
import { ARTICLEBYID } from '../../graphql/query'
import Comments from '../../components/comments/index'

export default {
  name: 'Details',
  components: {
    Comments,
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
    ArticleById() {
      return {
        prefetch: true,
        query: ARTICLEBYID,
        variables() {
          return {
            id: String(this.$route.params.id)
          }
        },
        result({ data, loading, networkStatus }) {
          if (!loading && networkStatus === 7) {
            this.setDetails(data.ArticleById)
            this.$store.commit('SET_TITLE', data.ArticleById.title)
          }
        }
      }
    }
  },
  data() {
    return {
      url: ``,
      isActive: false
    }
  },
  computed: {
    ...mapState('article', {
      details: (state) => state.details
    })
  },
  updated() {
    Prism.highlightAll()
  },
  created() {
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      this.url = `${window.location.href}`
    }
  },
  destroyed() {
    this.setDetails({})
    this.$store.commit('SET_TITLE', 'lee的小窝')
  },
  methods: {
    ...mapActions('article', ['setDetails'])
  }
}
</script>

<style scoped></style>
