<template>
  <v-card
    flat
    class="mt-4"
  >
    <div v-for="(data,index) in comments" :key="index">
      <v-list-item three-line>
        <v-list-item-avatar>
          <v-img :src="data.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{data.username}}
            <v-btn
              small
              rounded
              text
              color="deep-purple accent-4"
            >
              回复
            </v-btn>
          </v-list-item-title>
          <v-list-item-subtitle>{{data.createdAt | prettyDate}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-text v-html="data.text" class="font-weight-medium">
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'comments_list',
    props: {
      comments: Object | Array,
      required: true
    }
  }
</script>

<style scoped>

</style>
