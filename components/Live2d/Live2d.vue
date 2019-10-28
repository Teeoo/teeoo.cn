<template>
  <div class="waifu">
    <div class="waifu-tips"></div>
    <canvas
      id="live2d"
      class="live2d"
    ></canvas>
    <div class="waifu-tool">
      <span class="fui-home"></span>
      <span class="fui-chat"></span>
      <span class="fui-eye"></span>
      <span class="fui-user"></span>
      <span class="fui-photo"></span>
      <span class="fui-info-circle"></span>
      <span class="fui-cross"></span>
    </div>
  </div>
</template>
<script>
  import tips from './tips'

  export default {
    name: 'live2d',
    data() {
      return {}
    },
    methods: {
      handleMove() {
      }
    },
    mounted() {
      live2d_settings['waifuDraggable'] = 'axis-x'
      live2d_settings['waifuFontSize'] = '14px'
      live2d_settings['waifuToolFont'] = '1rem'
      initModel(tips)
    }
  }
</script>
