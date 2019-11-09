<template>
  <v-app>
    <v-snackbar v-model="snackbar" right top>
      {{ text }}
      <v-btn text @click="snackbar = false">
        关闭
      </v-btn>
    </v-snackbar>
    <audio v-show="false" ref="audio" src="/ready.ogg" autoplay controls>
      <p>Your browser does not support the <code>audio</code> element.</p>
    </audio>
    <!-- 左侧菜单 -->
    <layout-drawer v-model="drawer" />
    <!-- bar -->
    <v-app-bar dark app shrink-on-scroll elevate-on-scroll prominent color="deep-purple accent-4">
      <v-app-bar-nav-icon id="drawer" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        {{ this.$store.state.title }}
      </v-toolbar-title>
      <template v-slot:extension>
        <v-subheader>生如夏花之绚烂，死如秋叶之静美</v-subheader>
      </template>
      <!--      <v-spacer></v-spacer>-->
      <!--      <v-text-field flat label="查找" prepend-inner-icon="search" solo-inverted></v-text-field>-->
      <!--      <v-spacer></v-spacer>-->
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <transition name="fade-transform" mode="out-in">
          <div v-if="$nuxt.isOffline">
            <v-overlay absolute>
              <v-row class="fill-height" align-content="center" justify="center">
                <v-col class="subtitle-1 text-center" cols="12">
                  You are offline
                </v-col>
                <v-col cols="6">
                  <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
                </v-col>
              </v-row>
            </v-overlay>
          </div>
          <nuxt />
        </transition>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Prism from 'prismjs'
import Favico from 'favico.js'
import drawer from '../components/layout/drawer/drawer'
export default {
  name: 'Layout',
  components: {
    'layout-drawer': drawer
  },
  data() {
    return {
      snackbar: false,
      drawer: false,
      backTopShow: false,
      text: ''
    }
  },
  created() {
    if (process.browser) {
      this.$bus.$on('snackbar', (data) => {
        this.snackbar = data.snackbar
        this.text = data.text
      })
    }
  },
  updated() {
    Prism.highlightAll()
  },
  mounted() {
    if (process.browser) {
      Prism.highlightAll()
      document.addEventListener(
        'visibilitychange',
        (event) => {
          const isHidden = event.target.hidden || event.target.webkitHidden
          this.VisibilityChange(isHidden)
        },
        false
      )
      const copyText = `
---------------------
作者：lee
链接：${location.href}
来源：${window.location.protocol}//${window.location.host}
商业转载请联系作者获得授权，非商业转载请注明出处。`
      document.body.oncopy = (e) => {
        if (!window.getSelection) {
          return
        }
        const content = window.getSelection().toString()
        e.clipboardData.setData('text/plain', content + copyText)
        e.clipboardData.setData('text/html', content + copyText)
        e.preventDefault()
      }
    }
  },
  methods: {
    VisibilityChange(status) {
      const setTitle = (title) => {
        document.title = title
        if (title.length <= 10) {
          return false
        }
        const [first, ...content] = title.split('')
        const newTitle = [...content, first].join('')
        this.rollTimer = setTimeout(() => setTitle(newTitle), 500)
      }
      const setFavicon = (link) => {
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
  }
}
</script>
