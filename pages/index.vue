<template>
  <v-row
    no-gutters
    justify="center"
    align="center"
  >
    <v-snackbar
      v-model="snackbar"
    >
      假的,没数据因为我还没写完!!
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-col
      cols="12"
      sm="8"
      md="6"
      xs="12"
    >
      <v-skeleton-loader
        class="mt-4"
        :loading="$apollo.loading"
        type="card-avatar"
        v-for="data in article" :key="data.id"
      >
        <v-card
          class="article_list"
          flat
          :loading="$apollo.loading"
        >
          <v-img
            class="white--text align-end"
            height="220px"
            src="https://api.ixiaowai.cn/api/api.php"
          >
            <v-card-title>
              <v-chip
                v-if="data.isTop"
                color="secondary"
                class="ma-2"
                small
                label
              >
                置顶
              </v-chip>
              {{data.title}}
            </v-card-title>
          </v-img>
          <v-card-subtitle>
            <a>{{data.category.label}}</a> / {{data.createdAt | prettyDate}} / 0 条评论
          </v-card-subtitle>
          <v-card-text>{{ data.html | summary }} ···</v-card-text>
        </v-card>
      </v-skeleton-loader>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="12"
      xs="12"
    >
      <div class="text-center mt-8">
        <v-btn rounded color="primary" dark @click="snackbar=true">加载更多</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    apollo: {
      article() {
        return {
          prefetch: true,
          query: gql`
          query {
            article {
              id
              order
              html
              desc
              createdAt
              updatedAt
              title
              isTop
              category{
                label
              }
            }
          }
        `,
          watchLoading(isLoading, countModifier) {
            // console.info(isLoading, countModifier)
          },
          result({ data, loading, networkStatus }) {
            // console.info(data, loading, networkStatus)
          }
        }
      }
    },
    data() {
      return {
        snackbar:false,
        article: []
      }
    }
  }
</script>
<style>
  .article_list:after {
    position: absolute;
    bottom: -1px;
    left: 50%;
    width: 150px;
    margin-left: -75px;
    content: "";
    border-bottom: 2px solid #DDD;
  }
</style>
