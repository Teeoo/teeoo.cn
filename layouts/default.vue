<template>
  <v-app>
    <canvas class="fireworks" style="position:fixed;left:0;top:0;z-index:99999999;pointer-events:none;"></canvas>
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
      temporary
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
          <v-tab
            nuxt
            v-for="(mune,index) in munes"
            :key="index"
          >
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
      <template v-slot:append>
        <v-row>
          <v-col
            class="text-center"
            cols="4"
          >
            <v-btn
              small
              text
            >
              <v-icon>
                settings
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            class="text-center"
            cols="4"
          >
            <v-btn
              small
              text
            >
              <v-icon>
                rss_feed
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            class="text-center"
            cols="4"
          >
            <v-btn
              small
              text
              @click="toggle"
            >
              <v-icon>
                {{isFullscreen ? 'fullscreen_exit':'fullscreen'}}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      dark
      app
      shrink-on-scroll
      elevate-on-scroll
      prominent
      color="deep-purple accent-4"
    >
      <v-app-bar-nav-icon id="drawer" @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        {{this.$store.state.title}}
      </v-toolbar-title>
      <template v-slot:extension>
        <v-subheader>生如夏花之绚烂，死如秋叶之静美</v-subheader>
      </template>
      <v-spacer></v-spacer>
      <v-btn
        id="qrcode"
        icon
        v-show="this.$store.state.qrcode"
      >
        <v-icon>cast</v-icon>
      </v-btn>
      <v-btn icon id="search">
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
          id="back-to-top"
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
    <v-footer>
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
    <live2d></live2d>
  </v-app>
</template>

<script>
  import gql from 'graphql-tag'
  import { mapState } from 'vuex'
  import Favico from 'favico.js'
  import screenfull from 'screenfull'
  import live2d from '~/components/Live2d/Live2d.vue'
  import anime from 'animejs'

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
      live2d
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
        isFullscreen: false,
        backTopShow: false,
        rollTimer: null,
        tabs: 1,
        dialog: false,
        mini: false,
        drawer: false,
        nav: [
          { icon: 'home', text: '首页', link: '/' },
          { icon: 'bookmark', text: '分类', link: '/category' },
          { icon: 'local_offer', text: '标签', link: '/tags' }
        ],
        munes: ['菜单', '目录']
      }
    },
    computed: {
      ...mapState({
        IsToc: state => state.toc.IsToc,
        toc: state => state.toc.data
      })
    },
    methods: {
      toggle() {
        if (screenfull.isEnabled) {
          screenfull.toggle()
          screenfull.on('change', () => {
            this.isFullscreen = screenfull.isFullscreen
            console.log(
              'Am I fullscreen?',
              screenfull.isFullscreen ? 'Yes' : 'No'
            )
          })
          screenfull.on('error', event => {
            console.error('Failed to enable fullscreen', event)
          })
        } else {
          // Ignore or do something else
        }
      },
      handleScroll() {
        this.backTopShow =
          document.documentElement.scrollTop + document.body.scrollTop > 100
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
      },
      visibilitychange(status) {
        const setTitle = title => {
          document.title = title
          if (title.length <= 10) {
            return false
          }
          const [first, ...content] = title.split('')
          const newTitle = [...content, first].join('')
          this.rollTimer = setTimeout(() => setTitle(newTitle), 500)
        }
        const setFavicon = link => {
          let $favicon = document.querySelector('link[rel="icon"]')
          if ($favicon !== null) {
            $favicon.href = link
          } else {
            $favicon = document.createElement('link')
            $favicon.rel = 'icon'
            $favicon.href = link
            document.head.appendChild($favicon)
          }
        }
        if (status) {
          setFavicon('/favicon64.ico')
          this.$store.commit('increment')
          setTitle(`澳门首家线上赌场上线了，性感荷官在线发牌，陪你嗨翻天！`)
        } else {
          clearTimeout(this.rollTimer)
          document.title = this.$store.state.title
          setFavicon('/favicon.ico')
        }
        const favicon = new Favico({
          type: 'rectangle',
          animation: 'slide',
          bgColor: '#5CB85C',
          textColor: '#ff0'
        })
        favicon.badge(this.$store.state.counter)
      }
    },
    created() {
      if (process.browser) {
        document.addEventListener(
          'visibilitychange',
          event => {
            const isHidden = event.target.hidden || event.target.webkitHidden
            this.visibilitychange(isHidden)
          },
          false
        )
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
      document.body.oncopy = () => {
        console.info(`博主码文字不易，要转载的话记得留一个本站的链接哦……`)
      }
    }
  }
