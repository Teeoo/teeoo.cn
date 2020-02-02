<template>
  <v-row no-gutters justify="center" align="center">
    <v-col cols="12" sm="8" md="5" xs="12">
      <v-skeleton-loader
        :loading="$apollo.queries.articleDetails.loading"
        type="article,article,image,article,list-item-avatar-three-line,list-item-avatar-three-line"
      >
        <v-card flat class="markdown">
          <v-card-text v-viewer v-html="articleDetails.html"></v-card-text>
        </v-card>
        <v-card-subtitle class="text-center">
          <blockquote>
            <p>
              <strong>
                本文链接：
                <a :href="url">{{ url }}</a>
              </strong>
              <br />
              <strong>
                本文采用
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh"
                  target="_blank"
                  rel="noopener"
                  >CC BY-NC-SA 3.0 Unported</a
                >
                协议进行许可
              </strong>
            </p>
          </blockquote>
        </v-card-subtitle>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>
<script>
import { ARTICLEDETAILS } from '../../graphql/query'
export default {
  apollo: {
    articleDetails: {
      prefetch: true,
      query: ARTICLEDETAILS,
      variables() {
        return {
          id: String(this.$route.params.id)
        }
      }
    }
  },
  data() {
    return {
      url: ``,
      links: false,
      articleDetails: {}
    }
  },
  watch: {
    articleDetails(val) {}
  },
  created() {
    if (process.browser) {
      this.url = `${location.href}`
    }
  },
  destroyed() {},
  methods: {}
}
</script>
