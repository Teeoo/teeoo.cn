<template>
  <v-card
    flat
    class="mt-4"
  >
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-row>
          <v-col cols="12">
            <v-textarea
              prepend-icon="textsms"
              label="快来写下你的骚操作吧"
              v-model="text"
              :rules="textRules"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-text-field
              prepend-icon="account_circle"
              label="昵称"
              v-model="username"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :md="links?6:12"
            xs="12"
            sm="12"
          >
            <v-text-field
              prepend-icon="email"
              label="邮箱"
              v-model="email"
              :rules="emailRules"
            ></v-text-field>
          </v-col>
          <v-col
            v-if="links"
            cols="12"
            md="6"
            xs="12"
            sm="12"
          >
            <v-text-field
              prepend-icon="link"
              label="网站（如果有）http(s)://"
              v-model="link"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="links=!links"
      >
        <v-icon>link</v-icon>
      </v-btn>
      <v-btn
        text
        dark
        color="pink"
        @click="push"
      >提交
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { PUSHCOMMENTS } from '../../graphql/mutations'
  export default {
    name: 'comments',
    props: {
      aid: String,
      required: true
    },
    data() {
      return {
        valid: true,
        username: '',
        nameRules: [
          v => !!v || '昵称不能为空!',
          v => v.length <= 10 || '昵称不能太长了哦!'
        ],
        email: '',
        emailRules: [
          v => !!v || '邮箱必须填写!',
          v => /.+@.+/.test(v) || '邮箱格式不正确!'
        ],
        text: '',
        textRules: [
          v => !!v || '评论内容不能为空!'
        ],
        link: '',
        parent: undefined,
        url: '',
        links: false,
        imageUrl: require('../../static/icon.png')
      }
    },
    methods: {
      async push() {
        if (this.$refs.form.validate()) {
          try {
            const result = await this.$apollo.mutate(
              {
                mutation: PUSHCOMMENTS,
                variables: {
                  data: {
                    url: this.link,
                    email: this.email,
                    username: this.username,
                    text: this.text.replace(/\n/g,'<br>'),
                    article: this.aid,
                    parent: undefined
                  }
                }
              }
            )
            this.$bus.$emit('push', result.data.PushComments)
          } catch (e) {
            console.info(e)
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
