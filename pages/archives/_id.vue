<template>
  <v-row
    no-gutters
    justify="center"
    align="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="6"
      xs="12"
    >
      <v-card flat>
        <v-img
          class="white--text align-end"
          height="220px"
          src="https://api.ixiaowai.cn/api/api.php"
        ><span class="source">
            原创
          </span>
          <v-card-title>
            我是标题
          </v-card-title>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {}
</script>

<style scoped>
  .source {
    position: absolute;
    background-color: #6b69d6;
    border-color: #6b69d6;
    top: -8px;
    left: -28px;
    display: block;
    width: 80px;
    height: 42px;
    line-height: 58px;
    transform: rotate(-45deg);
    text-align: center;
    font-size: 12px;
  }
</style>
