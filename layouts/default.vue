<template>
  <v-app>
    <v-dialog
      v-model="dialog"
      open-on-hover
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card flat>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-dialog>
    <v-navigation-drawer
      app
      floating
      v-model="drawer"
      :mini-variant.sync="mini"
    >
      <v-list
        dense
        nav
        rounded
      >
        <v-list-item>
          <v-list-item-avatar>
            <img src="http://q1.qlogo.cn/g?b=qq&nk=1982890538&s=100">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>lee</v-list-item-title>
            <v-list-item-subtitle>
              oo.ee.ooe.teeoo@gmail.com
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-btn
            icon
            @click.stop="mini = !mini"
            small
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-item>
        <div v-show="!IsToc">
          <v-subheader>导航</v-subheader>
          <v-list-item
            :key='index'
            v-for="(data,index) in nav"
            link
            :to="data.link"
          >
            <v-list-item-icon>
              <v-icon>{{data.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{data.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-skeleton-loader
            :loading="this.$apollo.loading"
            type="list-item-two-line"
          >
            <v-subheader v-show="!$apollo.loading && pages.length">组成</v-subheader>
            <v-list-item
              v-show="!$apollo.loading && pages.length"
              :key='data.id'
              v-for="data in pages"
              link
              :to="data.id"
            >
              <v-list-item-icon>
                <v-icon
                  v-for="icon in data.fields"
                  :key="icon.id"
                  v-show="icon.name==='icon'"
                >{{icon.value}}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{data.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-skeleton-loader>
        </div>
        <v-tabs
          fixed-tabs
          v-model="tabs"
          v-show="IsToc"
        >
          <v-tab nuxt v-for="(mune,index) in munes" :key="index">
            {{ mune }}
          </v-tab>
          <v-tabs-items v-model="tabs">
            <v-tab-item :key="0">
              <v-subheader>导航</v-subheader>
              <v-list-item
                :key='index'
                v-for="(data,index) in nav"
                link
                :to="data.link"
              >
                <v-list-item-icon>
                  <v-icon>{{data.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{data.text}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-skeleton-loader
                :loading="this.$apollo.loading"
                type="list-item-two-line"
              >
                <v-subheader v-show="!$apollo.loading && pages.length">组成</v-subheader>
                <v-list-item
                  v-show="!$apollo.loading && pages.length"
                  :key='data.id'
                  v-for="data in pages"
                  link
                  :to="data.id"
                >
                  <v-list-item-icon>
                    <v-icon
                      v-for="icon in data.fields"
                      :key="icon.id"
                      v-show="icon.name==='icon'"
                    >{{icon.value}}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{data.title}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-skeleton-loader>
            </v-tab-item>
            <v-tab-item :key="1">
              <v-list
                nav
                dense
              >
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="(item, i) in toc"
                    :key="i"
                    nuxt
                    :to="{hash: '#'+item.anchor}"
                  >
                    <v-list-item-icon>
                      <v-icon>{{i}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.content"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      dark
      app
      shrink-on-scroll
      elevate-on-scroll
      prominent
      color="deep-purple accent-4"
    >
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        {{this.$store.state.title}}
      </v-toolbar-title>
      <template v-slot:extension>
        <v-subheader>生如夏花之绚烂，死如秋叶之静美</v-subheader>
      </template>
      <v-spacer></v-spacer>
      <v-btn icon v-show="this.$store.state.qrcode">
        <v-icon>cast</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon @click="dialog=true">search</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <transition name="scroll-y-transition">
          <nuxt/>
        </transition>
      </v-container>
      <v-fab-transition>
        <v-btn
          v-show="backTopShow"
          @click="backTop"
          fixed
          dark
          fab
          bottom
          right
          color="pink"
        >
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-content>
    <v-footer
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="py-4 text-center"
          cols="12"
          sm="6"
          md="6"
          xs="12"
        >
          &copy; {{ new Date().getFullYear() }} · <strong>lee</strong>
          蜀ICP备18011318号-1
        </v-col>
        <v-col
          class="py-4 text-center d-none d-lg-block d-print-block"
          cols="12"
          sm="6"
          md="6"
          xs="12"
        >
          <v-icon>home</v-icon>
          <v-icon>email</v-icon>
          <v-icon>rss_feed</v-icon>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
  import gql from 'graphql-tag'
  import { mapState } from 'vuex'

  export default {
    head() {
      return {
        title: this.$store.state.title,
        meta: [
          { hid: 'description', name: 'description', content: '生如夏花之绚烂，死如秋叶之静美' }
        ]
      }
    },
    apollo: {
      pages: {
        query: gql`
        query {
          pages {
            id
            title
            slug
            template
            fields {
              id
              name
              value
            }
          }
        }
      `,
        result({ data, loading, networkStatus }) {
          // console.log({ data, loading, networkStatus })
        }
      }
    },
    data() {
      return {
        backTopShow: false,
        tabs: 1,
        dialog: false,
        mini: false,
        drawer: true,
        nav: [
          { icon: 'home', text: '首页', link: '/' },
          { icon: 'bookmark', text: '分类', link: '/category' },
          { icon: 'local_offer', text: '标签', link: '/tags' }
        ],
        munes: [
          '菜单', '目录'
        ]
      }
    },
    computed: {
      ...mapState({
        IsToc: state => state.toc.IsToc,
        toc: state => state.toc.data
      })
    },
    methods: {
      goAnchor(selector) {
        const anchor = this.$el.querySelector(selector)
        document.querySelector('#app').scrollTop = this.$el.querySelector(selector).offsetTop
      },
      handleScroll() {
        if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
          this.backTopShow = true
        } else {
          this.backTopShow = false
        }
      },
      backTop() {
        let back = setInterval(() => {
          if (document.body.scrollTop || document.documentElement.scrollTop) {
            document.body.scrollTop -= 100
            document.documentElement.scrollTop -= 100
          } else {
            clearInterval(back)
          }
        })
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    }
  }
</script>

