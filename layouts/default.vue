<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app floating>
      <v-img
        :src="
          `https://api.ixiaowai.cn/api/api.php?${Math.floor(
            Math.random() * 100
          )}`
        "
      >
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-list dense nav rounded>
            <v-list-item>
              <v-list-item-avatar>
                <v-img
                  src="https://s.gravatar.com/avatar/54ed5f99a080b72b65da031c53d44578?s=100&r=x&d=retro"
                ></v-img>
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
        <v-subheader class="d-lg-none">搜索</v-subheader>
        <v-list-item class="d-lg-none">
          <v-text-field
            flat
            label="查找"
            prepend-inner-icon="search"
          ></v-text-field>
        </v-list-item>
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
          transition="flow"
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
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>文章总数</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>
            <v-chip label small color="red" text-color="white">0</v-chip>
          </v-list-item-action-text>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>评论总数</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action-text>
            <v-chip label small color="red" text-color="white">0</v-chip>
          </v-list-item-action-text>
        </v-list-item>
      </v-list>
      <aplayer
        style="box-shadow: none; margin:0"
        order="random"
        autoplay
        :audio="audio"
        :lrc-type="3"
      />
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
              <v-btn small text @click="toggle">
                <v-icon>{{
                  isFullscreen ? 'fullscreen_exit' : 'fullscreen'
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
      src="https://api.ixiaowai.cn/api/api.php"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>生如夏花之绚烂，死如秋叶之静美</v-toolbar-title>
      <template v-slot:extension>
        <v-subheader>愿你历尽千帆,归来仍是少年</v-subheader>
      </template>
      <v-spacer></v-spacer>
      <v-text-field
        class="d-none d-lg-block d-print-block"
        flat
        label="查找"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <transition name="flow" mode="out-in">
          <nuxt />
        </transition>
      </v-container>
    </v-content>
    <!-- <v-footer app></v-footer> -->
  </v-app>
</template>

<script>
import screenfull from 'screenfull'
import gql from 'graphql-tag'
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
      drawer: false,
      page: [],
      isFullscreen: false,
      nav: [
        { icon: 'home', text: '首页', link: '/' },
        { icon: 'bookmark', text: '分类', link: '/01' },
        { icon: 'local_offer', text: '标签', link: '/02' }
      ],
      audio: [
        {
          name: '东西（Cover：林俊呈）',
          artist: '纳豆',
          url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
          cover:
            'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300',
          lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc'
        },
        {
          name: '响喜乱舞（Cover：MARiA）',
          artist: '泠鸢yousa',
          url: 'https://cdn.moefe.org/music/mp3/kyoukiranbu.mp3',
          cover:
            'https://p1.music.126.net/AUGVPQ_rVrngDH9ocQrn3Q==/109951163613037822.jpg?param=300y300',
          lrc: 'https://cdn.moefe.org/music/lrc/kyoukiranbu.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover:
            'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300',
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '伴宅日记',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/diary.mp3',
          cover:
            'https://p1.music.126.net/oW7TW0VjK5PoNjhzdPm1lw==/109951163626390573.jpg?param=300y300',
          lrc: 'https://cdn.moefe.org/music/lrc/diary.lrc'
        },
        {
          name: '童遊',
          artist: 'めらみぽっぷ',
          url: 'https://cdn.moefe.org/music/mp3/innocenttreasures.mp3',
          cover:
            'https://p1.music.126.net/tkazmUdvztqtaL-XDN4D2A==/5947258394962501.jpg?param=300y300',
          lrc: 'https://cdn.moefe.org/music/lrc/innocenttreasures.lrc'
        },
        {
          name: 'The Party We Have Never Seen',
          artist: 'Nana Takahashi',
          url: 'https://cdn.moefe.org/music/mp3/thepartywehaveneverseen.mp3',
          cover:
            'https://p1.music.126.net/IwclpJu4gaqhSZrKunEFWg==/3297435379408525.jpg?param=300y300',
          lrc: 'https://cdn.moefe.org/music/lrc/thepartywehaveneverseen.lrc'
        },
        {
          name: 'Let It Go.m3u8',
          artist: 'Idina Menzel',
          url: 'https://cdn.moefe.org/music/hls/frozen.m3u8',
          cover:
            'https://p1.music.126.net/n72JJkPg2-ENxhB-DsZ2AA==/109951163115400390.jpg?param=300y300',
          lrc: 'https://cdn.moefe.org/music/lrc/frozen.lrc'
        },
        {
          name: 'Star Sky',
          artist: 'Two Steps From Hell',
          url: 'https://cdn.moefe.org/music/mp3/starsky.mp3',
          cover:
            'https://p2.music.126.net/nJROWeZiEp1TUv27amRguQ==/18195817928618786.jpg?param=300y300',
          lrc: 'https://cdn.moefe.org/music/lrc/starsky.lrc'
        }
      ]
    }
  },
  methods: {
    toggle() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
        screenfull.on('change', () => {
          this.isFullscreen = screenfull.isFullscreen
        })
      }
    }
  }
}
</script>
