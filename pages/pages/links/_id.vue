<template>
  <v-row
    no-gutters
    justify="center"
    align="center"
  >
    <v-col
      cols="12"
      sm="12"
      md="3"
      xs="12"
      lg="3"
      xl="3"
      v-for="(data,index) in links"
      :key="index"
    >
      <v-card flat v-show="!links.length">
        <v-card-text class="text-center">
          <v-alert
            dark
          >
            作者还没添加友联哦!
          </v-alert>
        </v-card-text>
      </v-card>
      <v-card
        class="p2-2 ma-2"
        flat
        :loading="$apollo.loading"
        hover
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">👬 左邻右舍</div>
            <v-list-item-title class="headline mb-1">
              <span class="ch" v-for="(data ,index) in data.name" :key="index">{{data}}</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{data.desc}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar
            size="64"
          >
            <v-img :src="data.logo"/>
          </v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
          <v-btn text small rounded>
            <a :href="data.url" :target="data.target">戳进去</a>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    head() {
      return {
        title: "左邻右舍",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: '生如夏花之绚烂，死如秋叶之静美'
          }
        ]
      }
    },
    apollo: {
      links: {
        query: gql`
          query{
               links{
                    id
                    order
                    desc
                    url
                    name
                    email
                    logo
                    target
                    status
               }
          }
      `,
        result({ data, loading, networkStatus }) {
        }
      }
    },
    data() {
      return {
        links: []
      }
    }
  }
</script>

<style scoped>
  .ch {
    transition: 300ms;
    position: relative;
    top: 0;
    cursor: default;
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    display: inline-block;
  }

  .ch:hover {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
  }
</style>
