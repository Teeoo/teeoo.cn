<template>
  <v-app dark>
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
        <v-subheader v-show="category.length!=0 || pages.length!=0 || links.length!=0">组成</v-subheader>
        <!-- 分类 -->
        <v-list-group
          prepend-icon="bookmark"
          no-action
          v-if="!$apollo.queries.category.loading && category.length!=0"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                分类
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            link
            :key="index"
            v-for="(data,index) in category"
            :to="data.slug"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{data.label}}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-chip
                color="pink"
                text-color="white"
                small
              >
                {{data.article_count}}
              </v-chip>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>

        <!-- 页面 -->
        <v-list-group
          prepend-icon="markunread_mailbox"
          no-action
          v-if="!$apollo.queries.pages.loading && pages.length!=0"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                页面
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            :key="index"
            v-for="(data,index) in pages"
            :to="pages.slug"
          >
            <v-list-item-content>
              <v-list-item-title>{{data.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <!-- 友联 -->
        <v-list-group
          prepend-icon="link"
          no-action
          v-if="!$apollo.queries.links.loading && links.length!=0"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                友联
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            :key="index"
            v-for="(data,index) in links"
          >
            <v-list-item-content>
              <v-list-item-title>{{data.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

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
      color="deep-purple accent-4"
      prominent
      shrink-on-scroll
    >
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Lee's Blog</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs
          align-with-title
          background-color="transparent"
        >
        </v-tabs>
      </template>
    </v-app-bar>
    <v-content>
      <v-container>
        <transition>
          <nuxt />
        </transition>
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
    <live2d></live2d>
  </v-app>
</template>

<script>
import gql from "graphql-tag";
import live2d from "~/components/live2d";
export default {
  components: {
    live2d
  },
  apollo: {
    category: {
      query: gql`
        query {
          category {
            label
            slug
            article_count
          }
        }
      `
    },
    pages: {
      query: gql`
        query {
          pages {
            title
            slug
          }
        }
      `
    },
    links: {
      query: gql`
        query {
          links {
            url
            name
            target
          }
        }
      `
    }
  },
  transition: "",
  data() {
    return {
      mdata: {
        name: "model0",
        model: "/models/green2/model0.moc",
        textures: ["/models/green2/model0.2048/texture_00.png"]
      },
      mini: false,
      drawer: false,
      pages: [],
      links: [],
      category: [],
      nav: [
        { icon: "home", text: "首页", link: "/" },
        { icon: "bookmark", text: "分类", link: "/category" },
        { icon: "local_offer", text: "标签", link: "/tags" }
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
  },
  methods: {
    handleMove(live2dModel) {}
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s linear;
  -webkit-transition: all 0.4s linear;
  -webkit-transform: translate3d(-20px, 0px, 0);
  transform: translate3d(-20px, 0px, 0);
}
</style>

