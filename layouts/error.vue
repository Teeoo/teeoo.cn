<template>
  <v-app id="inspire">
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card flat>
            <!-- <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>// 404 page not found.</v-toolbar-title>
              <v-spacer />
            </v-toolbar> -->
            <v-card-text>
              <pre class=" language-javascript">
                    <code class=" language-javascript" style="display: contents;">
// 404 page not found.
if (!found) {
  throw ("未找到页面，返回首页");
}
                    </code>
                  </pre>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                to="/"
                text
                color="primary"
              >返回首页</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Prism from 'prismjs'
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  mounted() {
    Prism.highlightAll()
  },
  updated() {
    Prism.highlightAll()
  }
}
</script>

<style scoped>
</style>
