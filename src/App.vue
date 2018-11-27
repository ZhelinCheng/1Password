<template>
  <div id="app">
    <Password />
  </div>
</template>

<script>
import Password from './components/Password.vue'

export default {
  name: 'app',
  components: {
    Password
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
