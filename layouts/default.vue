<template>
  <v-app dark>
    <v-navigation-drawer
      app
      clipped
      floating
      v-model="drawer"
    >
      <v-list
        dense
        nav
        rounded
      >
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="http://q1.qlogo.cn/g?b=qq&nk=1982890538&s=100">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>lee</v-list-item-title>
            <v-list-item-subtitle>
              oo.ee.ooe.teeoo@gmail.com
            </v-list-item-subtitle>
          </v-list-item-content>
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
        <v-subheader>组成</v-subheader>
      </v-list>
      <template v-slot:append>
        <v-tooltip
          :key="index"
          top
          v-for="(data,index) in rss"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              text
              small
              v-on="on"
            >
              <v-icon left>{{data.icon}}</v-icon> {{data.text}}
            </v-btn>
          </template>
          <span>{{data.tooltip}}</span>
        </v-tooltip>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      app
      dark
      elevate-on-scroll
      clipped-left
      color="deep-purple accent-4"
    >
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Lee's Blog</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      app
      inset
      padless
      flat
      absolute
    >
      <!-- TODO: -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      nav: [
        { icon: "home", text: "首页", link: "/" },
        { icon: "bookmark", text: "分类", link: "category" },
        { icon: "local_offer", text: "标签", link: "tags" }
      ],
      rss: [
        {
          icon: "rss_feed",
          text: "文章",
          tooltip: "文章RSS地址"
        },
        {
          icon: "rss_feed",
          text: "评论",
          tooltip: "评论RSS地址"
        }
      ]
    };
  }
};
</script>
