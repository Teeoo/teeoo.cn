<template>
  <v-row
    no-gutters
    justify="center"
    align="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="7"
      xs="12"
    >
      <v-card
        :loading="this.$apollo.loading"
        flat
        class="markdown"
      >
        <div v-if="PagesById">
          <v-img
            lazy-src="https://s2.ax1x.com/2019/10/26/KBflQK.md.png"
            class="white--text align-end"
            height="300px"
            :src="this.PagesById.cover?this.PagesById.cover:'https://api.ixiaowai.cn/api/api.php'"
          ><span class="source">原创</span>
            <v-card-title
              class="text-center"
              style="background:rgba(0, 0, 0, 0.4);"
            >
              {{this.PagesById.title}}
            </v-card-title>
          </v-img>
          <v-card-text
            v-viewer="{movable: false}"
            v-html="this.PagesById.html"
          >
          </v-card-text>
          <hr />
          <v-card-text>
            <v-row
              no-gutters
              justify="center"
              align="center"
            >
            <v-col
              sm="12"
              md="4"
              xs="12"
              lg="4"
              xl="4"
              v-for="(data,index) in links"
              :key="index"
            >
              <v-card flat v-show="!links.length">
                <v-card-text class="text-center">
                  <v-alert
                    dark
                  >
                    作者还没添加友联哦!
                  </v-alert>
                </v-card-text>
              </v-card>
              <v-card
                class="p2-2 ma-2"
                flat
                :loading="$apollo.loading"
                hover
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">👬 左邻右舍</div>
                    <v-list-item-title class="headline mb-1">
                      <span class="tilt" v-for="(data ,index) in data.name" :key="index">{{data}}</span>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{data.desc}}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-avatar
                    size="64"
                  >
                    <v-img :src="data.logo"/>
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
        </div>
      </v-card>
      <CommentsList v-if="PagesById" :comments="this.PagesById.comments"/>
      <Comments v-if="PagesById" :aid="PagesById.id"/>
    </v-col>
  </v-row>
</template>

<script>
  import Comments from '../../../components/comments/index'
  import Comments_list from '../../../components/comments/list'
  import '@/assets/markdown.styl'
  import { LINKS, PAGESBYID } from '../../../graphql/query'
  export default {
    head() {
      return {
        title: "左邻右舍",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: '生如夏花之绚烂，死如秋叶之静美'
          }
        ]
      }
    },
    components:{
      'CommentsList': Comments_list,
      Comments,
    },
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
            // console.log({ data, loading, networkStatus })
            if (this.ArticleById && networkStatus === 7) {
              this.$store.commit('setTitle', { title: this.ArticleById.title })
            }
          }
        }
      },
      links: {
        query: LINKS,
      }
    },
    data() {
      return {
        links: []
      }
    },
    created() {
      if (process.browser) {
        this.$bus.$on('push', (data) => {
          this.PagesById.comments.push(data)
        })
        const bp = document.createElement('script')
        const curProtocol = window.location.protocol.split(':')[0]
        if (curProtocol === 'https') {
          bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
        } else {
          bp.src = 'http://push.zhanzhang.baidu.com/push.js'
        }
        const s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(bp, s)
      }
    },
  }
</script>
