<template lang="html">
  <div v-if="loading" class="loading active">
    <span class="bar"></span>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading {
  position: relative;
  height: 3px;
  margin-bottom: -3px;
}

.loading .bar {
  position: absolute;
  width: 100%;
  height: 0;
  text-indent: -9999px;
  background-color: #23b7e5;
}

.loading .bar:before {
  position: absolute;
  right: 50%;
  left: 50%;
  height: 3px;
  background-color: inherit;
  content: '';
}

.loading.active {
  -webkit-animation: changebar 2.25s infinite 0.75s;
  -moz-animation: changebar 2.25s infinite 0.75s;
  animation: changebar 2.25s infinite 0.75s;
}

.loading.active .bar {
  -webkit-animation: changebar 2.25s infinite;
  -moz-animation: changebar 2.25s infinite;
  animation: changebar 2.25s infinite;
}

.loading.active .bar:before {
  -webkit-animation: movingbar 0.75s infinite;
  -moz-animation: movingbar 0.75s infinite;
  animation: movingbar 0.75s infinite;
}
@-webkit-keyframes changebar {
  0% {
    background-color: #23b7e5;
  }

  33.3% {
    background-color: #23b7e5;
  }

  33.33% {
    background-color: #fad733;
  }

  66.6% {
    background-color: #fad733;
  }

  66.66% {
    background-color: #7266ba;
  }

  99.9% {
    background-color: #7266ba;
  }
}

@-moz-keyframes changebar {
  0% {
    background-color: #23b7e5;
  }

  33.3% {
    background-color: #23b7e5;
  }

  33.33% {
    background-color: #fad733;
  }

  66.6% {
    background-color: #fad733;
  }

  66.66% {
    background-color: #7266ba;
  }

  99.9% {
    background-color: #7266ba;
  }
}

@keyframes changebar {
  0% {
    background-color: #23b7e5;
  }

  33.3% {
    background-color: #23b7e5;
  }

  33.33% {
    background-color: #fad733;
  }

  66.6% {
    background-color: #fad733;
  }

  66.66% {
    background-color: #7266ba;
  }

  99.9% {
    background-color: #7266ba;
  }
}
</style>
