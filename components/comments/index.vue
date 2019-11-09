<template>
  <v-card flat>
    <v-card-title v-if="count">{{ count }} 条评论</v-card-title>
    <v-card-text v-else class="text-center">
      还没有评论哦!快来抢沙发吧 🤣🤣
    </v-card-text>
    <List />
    <v-card-title>发表评论</v-card-title>
    <Forms />
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import List from './list'
import Forms from './forms'
export default {
  name: 'Comments',
  components: { Forms, List },
  computed: {
    ...mapGetters('article', ['count'])
  }
}
</script>

<style scoped></style>
