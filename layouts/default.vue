<template>
  <v-app>
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
              >{{icon.value}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{data.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-skeleton-loader>
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
        迷失的人迷失了,相逢的人会再相逢
      </v-toolbar-title>
      <template v-slot:extension>
      </template>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>cast</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <transition name="scroll-y-transition">
          <nuxt />
        </transition>
      </v-container>
    </v-content>
    <v-footer
      dark
      app
      absolute
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

export default {
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
      mini: false,
      drawer: true,
      nav: [
        { icon: 'home', text: '首页', link: '/' },
        { icon: 'bookmark', text: '分类', link: '/category' },
        { icon: 'local_offer', text: '标签', link: '/tags' }
      ]
    }
  }
}
</script>

