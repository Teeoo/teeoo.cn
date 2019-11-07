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
      <v-article-details
        :loading="this.$apollo.loading"
        type="card-avatar, article,article"
      >
        <v-card
          :loading="this.$apollo.loading"
          flat
          class="markdown"
        >
          <div v-if="ArticleById">
            <v-img
              lazy-src="https://s2.ax1x.com/2019/10/26/KBflQK.md.png"
              class="white--text align-end"
              height="300px"
              :src="this.ArticleById.cover?this.ArticleById.cover:'https://api.ixiaowai.cn/api/api.php'"
            ><span class="source">原创</span>
              <v-card-title
                class="text-center"
                style="background:rgba(0, 0, 0, 0.4);"
              >
                {{this.ArticleById.title}}
              </v-card-title>
            </v-img>
            <v-card-text
              v-viewer="{movable: false}"
              v-html="this.ArticleById.html"
            >
            </v-card-text>
            <v-card-subtitle class="text-center">
              <blockquote>
                <p>
                  <strong>
                    本文链接：
                    <a :href="url">{{url}}</a>
                  </strong>
                  <br>
                  <strong>
                    本文采用
                    <a
                      href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh"
                      target="_blank"
                      rel="noopener"
                    >CC BY-NC-SA 3.0 Unported</a> 协议进行许可
                  </strong>
                </p>
              </blockquote>
              <v-btn icon>
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
            </v-card-subtitle>
          </div>
        </v-card>
        <div v-if="ArticleById">
          <v-card
            flat
            class="mt-4"
          >
            <v-menu transition="scale-transition">
              <template v-slot:activator="{ on }">
                <v-btn
                  dark
                  icon
                  left
                  color="deep-purple accent-4"
                  style="top: -20px;left: -10px;"
                  v-on="on"
                >
                  <v-icon>share</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>collections</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>生成分享截图</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card>
          <v-card
            flat
            class="mt-4"
          >
            <v-subheader>赏赞支持
            </v-subheader>
          </v-card>
          <v-card
            flat
            class="mt-4"
          >
            <v-subheader>相关推荐
            </v-subheader>
            <!-- <v-divider inset></v-divider> -->
          </v-card>
          <CommentsList :comments="this.ArticleById.comments"/>
          <Comments :aid="ArticleById.id"/>
        </div>
      </v-article-details>
    </v-col>
  </v-row>
</template>

<script>
  import '@/assets/markdown.styl'
  import Comments from '../../components/comments/index'
  import Comments_list from '../../components/comments/list'
  import { ARTICLEBYID } from '../../graphql/query'

  export default {
    head() {
      return {
        title: this.$store.state.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: '生如夏花之绚烂，死如秋叶之静美'
          }
        ]
      }
    },
    components: {
      'CommentsList': Comments_list,
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
            if (this.ArticleById && networkStatus === 7) {
              this.$store.commit('setTitle', { title: this.ArticleById.title })
            }
          }
        }
      }
    },
    created() {
      if (process.browser) {
        this.$bus.$on('push', (data) => {
          this.ArticleById.comments.push(data)
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
        this.url = `${window.location.href}`
      }
      this.$store.commit('toggle', { qrcode: true, qrcodeUrl: this.url })
    },
    destroyed() {
      this.$store.commit('toggle', { qrcode: false, qrcodeUrl: '' })
      this.$store.commit('setTitle', { title: 'Mr. Lee\'s Blog' })
    }
  }
</script>
