<template>
  <v-row
    no-gutters
    justify="center"
    align="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="6"
      xs="12"
    >
      <v-article-details
        :loading="this.$apollo.loading"
        type="card-avatar, article,article"
      >
        <v-card :loading="this.$apollo.loading" flat class="article">
          <v-img
            class="white--text align-end"
            height="220px"
            src="https://api.ixiaowai.cn/api/api.php"
          ><span class="source">
                          原创
                        </span>
            <v-card-title v-if="data">
              {{this.data.title}}
            </v-card-title>
          </v-img>
          <v-card-text v-if="data" v-html="this.data.html">
          </v-card-text>
          <v-card-subtitle class="text-center">
            <blockquote>
              <div> 本文链接：<a :href="url">{{url}}</a>
                <br> 本文采用 <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh"
                             target="_blank" rel="noopener">CC BY-NC-SA 3.0 Unported</a> 协议进行许可
              </div>
            </blockquote>

          </v-card-subtitle>
        </v-card>
      </v-article-details>
    </v-col>
  </v-row>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    head() {
      return {
        title: this.$store.state.title,
        meta: [
          { hid: 'description', name: 'description', content: '生如夏花之绚烂，死如秋叶之静美' }
        ]
      }
    },
    components: {
      VArticleDetails: {
        functional: true,
        render(h, { data, props, children }) {
          return h('v-skeleton-loader', {
            ...data,
            props: {
              boilerplate: false,
              ...props
            }
          }, children)
        }
      }
    },
    apollo: {
      ArticleById() {
        return {
          prefetch: true,
          query: gql`
          query($id:String!){
             ArticleById(id:$id) {
                  id
                  order
                  desc
                  title
                  slug
                  cover
                  summary
                  text
                  html
                  toc
                  template
                  type
                  status
                  publish
                  password
                  allowComment
                  isTop
             }
        }
        `,
          variables() {
            return {
              id: String(this.$route.params.id)
            }
          },
          watchLoading(isLoading, countModifier) {
            // console.info(isLoading, countModifier)
          },
          result({ data, loading, networkStatus }) {
            // console.log({ data, loading, networkStatus })
            if (this.ArticleById && networkStatus === 7) {
              const toc = this.ArticleById.toc ? { IsToc: true, data: this.ArticleById.toc } : {
                IsToc: false,
                data: {}
              }
              this.$store.commit('toc/add', toc)
              this.$store.commit('setTitle', { title: this.ArticleById.title })
            }
          }
        }
      }
    },
    data() {
      return {
        url: ``,
        data: undefined
      }
    },
    watch: {
      ArticleById(val) {
        this.data = val
      }
    },
    created() {
      if (process.browser) {
        this.url = `${window.location.href}`
      }
      this.$store.commit('toggle', { qrcode: true })
    },
    destroyed() {
      this.$store.commit('toc/add', { IsToc: false, data: {} })
      this.$store.commit('toggle', { qrcode: false })
      this.$store.commit('setTitle', { title: 'Mr. Lee\'s Blog' })
    }
  }
</script>

<style scoped>
  .source {
    position: absolute;
    background-color: #6b69d6;
    border-color: #6b69d6;
    top: -8px;
    left: -28px;
    display: block;
    width: 80px;
    height: 42px;
    line-height: 58px;
    transform: rotate(-45deg);
    text-align: center;
    font-size: 12px;
  }
</style>
