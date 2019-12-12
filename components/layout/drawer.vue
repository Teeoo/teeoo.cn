<template>
  <v-navigation-drawer
    app
    floating
    :value="value"
    :mini-variant.sync="mini"
    @input="$emit('input', $event)"
  >
    <v-list dense nav rounded>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            src="https://s.gravatar.com/avatar/54ed5f99a080b72b65da031c53d44578?s=100&r=x&d=retro"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>lee</v-list-item-title>
          <v-list-item-subtitle>oo.ee.ooe.teeoo@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
        <v-btn icon small @click.stop="mini = !mini">
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-list-item>
      <v-text-field
        class="d-lg-none"
        flat
        label="查找"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>
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
        :loading="$apollo.loading"
        type="list-item-two-line"
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
</template>

<script>
import screenfull from 'screenfull'
import gql from 'graphql-tag'
export default {
  name: 'Drawer',
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
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page: [],
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
    }
  }
}
</script>

<style scoped></style>
