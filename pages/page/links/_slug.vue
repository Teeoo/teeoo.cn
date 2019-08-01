<template>
  <v-container>
    <v-overlay v-if="$apollo.queries.getPagesBySlug.loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-layout
      v-if="!$apollo.queries.getPagesBySlug.loading && !$apollo.queries.links.loading && getPagesBySlug && links"
      row
      justify-center
      align-center
    >
      <v-flex
        xs12
        sm12
        md3
        lg3
        xl3
        :key="index"
        v-for="(item,index) in links"
      >
        <v-card
          class="p2-2 ma-2"
          hover
          flat
        >
          <v-card-title primary-title>
            <v-layout
              align-center
              justify-center
            >
              <v-avatar size="86">
                <img
                  :src="item.logo"
                  :alt="item.name"
                >
              </v-avatar>
            </v-layout>
          </v-card-title>
          <v-layout
            align-center
            justify-center
          >
            <h3 class="headline">{{item.name}}</h3>
          </v-layout>
          <v-card-text>
            <v-layout
              align-center
              justify-center
            >
              <v-subheader>{{item.desc}}</v-subheader>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-layout
              align-center
              justify-center
            >
              <a
                :href="item.url"
                :target="item.target"
              >
                <v-btn
                  text
                  small
                >戳Ta下</v-btn>
              </a>
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
    getPagesBySlug() {
      return {
        prefetch: true,
        query: gql`
          query($slug: String!) {
            getPagesBySlug(slug: $slug) {
              id
              title
              slug
              cover
              summary
              text
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
        update(data) {
          this.$store.commit("option/setTitle", data.getPagesBySlug.title);
          //   this.$store.commit(
          //     "option/setSubheader",
          //     data.getPagesBySlug.summary
          //   );
          this.$store.commit("option/setQrcode", true);

          return data.getPagesBySlug;
        }
      };
    },
    links() {
      return {
        prefetch: true,
        query: gql`
          query {
            links {
              id
              url
              name
              email
              logo
              target
              desc
              status
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
    const data =
      !this.$apollo.queries.getPagesBySlug.loading && this.getPagesBySlug
        ? this.getPagesBySlug.title
        : null;
    return {
      title: data,
      titleTemplate: "%s - Yay!"
    };
  },
  data() {
    return { link: false };
  },
  methods: {}
};
</script>
<style>
</style>