<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="7" xs="12">
      <v-card :loading="this.$apollo.loading" flat class="markdown">
        <v-img
          :height="300"
          :src="details.cover ? details.cover : 'https://api.ixiaowai.cn/api/api.php'"
          lazy-src="https://s2.ax1x.com/2019/10/26/KBflQK.md.png"
          class="white--text align-end"
          ><span class="source">原创</span>
          <v-card-title class="text-center" style="background:rgba(0, 0, 0, 0.4);">
            {{ details.title }}
          </v-card-title>
        </v-img>
        <v-card-text v-viewer="{ movable: false }" v-html="details.html"> </v-card-text>
        <hr />
        <v-card-text>
          <v-row no-gutters justify="center" align="center">
            <v-col v-for="(data, index) in list" :key="index" sm="12" md="4" xs="12" lg="4" xl="4">
              <v-card :loading="$apollo.loading" class="p2-2 ma-2" flat hover>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">👬 左邻右舍</div>
                    <v-list-item-title class="headline mb-1">
                      <span v-for="(span, key) in data.name" :key="key" class="tilt">{{ span }}</span>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ data.desc }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-avatar size="64">
                    <v-img :src="data.logo" class="logo" />
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
import '@/assets/markdown.styl'
import { mapState, mapActions } from 'vuex'
import Comments from '../../../components/comments/index'
import { LINKS, PAGESBYID } from '../../../graphql/query'
export default {
  name: 'Links',
  components: { Comments },
  apollo: {
    PagesById() {
      return {
        prefetch: true,
        query: PAGESBYID,
        variables() {
          return {
            id: String(this.$route.params.id)
          }
        },
        result({ data, loading, networkStatus }) {
          if (!loading && networkStatus === 7) {
            this.setDetails(data.PagesById)
          }
        }
      }
    },
    links: {
      prefetch: true,
      query: LINKS,
      result({ data, loading, networkStatus }) {
        if (!loading && networkStatus === 7) {
          this.setLinksList(data.links)
          this.$store.commit('SET_TITLE', '友人帐')
        }
      }
    }
  },
  computed: {
    ...mapState('article', {
      details: (state) => state.details
    }),
    ...mapState('links', {
      list: (state) => state.list
    })
  },
  destroyed() {
    this.setDetails({})
    this.setLinksList([])
    this.$store.commit('SET_TITLE', 'lee的小窝')
  },
  methods: {
    ...mapActions('article', ['setDetails']),
    ...mapActions('links', ['setLinksList'])
  }
}
</script>

<style scoped></style>
