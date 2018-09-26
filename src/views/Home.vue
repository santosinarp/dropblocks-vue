<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <MainWindow msg="Welcome to Your Vue.js App"/> -->
    <MainWindow />
  </div>
</template>

<script>
// @ is an alias to /src
import MainWindow from '@/components/MainWindow.vue'

export default {
  name: 'home',
  components: {
    MainWindow,
  }
}
</script>
