<template>
  <v-list dense nav rounded>
    <v-subheader>导航</v-subheader>
    <v-list-item
      v-for="(data, index) in nav"
      :key="index"
      :class="[index % 2 === 0 ? 'single' : 'double']"
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
      type="list-item-avatar"
    >
      <v-list-item link :to="`/pages/${data.template}/${data.id}`">
        <v-list-item-icon>
          <v-icon
            v-for="icon in data.fields"
            v-show="icon.name === 'icon'"
            :key="icon.id"
            >{{ icon.value }}
          </v-icon>
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
  </v-list>
</template>

<script>
import dayjs from 'dayjs'
import { PAGE } from '../../graphql/query'
export default {
  name: 'Nav',
  apollo: {
    page: {
      prefetch: true,
      query: PAGE
    }
  },
  data() {
    return {
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
      ]
    }
  }
}
</script>
