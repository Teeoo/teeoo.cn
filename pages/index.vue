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
            lazy-src="https://s2.ax1x.com/2019/10/26/KBflQK.md.png"
            aspect-ratio="1"
            src="https://api.ixiaowai.cn/api/api.php"
          >
            <span class="source d-lg-none">
            原创
          </span>
            <v-card-title>
              <v-chip
                v-if="data.isTop"
                color="secondary"
                class="ma-2"
                small
                label
                dark
              >
                置顶
              </v-chip>
              {{data.title}}
            </v-card-title>
          </v-img>
          <v-card-subtitle>
            <a>{{data.category.label}}</a> / {{data.createdAt | prettyDate}} / 0 条评论
          </v-card-subtitle>
          <v-card-text>{{ data.html | summary }} ···
            <v-btn :to="`archives/${data.id}`" color="deep-purple accent-4" small text>阅读全文</v-btn>
          </v-card-text>
        </v-card>
        <span class="datecircle d-none d-lg-block d-print-block">
          <span class="month">{{getMonth(data.createdAt)}}月</span>
          <span class="day">{{getDate(data.createdAt)}}</span>
        </span>
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
  import { mapMutations } from 'vuex'

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
        snackbar: false,
        article: []
      }
    },
    methods: {
      getMonth(data) {
        const date = new Date(data)
        const month = date.getMonth()
        return month + 1
      },
      getDate(data) {
        const date = new Date(data)
        const m = date.getDate()
        return m
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

  .datecircle {
    background-color: #6b69d6;
    border-color: #6b69d6;
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 100%;
    left: -35px;
    top: -25px;
    color: #fff;
    padding-top: 10px;
  }

  .month {
    text-align: center;
    display: block;
  }

  .day {
    display: block;
    text-align: center;
    font-weight: 700;
    margin-top: 3px;
  }

  .source {
    position: absolute;
    background-color: #6b69d6;
    border-color: #6b69d6;
    top: -8px;
    left: -28px;
    display: block;
    width: 80px;
    height: 42px;
    line-height: 58px;
    transform: rotate(-45deg);
    text-align: center;
    font-size: 12px;
  }

</style>
