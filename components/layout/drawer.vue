<template>
  <v-navigation-drawer
    app
    floating
    :value="value"
    @input="$emit('input', $event)"
  >
    <v-app-bar flat color="#ffffff"> </v-app-bar>
    <div class="text-center">
      <a>
        <img
          src="https://teeoo.cn/favicon.ico"
          class="circle"
          width="100"
          style="border-radius: 50%;"
        />
      </a>
    </div>
    <div class="text-center">
      <v-btn class="name" rounded color="deep-purple accent-4" dark
        >lee 's blog</v-btn
      >
    </div>
    <Nav />
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
            <v-btn small text>
              <v-icon>{{ isActive ? 'fullscreen_exit' : 'fullscreen' }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
    </template>
  </v-navigation-drawer>
</template>

<script>
import Nav from './nav'
export default {
  name: 'Drawer',
  components: {
    Nav
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: false,
      nav: [
        { icon: 'home', text: '首页', link: '/' },
        { icon: 'bookmark', text: '分类', link: '/01' },
        { icon: 'local_offer', text: '标签', link: '/02' }
      ]
    }
  },
  methods: {}
}
</script>
