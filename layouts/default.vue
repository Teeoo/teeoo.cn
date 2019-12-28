<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app floating>
      <v-img
        src="https://tva4.sinaimg.cn/large/0072Vf1pgy1foxlogttvbj31hc0u0dyf.jpg"
      >
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-list dense nav rounded>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://teeoo.cn/favicon.ico"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>lee</v-list-item-title>
                <v-list-item-subtitle
                  >oo.ee.ooe.teeoo@gmail.com</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </v-img>
      <v-list dense nav rounded>
        <v-subheader>导航</v-subheader>
        <v-list-item
          v-for="(data, index) in nav"
          :key="index"
          link
          :to="data.link"
        >
          <v-list-item-icon>
            <v-icon>{{ data.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ data.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader v-show="page.length !== 0">页面</v-subheader>
        <v-skeleton-loader
          v-for="data in page"
          :key="data.id"
          :loading="$apollo.queries.page.loading"
          transition="fade"
          type="list-item-avatar"
        >
          <v-list-item link :to="`/page/${data.template}/${data.id}`">
            <v-list-item-icon>
              <v-icon
                v-for="icon in data.fields"
                v-show="icon.name === 'icon'"
                :key="icon.id"
                >{{ icon.value }}</v-icon
              >
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ data.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-skeleton-loader>
        <v-subheader>统计</v-subheader>
        <v-list-item
          v-for="(data, index) in statistics"
          :key="`${index}${new Date().valueOf()}`"
        >
          <v-list-item-content>
            <v-list-item-title>{{ data.text }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>
            <v-chip label small color="red" text-color="white">{{
              data.label
            }}</v-chip>
          </v-list-item-action-text>
        </v-list-item>
        <v-subheader>音乐</v-subheader>
        <aplayer
          style="box-shadow: none; margin:0;"
          order="random"
          :audio="audio"
          :lrc-type="3"
        />
      </v-list>
      <template v-slot:append>
        <v-toolbar>
          <v-row>
            <v-col class="text-center" cols="4">
              <v-btn small text>
                <v-icon>settings</v-icon>
              </v-btn>
            </v-col>
            <v-col class="text-center" cols="4">
              <v-btn small text>
                <v-icon>rss_feed</v-icon>
              </v-btn>
            </v-col>
            <v-col class="text-center" cols="4">
              <v-btn small text @click="$q.fullscreen.toggle()">
                <v-icon>{{
                  isActive ? 'fullscreen_exit' : 'fullscreen'
                }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-toolbar>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      dark
      app
      shrink-on-scroll
      elevate-on-scroll
      fade-img-on-scroll
      color="deep-purple accent-4"
      :src="this.$store.state.cover"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ this.$store.state.title }}</v-toolbar-title>
      <template v-slot:extension>
        <v-subheader>愿你历尽千帆,归来仍是少年 </v-subheader>
      </template>
      <v-spacer></v-spacer>
      <v-text-field
        class="d-none d-lg-block d-print-block"
        flat
        label="查找"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>
      <v-spacer></v-spacer>
      <div id="widget" class="d-none d-lg-block d-print-block"></div>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <transition name="flow" mode="out-in">
          <nuxt />
        </transition>
      </v-container>
      <v-fab-transition>
        <v-btn
          v-show="fab"
          v-scroll="onScroll"
          aria-label="Scroll to top"
          bottom
          color="pink"
          dark
          fab
          fixed
          right
          title="Scroll to top"
          @click="toTop"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-content>
    <v-footer padless>
      <v-row justify="center" no-gutters>
        <v-col class="lighten-2 py-4 text-center markdown" cols="12">
          Copyright © {{ new Date().getFullYear() }}
          <a href="https://teeoo.cn">teeoo.cn</a> All rights reserved.
          <v-chip small color="indigo" text-color="white">
            v1.0.0
          </v-chip>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { QSpinnerFacebook } from 'quasar'
import dayjs from 'dayjs'
import gql from 'graphql-tag'
import Prism from 'prismjs'
export default {
  apollo: {
    page: {
      prefetch: true,
      query: gql`
        query {
          page {
            id
            title
            template
            fields {
              id
              name
              value
            }
          }
        }
      `,
      variables() {
        return {
          id: String(this.$route.params.id)
        }
      }
    }
  },
  data() {
    return {
      isActive: false,
      drawer: false,
      page: [],
      nav: [
        { icon: 'home', text: '首页', link: '/' },
        { icon: 'bookmark', text: '分类', link: '/01' },
        { icon: 'local_offer', text: '标签', link: '/02' }
      ],
      statistics: [
        { text: '文章总数', label: 0 },
        { text: '评论总数', label: 0 },
        {
          text: '运行天数',
          label: parseInt(
            Math.round(
              dayjs(new Date()).diff(dayjs('2019-12-11 15:22:46'), 'day', true)
            )
          )
        }
      ],
      fab: false,
      audio: require('@/assets/netease.json')
    }
  },
  watch: {
    '$q.fullscreen.isActive'(val) {
      this.isActive = val
    },
    '$nuxt.isOffline'(val) {
      const spinner =
        typeof QSpinnerFacebook !== 'undefined'
          ? QSpinnerFacebook
          : Quasar.components.QSpinnerFacebook
      if (val) {
        this.$q.loading.show({
          spinner,
          spinnerColor: 'yellow',
          spinnerSize: 140,
          backgroundColor: 'purple',
          message: 'You are offline. Please connect to the network ... ',
          messageColor: 'black'
        })
      } else {
        this.$q.loading.hide()
      }
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
    }
  }
}
</script>
