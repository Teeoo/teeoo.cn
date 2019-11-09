<template>
  <v-comments-list :loading="loading" type="list-item-avatar-three-line,article">
    <v-card flat>
      <div v-for="(data, index) in comments" :key="index">
        <v-list-item three-line>
          <v-list-item-avatar>
            <v-img :src="data.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >{{ data.username }}
              <v-btn small rounded text color="deep-purple accent-4">
                回复
              </v-btn>
            </v-list-item-title>
            <v-list-item-subtitle
              >{{ data.createdAt | formatDate }} {{ parser(data.agent).device.model ? parser(data.agent).device.model : parser(data.agent).os.name }}
              {{ parser(data.agent).browser.name }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-card-text class="font-weight-medium" v-html="data.text"> </v-card-text>
      </div>
    </v-card>
  </v-comments-list>
</template>

<script>
import parser from 'ua-parser-js'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'List',
  components: {
    VCommentsList: {
      functional: true,
      render(h, { data, props, children }) {
        return h(
          'v-skeleton-loader',
          {
            ...data,
            props: {
              boilerplate: false,
              ...props
            }
          },
          children
        )
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('article', {
      comments: (state) => state.details.comments
    }),
    ...mapGetters('article', ['loading'])
  },
  methods: {
    parser(str) {
      return parser(str)
    }
  }
}
</script>

<style scoped></style>
