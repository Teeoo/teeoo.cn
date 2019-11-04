<template>
  <v-navigation-drawer
    app
    floating
    temporary
    v-bind:value="value"
    v-on:input="$emit('input', $event)"
    :mini-variant.sync="mini"
  >
    <v-list
      dense
      nav
      rounded
    >
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
      <v-subheader v-if="this.pages">组成</v-subheader>
      <v-list-item
        link
        v-for="data in this.pages"
        :key="data.id"
        :to="`/pages/default/${data.id}`"
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
</template>

<script>
import screenfull from 'screenfull'
import gql from 'graphql-tag'

export default {
  name: 'layout',
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
      result({ data, loading, networkStatus }) {}
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
    }
  }
}
</script>

<style scoped>
</style>