</script>
<style>
  .waifu {
    position: fixed;
    bottom: 0;
    z-index: 1;
    font-size: 0;
    -webkit-transform: translateY(3px);
    transform: translateY(3px);
  }

  .waifu:hover {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  .waifu-tips {
    opacity: 0;
    margin: -20px 20px;
    padding: 5px 10px;
    border: 1px solid rgba(224, 186, 140, 0.62);
    border-radius: 12px;
    background-color: rgba(236, 217, 188, 0.5);
    box-shadow: 0 3px 15px 2px rgba(191, 158, 118, 0.2);
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    animation-delay: 5s;
    animation-duration: 50s;
    animation-iteration-count: infinite;
    animation-name: shake;
    animation-timing-function: ease-in-out;
  }

  .waifu-tool {
    display: none;
    color: #aaa;
    top: 50px;
    right: 10px;
    position: absolute;
  }

  .waifu:hover .waifu-tool {
    display: block;
  }

  .waifu-tool span {
    display: block;
    cursor: pointer;
    color: #5b6c7d;
    transition: 0.2s;
  }

  .waifu-tool span:hover {
    color: #34495e;
  }

  .waifu #live2d {
    position: relative;
  }

  @keyframes shake {
    2% {
      transform: translate(0.5px, -1.5px) rotate(-0.5deg);
    }
    4% {
      transform: translate(0.5px, 1.5px) rotate(1.5deg);
    }
    6% {
      transform: translate(1.5px, 1.5px) rotate(1.5deg);
    }
    8% {
      transform: translate(2.5px, 1.5px) rotate(0.5deg);
    }
    10% {
      transform: translate(0.5px, 2.5px) rotate(0.5deg);
    }
    12% {
      transform: translate(1.5px, 1.5px) rotate(0.5deg);
    }
    14% {
      transform: translate(0.5px, 0.5px) rotate(0.5deg);
    }
    16% {
      transform: translate(-1.5px, -0.5px) rotate(1.5deg);
    }
    18% {
      transform: translate(0.5px, 0.5px) rotate(1.5deg);
    }
    20% {
      transform: translate(2.5px, 2.5px) rotate(1.5deg);
    }
    22% {
      transform: translate(0.5px, -1.5px) rotate(1.5deg);
    }
    24% {
      transform: translate(-1.5px, 1.5px) rotate(-0.5deg);
    }
    26% {
      transform: translate(1.5px, 0.5px) rotate(1.5deg);
    }
    28% {
      transform: translate(-0.5px, -0.5px) rotate(-0.5deg);
    }
    30% {
      transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    }
    32% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }
    34% {
      transform: translate(2.5px, 2.5px) rotate(-0.5deg);
    }
    36% {
      transform: translate(0.5px, -1.5px) rotate(0.5deg);
    }
    38% {
      transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    }
    40% {
      transform: translate(-0.5px, 2.5px) rotate(0.5deg);
    }
    42% {
      transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    }
    44% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }
    46% {
      transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    }
    48% {
      transform: translate(2.5px, -0.5px) rotate(0.5deg);
    }
    50% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }
    52% {
      transform: translate(-0.5px, 1.5px) rotate(0.5deg);
    }
    54% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }
    56% {
      transform: translate(0.5px, 2.5px) rotate(1.5deg);
    }
    58% {
      transform: translate(2.5px, 2.5px) rotate(0.5deg);
    }
    60% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }
    62% {
      transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    }
    64% {
      transform: translate(-1.5px, 1.5px) rotate(1.5deg);
    }
    66% {
      transform: translate(0.5px, 2.5px) rotate(1.5deg);
    }
    68% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }
    70% {
      transform: translate(2.5px, 2.5px) rotate(0.5deg);
    }
    72% {
      transform: translate(-0.5px, -1.5px) rotate(1.5deg);
    }
    74% {
      transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    }
    76% {
      transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    }
    78% {
      transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    }
    80% {
      transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
    }
    82% {
      transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
    }
    84% {
      transform: translate(-0.5px, 0.5px) rotate(1.5deg);
    }
    86% {
      transform: translate(2.5px, 1.5px) rotate(0.5deg);
    }
    88% {
      transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    }
    90% {
      transform: translate(-1.5px, -0.5px) rotate(-0.5deg);
    }
    92% {
      transform: translate(-1.5px, -1.5px) rotate(1.5deg);
    }
    94% {
      transform: translate(0.5px, 0.5px) rotate(-0.5deg);
    }
    96% {
      transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    }
    98% {
      transform: translate(-1.5px, -1.5px) rotate(-0.5deg);
    }
    0%,
    100% {
      transform: translate(0, 0) rotate(0);
    }
  }

  @font-face {
    font-family: "Flat-UI-Icons";
    src: url("~assets/font/flat-ui-icons-regular.eot");
    src: url("~assets/font/flat-ui-icons-regular.eot?#iefix") format("embedded-opentype"),
    url("~assets/font/flat-ui-icons-regular.woff") format("woff"),
    url("~assets/font/flat-ui-icons-regular.ttf") format("truetype"),
    url("~assets/font/flat-ui-icons-regular.svg#flat-ui-icons-regular") format("svg");
  }

  [class^="fui-"],
  [class*="fui-"] {
    font-family: "Flat-UI-Icons";
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .fui-cross:before {
    content: "\e609";
  }

  .fui-info-circle:before {
    content: "\e60f";
  }

  .fui-photo:before {
    content: "\e62a";
  }

  .fui-eye:before {
    content: "\e62c";
  }

  .fui-chat:before {
    content: "\e62d";
  }

  .fui-home:before {
    content: "\e62e";
  }

  .fui-user:before {
    content: "\e631";
  }
</style>

