<template>
  <v-container>
    <v-layout
      row
      justify-center
      align-center
    >
      <v-overlay v-if="!article">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
      <v-flex
        v-else
        xs12
        sm8
        md6
      >
        <v-card flat>
          <v-img
            v-if="article.cover"
            src="https://acg.toubiec.cn/random.php"
            :height="280"
          />
          <v-card-title>{{article.title}}</v-card-title>
          <v-card-text v-html="article.html" />
          <!-- getArticleBySlug -->
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
    getArticleBySlug() {
      return {
        query: gql`
          query($slug: String!) {
            getArticleBySlug(slug: $slug) {
              id
              title
              slug
              cover
              summary
              html
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
        variables() {
          return {
            slug: String(this.$route.params.slug)
          };
        },
        result(result) {
          this.article = result.data.getArticleBySlug;
        },
        prefetch: true
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
      article: undefined,
      loading: 0,
      getArticleBySlug: null,
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