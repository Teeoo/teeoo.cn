<template>
  <v-container>
    <v-layout
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
            src="https://acg.toubiec.cn/random.php"
            :height="280"
          />
          <v-card-title>{{data.title}}</v-card-title>
          <v-card-text>

          </v-card-text>
          <v-card-text>

          </v-card-text>
          <v-card-actions>

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
        `,
        prefetch: true,
        loadingKey: "loading",
        fetchPolicy: "cache-and-network"
      };
    }
  },
  head() {
    return {
      title: "幸有你来,不悔初见"
    };
  },
  data() {
    return {
      loading: 0,
      getArticle: "",
      card_text: "Lorem i"
    };
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