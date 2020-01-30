<template>
  <v-app>
    <layout-drawer v-model="drawer" />
    <v-app-bar
      style="background: linear-gradient(to right,#7a88ff,#a77ff9);"
      dark
      app
      shrink-on-scroll
      elevate-on-scroll
      fade-img-on-scroll
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>标题</v-toolbar-title>
      <template v-slot:extension>
        <v-subheader>愿你历尽千帆,归来仍是 少年</v-subheader>
        <v-progress-linear
          v-show="scroll !== '0.0'"
          v-model="scroll"
          color="#ffffff"
          absolute
          bottom
        ></v-progress-linear>
      </template>
      <v-spacer></v-spacer>
      <div id="widget"></div>
      <!-- 搜索 -->
      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        overlay-opacity="0.5"
      >
        <v-card flat>
          <v-card-text>
            <v-container>
              <v-text-field
                flat
                label="查找"
                prepend-inner-icon="search"
                solo-inverted
              ></v-text-field
            ></v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- 分享 -->
      <v-bottom-sheet
        v-model="share"
        inset
        transition="scroll-y-reverse-transition"
        overlay-opacity="0.5"
      >
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-row
                no-gutters
                justify="center"
                align="center"
                class="text-center"
              >
                <v-col cols="12">
                  <v-btn text>分享本页</v-btn>
                </v-col>
              </v-row>

              <v-row
                no-gutters
                justify="center"
                align="center"
                class="text-center"
              >
                <v-col sm="3">
                  <v-btn text icon color="pink">
                    <v-icon>image</v-icon>
                  </v-btn>
                  <v-col cols="12">
                    <p>画报</p>
                  </v-col>
                </v-col>

                <v-col sm="3">
                  <v-btn text icon color="indigo">
                    <v-icon>link</v-icon>
                  </v-btn>
                  <v-col cols="12">
                    <p>链接</p>
                  </v-col>
                </v-col>

                <v-col sm="3">
                  <v-btn text icon color="green">
                    <v-icon>mdi-wechat</v-icon>
                  </v-btn>
                  <v-col cols="12">
                    <p>微信</p>
                  </v-col>
                </v-col>

                <v-col sm="3">
                  <v-btn text icon color="deep-orange">
                    <v-icon>mdi-email</v-icon>
                  </v-btn>
                  <v-col cols="12">
                    <p>邮箱</p>
                  </v-col>
                </v-col>
              </v-row>

              <v-row
                no-gutters
                justify="center"
                align="center"
                class="text-center"
              >
                <v-col sm="3">
                  <v-btn icon>
                    <v-icon>mdi-sina-weibo</v-icon>
                  </v-btn>
                  <v-col cols="12">
                    <p>微博</p>
                  </v-col>
                </v-col>

                <v-col sm="3">
                  <v-btn icon>
                    <v-icon>mdi-star</v-icon>
                  </v-btn>
                  <v-col cols="12">
                    <p>QQ空间</p>
                  </v-col>
                </v-col>

                <v-col sm="3">
                  <v-btn icon>
                    <v-icon>mdi-twitter</v-icon>
                  </v-btn>
                  <v-col cols="12">
                    <p>推特</p>
                  </v-col>
                </v-col>

                <v-col sm="3">
                  <v-btn icon>
                    <v-icon>mdi-facebook</v-icon>
                  </v-btn>
                  <v-col cols="12">
                    <p>Facebook</p>
                  </v-col>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
      <v-btn icon @click="share = !share">
        <v-icon>keyboard_capslock</v-icon>
      </v-btn>
      <v-btn icon @click="dialog = !dialog">
        <v-icon>search</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <transition-group name="flow" mode="out-in">
          <v-overlay :key="0" :value="$nuxt.isOffline">
            <v-row class="fill-height" align-content="center" justify="center">
              <v-col class="subtitle-1 text-center" cols="12"
                >You are offline. Please connect to the network ...</v-col
              >
              <v-col cols="8">
                <v-progress-linear
                  color="deep-purple accent-4"
                  indeterminate
                  rounded
                  height="6"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </v-overlay>
          <nuxt :key="1" />
        </transition-group>
      </v-container>
      <v-fab-transition>
        <v-btn
          v-show="fab"
          v-scroll="onScroll"
          aria-label="Scroll to top"
          bottom
          color="pink"
          dark
          text
          fab
          icon
          fixed
          right
          title="Scroll to top"
          @click="toTop"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-content>
    <v-footer elevation="5" color="white" inset padless>
      <v-row justify="center" no-gutters>
        <v-col class="py-4 text-center" cols="12">
          版权所有 © {{ new Date().getFullYear() }}
          <a href="https://teeoo.cn">teeoo.cn</a> 保留所有权利.
          <p>
            <a target="_blank" href="http://beian.miit.gov.cn/"
              >蜀ICP备18011318号-1</a
            >
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import Prism from 'prismjs'
import drawer from '../components/layout/drawer'
export default {
  components: {
    'layout-drawer': drawer
  },
  data() {
    return {
      share: false,
      dialog: false,
      isActive: false,
      drawer: false,
      fab: false,
      scroll: '0.0'
    }
  },
  watch: {
    '$nuxt.isOffline'(val) {}
  },
  beforeMount() {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  beforeDestroy() {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  mounted() {
    Prism.highlightAll()
  },
  updated() {
    Prism.highlightAll()
  },
  methods: {
    onScroll() {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || document.documentElement.offsetTop || 0
      this.fab = top > 150
    },
    toTop() {
      this.$router.push({ hash: '' })
      this.$vuetify.goTo(0)
    },
    handleScroll(event) {
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.body.scrollTop +
          ((document.documentElement && document.documentElement.scrollTop) ||
            0)
      const documentHeight = document.body.clientHeight
      const windowHeight = window.innerHeight
      let scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100
      scrollPercent = scrollPercent.toFixed(1)
      this.scroll = scrollPercent
    }
  }
}
</script>
