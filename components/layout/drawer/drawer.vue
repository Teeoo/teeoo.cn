<template>
  <v-navigation-drawer app floating temporary :value="value" :mini-variant.sync="mini" @input="$emit('input', $event)">
    <v-list dense nav rounded>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://s.gravatar.com/avatar/54ed5f99a080b72b65da031c53d44578?s=100&r=x&d=retro"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>lee</v-list-item-title>
          <v-list-item-subtitle>
            oo.ee.ooe.teeoo@gmail.com
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-btn icon small @click.stop="mini = !mini">
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-list-item>
      <v-list-item v-for="(data, index) in nav" :key="index" link :to="data.link">
        <v-list-item-icon>
          <v-icon>{{ data.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ data.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-skeleton-loader v-for="data in this.$store.state.drawer.pages" :key="data.id" :loading="$apollo.loading" type="list-item-two-line">
        <v-list-item link :to="`/pages/${data.template}/${data.id}`">
          <v-list-item-icon>
            <v-icon v-for="icon in data.fields" v-show="icon.name === 'icon'" :key="icon.id">{{ icon.value }} </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ data.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-skeleton-loader>
    </v-list>
    <template v-slot:append>
      <v-row>
        <v-col class="text-center" cols="4">
          <v-btn small text>
            <v-icon>
              settings
            </v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center" cols="4">
          <v-btn small text>
            <v-icon>
              rss_feed
            </v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center" cols="4">
          <v-btn small text @click="toggle">
            <v-icon>
              {{ isFullscreen ? 'fullscreen_exit' : 'fullscreen' }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex'
import screenfull from 'screenfull'
import gql from 'graphql-tag'
export default {
  name: 'Drawer',
  apollo: {
    pages: {
      prefetch: true,
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
        if (!loading && networkStatus === 7) {
          this.setDrawerPages(data.pages)
        }
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pages: [],
      isFullscreen: false,
      mini: false,
      nav: [
        { icon: 'home', text: '首页', link: '/' },
        { icon: 'bookmark', text: '分类', link: '/01' },
        { icon: 'local_offer', text: '标签', link: '/02' }
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
    },
    ...mapActions('drawer', ['setDrawerPages'])
  }
}
</script>

<style scoped></style>
