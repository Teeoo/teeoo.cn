<template>
  <v-container>
    <v-overlay v-if="$apollo.queries.article.loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-layout
      v-if="!$apollo.queries.article.loading && article && article.length"
      row
      justify-center
      align-center
    >
      <v-flex
        xs12
        sm8
        md6
      >
        <v-card
          hover
          flat
          v-for="(data,index) in article"
          :key="index"
        >
          <v-img
            v-show="data.cover"
            src="https://acg.toubiec.cn/random.php"
            :height="280"
          />
          <v-card-title>{{data.title}}</v-card-title>
          <v-card-text>
            {{data.summary}} ...
          </v-card-text>
          <!-- <v-card-text>
          </v-card-text> -->
          <v-card-actions>
            <v-layout align-center>
              <v-btn
                text
                icon
                small
                color="blue lighten-2"
              >
                <v-icon small>message</v-icon>
              </v-btn>
              <span class="subheading mr-2 ">0</span>
              <span class="mr-1">·</span>
              <v-btn
                text
                small
                icon
                color="red lighten-2"
              >
                <v-icon small>timer</v-icon>
              </v-btn>
              <span class="subheading">
                {{prettyDate(data.created_at)}}
              </span>
            </v-layout>
            <v-layout
              align-center
              justify-end
            >
              <v-btn
                text
                small
                color="pink"
                :to="`archives/${data.slug}`"
              >去围观</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
export default {
  layout: "default",
  apollo: {
    article() {
      return {
        prefetch: true,
        query: gql`
          query {
            article {
              id
              title
              slug
              cover
              summary
              text
              order
              author {
                uid
                nickname
                avatar
                email
                url
                screenName
                last_login_ip
                last_login_time
                created_at
                updated_at
              }
              category {
                id
                label
                slug
                desc
                count
                article_count
                order
                children
                parent
                created_at
                updated_at
                version
              }
              tags {
                id
                label
                slug
                color
                hot
                created_at
                updated_at
                version
              }
              template
              type
              status
              publish
              password
              allowComment
              isTop
              exinfo
              created_at
              updated_at
              version
            }
          }
        `
      };
    }
  },
  head() {
    return {
      title: "幸有你来,不悔初见"
    };
  },
  data() {
    return {};
  },
  methods: {
    prettyDate(dateString) {
      const date = new Date(dateString);
      const d = date.getDate();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      const m = monthNames[date.getMonth()];
      const y = date.getFullYear();
      return d + " " + m + " " + y;
    }
  }
};
</script>
<style>
</style>