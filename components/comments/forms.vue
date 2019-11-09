<template>
  <div>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="text"
              prepend-icon="textsms"
              rows="1"
              auto-grow
              label="快来写下你的骚操作吧"
              :rules="textRules"
              append-icon="emoji_emotions"
              counter
              @click:append="alert('骚瑞,这里还没写哦')"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="username"
              counter="8"
              prepend-icon="account_circle"
              label="昵称"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :md="links ? 6 : 12"
            xs="12"
            sm="12"
          >
            <v-text-field
              v-model="email"
              prepend-icon="email"
              label="邮箱"
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
              v-model="link"
              prepend-icon="link"
              label="网站（如果有）http(s)://"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="links = !links"
      >
        <v-icon>link</v-icon>
      </v-btn>
      <v-btn
        text
        dark
        color="pink"
        @click="push"
      >提交</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { PUSHCOMMENTS } from '../../graphql/mutations'

export default {
  name: 'Forms',
  data() {
    return {
      valid: true,
      username: '',
      nameRules: [(v) => !!v || '昵称不能为空!', (v) => v.length <= 8 || '昵称不能太长了哦!'],
      email: '',
      emailRules: [(v) => !!v || '邮箱必须填写!'],
      text: '',
      textRules: [(v) => !!v || '评论内容不能为空!'],
      link: '',
      parent: undefined,
      url: '',
      links: false,
      imageUrl: require('../../static/icon.png')
    }
  },
  computed: {
    ...mapState('article', {
      details: (state) => state.details
    })
  },
  methods: {
    ...mapActions('article', ['updateDetails']),
    async push() {
      if (this.$refs.form.validate()) {
        try {
          const result = await this.$apollo.mutate({
            mutation: PUSHCOMMENTS,
            variables: {
              data: {
                url: this.link,
                email: this.email,
                username: this.username,
                text: this.text.replace(/\n/g, '<br>'),
                article: this.details.id,
                parent: undefined
              }
            }
          })
          this.updateDetails(result.data.PushComments)
        } catch (e) {
          this.$bus.$emit('snackbar', { snackbar: true, text: JSON.stringify(e) })
        }
      }
    }
  }
}
</script>

<style scoped></style>
