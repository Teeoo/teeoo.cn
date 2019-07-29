<template >
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex text-center>
            <!-- <img
              style="max-width: 400px"
              src="~/assets/error/bad-luck.gif"
            />
            <h1 class="display-2 font-weight-thin mb-4">Oh no, bad luck!</h1>
            <h4 class="subheading">The page you’re looking for could have been deleted or never have existed.</h4> -->
            <v-card
              class="mx-auto"
              max-width="450"
              flat
            >
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                :aspect-ratio="16/9"
              >

              </v-img>
              <v-card-title>
                <div
                  text-center
                  class="display-1 mb-2"
                >Welcome Home...</div>
                <div class="title font-weight-regular grey--text">Monday, 12:30 PM, Mostly Sunny</div>
              </v-card-title>
              <v-layout
                align-center
                px-4
                grey--text
              >
                <v-avatar
                  size="24"
                  class="mr-4"
                >
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/weather/part-cloud-48px.png"
                    contain
                  ></v-img>
                </v-avatar>

                <span>81° / 62°</span>
              </v-layout>

              <v-divider class="mt-6 mx-4"></v-divider>

              <v-card-text>
                <v-chip class="mr-2">
                  <v-icon left>mdi-brightness-5</v-icon>
                  Turn on Lights
                </v-chip>
                <v-chip class="mr-2">
                  <v-icon left>mdi-alarm-check</v-icon>
                  Set alarm
                </v-chip>
                <v-chip>
                  <v-icon left>mdi-blinds</v-icon>
                  Close blinds
                </v-chip>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  layout: "error_base"
};
</script>

<style scoped>
</style>