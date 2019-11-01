<template>
  <v-app>
    <!-- 搜索 -->
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
    <!-- 左侧菜单 -->
    <layout-drawer v-model="drawer"/>
    <!-- bar -->
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
      <v-btn icon id="search">
        <v-icon @click="dialog=true">search</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <transition name="fade-transform" mode="out-in">
          <div v-if="$nuxt.isOffline">You are offline</div>
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
    <!-- footer -->
    <layout-footer/>
  </v-app>
</template>

<script>
  import drawer from '../components/layout/drawer/drawer'
  import footer from '../components/layout/footer/footer'
  import Favico from 'favico.js'
  import { mapState } from 'vuex'

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
      'layout-footer': footer,
      'layout-drawer': drawer
    },
    data() {
      return {
        backTopShow: false,
        rollTimer: null,
        dialog: false,
        drawer: false
      }
    },
    computed: {
      ...mapState({})
    },
    watch: {},
    methods: {
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

