<template>
  <v-app>
    <!-- 左侧菜单 -->
    <layout-drawer v-model="drawer" />

    <v-app-bar
      dark
      app
      shrink-on-scroll
      elevate-on-scroll
      fade-img-on-scroll
      prominent
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
        <transition name="scroll-y-transition" mode="out-in">
          <nuxt />
        </transition>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
// import gql from 'graphql-tag'
import drawer from '../components/layout/drawer'
export default {
  components: { 'layout-drawer': drawer },
  data() {
    return {
      drawer: false
    }
  }
}
</script>
