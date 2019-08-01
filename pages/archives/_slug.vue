<template>
  <v-container>
    <v-overlay v-if="$apollo.queries.getArticleBySlug.loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-layout
      v-if="!$apollo.queries.getArticleBySlug.loading && getArticleBySlug"
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
          flat
          id="main"
          class="site-main"
        >
          <v-img
            v-show="getArticleBySlug.cover"
            src="https://acg.toubiec.cn/random.php"
            :height="280"
          />
          <v-list-item>
            <v-list-item-avatar color="grey">
              <img src="http://q1.qlogo.cn/g?b=qq&nk=1982890538&s=100">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">lee</v-list-item-title>
              <v-list-item-subtitle>{{getArticleBySlug.created_at | prettyDate}}</v-list-item-subtitle>
            </v-list-item-content>
            <!-- <v-spacer></v-spacer> -->
            <!-- <v-btn
              icon
              small
            >
              <v-icon>phonelink</v-icon>
            </v-btn> -->
            <v-btn
              icon
              small
            >
              <v-icon>class</v-icon>
            </v-btn>
            <v-btn
              icon
              small
            >
              <v-icon>local_offer</v-icon>
            </v-btn>
            <v-btn
              icon
              small
            >
              <v-icon>share</v-icon>
            </v-btn>
          </v-list-item>
          <v-card-text
            class="entry-content"
            v-html="getArticleBySlug.html"
          />
          <v-card-text class="content">
            <blockquote>
              <p>
                <strong>
                  本文链接：
                  <a :href="$nuxt.$route.path">{{$nuxt.$route.path}}</a>
                </strong>
                <br>
                <strong>
                  本文采用
                  <a
                    href="https://creativecommons.org/licenses/by-nc-sa/3.0/cn/deed.zh"
                    target="_blank"
                  >CC BY-NC-SA 3.0 CN</a> 协议进行许可，阅读
                  <a href="#">相关说明</a>
                </strong>
              </p>
            </blockquote>
          </v-card-text>
        </v-card>
        <v-card
          flat
          class="mt-4"
        >
          <v-subheader>赏赞支持</v-subheader>
          <!-- <v-divider inset></v-divider> -->
        </v-card>
        <v-card
          flat
          class="mt-4"
        >
          <v-subheader>相关推荐</v-subheader>
          <!-- <v-divider inset></v-divider> -->
        </v-card>
        <v-card
          flat
          class="mt-4"
        >
          <v-card-text>
            <v-form>
              <v-container>
                <v-layout wrap>
                  <v-flex
                    xs12
                    md12
                  >
                    <v-text-field
                      prepend-icon="textsms"
                      label="快来写下你的骚操作吧"
                    ></v-text-field>
                  </v-flex>
                  <v-flex
                    xs12
                    md6
                  >
                    <v-text-field
                      prepend-icon="account_circle"
                      label="你的名字我的故事"
                    ></v-text-field>
                  </v-flex>
                  <v-flex
                    xs12
                    md6
                  >
                    <v-text-field
                      prepend-icon="email"
                      label="邮箱"
                    ></v-text-field>
                  </v-flex>
                  <v-flex
                    xs12
                    v-if="link"
                  >
                    <v-text-field
                      prepend-icon="link"
                      label="网站（如果有）http(s)://"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout
              align-center
              justify-end
            >
              <v-btn
                icon
                @click="link=!link"
              >
                <v-icon>link</v-icon>
              </v-btn>
              <v-btn
                dark
                color="pink"
              >提交</v-btn>
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
    getArticleBySlug() {
      return {
        prefetch: true,
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
        update(data) {
          this.$store.commit("option/setTitle", data.getArticleBySlug.title);
          this.$store.commit(
            "option/setSubheader",
            data.getArticleBySlug.summary
          );
          this.$store.commit("option/setQrcode", true);

          return data.getArticleBySlug;
        }
      };
    }
  },
  head() {
    const data =
      !this.$apollo.queries.getArticleBySlug.loading && this.getArticleBySlug
        ? this.getArticleBySlug.title
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