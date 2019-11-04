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
<!--            <v-row>-->
<!--              <v-col-->
<!--                cols="12"-->
<!--                md="6"-->
<!--                xs="12"-->
<!--                sm="12"-->
<!--              >-->
<!--                <v-row-->
<!--                  justify="center"-->
<!--                  align="center"-->
<!--                >-->
<!--                  <v-img-->
<!--                    max-height="200"-->
<!--                    max-width="200"-->
<!--                    src="/img/1572506124831.png"-->
<!--                  >-->
<!--                    <div class="text-center">微信</div>-->
<!--                  </v-img>-->
<!--                </v-row>-->
<!--              </v-col>-->
<!--              <v-col-->
<!--                cols="12"-->
<!--                md="6"-->
<!--                xs="12"-->
<!--                sm="12"-->
<!--              >-->
<!--                <v-row-->
<!--                  justify="center"-->
<!--                  align="center"-->
<!--                >-->
<!--                  <v-img-->
<!--                    max-height="200"-->
<!--                    max-width="200"-->
<!--                    src="/img/1572506124832.jpg"-->
<!--                  >-->
<!--                  </v-img>-->
<!--                </v-row>-->
<!--              </v-col>-->
<!--            </v-row>-->
          </v-card>
          <v-card
            flat
            class="mt-4"
          >
            <v-subheader>相关推荐
            </v-subheader>
            <!-- <v-divider inset></v-divider> -->
          </v-card>
          <v-card
            flat
            class="mt-4"
          >
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      prepend-icon="textsms"
                      label="快来写下你的骚操作吧"
                      v-model="text"
                      :rules="textRules"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="account_circle"
                      label="昵称"
                      v-model="username"
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    :md="links?6:12"
                    xs="12"
                    sm="12"
                  >
                    <v-text-field
                      prepend-icon="email"
                      label="邮箱"
                      v-model="email"
                      :rules="emailRules"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    v-if="links"
                    cols="12"
                    md="6"
                    xs="12"
                    sm="12"
                  >
                    <v-text-field
                      prepend-icon="link"
                      label="网站（如果有）http(s)://"
                      v-model="link"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                icon
                @click="links=!links"
              >
                <v-icon>link</v-icon>
              </v-btn>
              <v-btn
                text
                dark
                color="pink"
                @click="push"
              >提交
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card
            flat
            class="mt-4"
          >
            <div v-for="(data,index) in this.ArticleById.comments" :key="index">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="data.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline">{{data.username}}</v-list-item-title>
                  <v-list-item-subtitle>{{data.createdAt | prettyDate}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-text>
                {{data.text}}
                <v-card-actions>
                  <v-btn
                    small
                    rounded
                    text
                    color="deep-purple accent-4"
                  >
                    回复
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </div>
          </v-card>
        </div>
      </v-article-details>
    </v-col>
  </v-row>
</template>

<script>
  import '@/assets/markdown.styl'
  import gql from 'graphql-tag'

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
          query: gql`
          query($id: String!) {
            ArticleById(id: $id) {
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
              updatedAt
              cover
              author {
                avatarUrl
                nickname
              }
              tags {
                id
                label
              }
              comments{
               id
               order
               desc
               createdAt
               updatedAt
               ip
               url
               email
               avatar
               username
               agent
               text
               children
               parent
              }
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
              const toc = this.ArticleById.toc
                ? { IsToc: true, data: this.ArticleById.toc }
                : {
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
        valid: true,
        username: '',
        nameRules: [
          v => !!v || '昵称不能为空!',
          v => v.length <= 10 || '昵称不能太长了哦!'
        ],
        email: '',
        emailRules: [
          v => !!v || '邮箱必须填写!',
          v => /.+@.+/.test(v) || '邮箱格式不正确!'
        ],
        text: '',
        textRules: [
          v => !!v || '评论内容不能为空!'
        ],
        link: '',
        parent: undefined,
        url: '',
        links: false,
        imageUrl: require('../../static/icon.png')
      }
    },
    watch: {},
    methods: {
      qrcode(text) {
        let QRCode = null
        if (process.browser) {
          QRCode = require('qrcodejs2')
          //  TODO:
        }
      },
      async push() {
        if (this.$refs.form.validate()) {
          try {
            const result = await this.$apollo.mutate(
              {
                mutation: gql`
              mutation($data:PushCommentsInput!){
                PushComments(data: $data) {
                        id
                        order
                        desc
                        createdAt
                        updatedAt
                        ip
                        url
                        avatar
                        email
                        username
                        agent
                        text
                        children
                        parent
                   }
              }
              `,
                variables: {
                  data: {
                    url: this.link,
                    email: this.email,
                    username: this.username,
                    text: this.text,
                    article: this.ArticleById.id,
                    parent: undefined
                  }
                }
              }
            )
            this.ArticleById.comments.push(result.data.PushComments)
          } catch (e) {
            console.info(e)
          }
        }
      }
    },
    created() {
      if (process.browser) {
        this.url = `${window.location.href}`
      }
      this.$store.commit('toggle', { qrcode: true, qrcodeUrl: this.url })
    },
    destroyed() {
      this.$store.commit('toc/add', { IsToc: false, data: {} })
      this.$store.commit('toggle', { qrcode: false, qrcodeUrl: '' })
      this.$store.commit('setTitle', { title: 'Mr. Lee\'s Blog' })
    }
  }
</script>
