<template>
  <div id="app">
    <navigation></navigation>
    <router-view/>
  </div>
</template>

<script>
  import { JSON_TOKEN } from  './constants'
  import Navigation from '@/components/Core/Navigation/Navigation' // Import the navigation into the base app
  export default {
    name: 'App',
    data() {
      return {
        token: ''
      }
    },
    mounted() {
//      Emitter.$on('tokenReceived', (token) => {
//        localStorage.setItem(JSON_TOKEN, JSON.stringify(token))
//        this.token = token
//        window.location.href = '/'
//      });
//      this.token = JSON.parse(localStorage.getItem(JSON_TOKEN))
    },
    components: {
      Navigation
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');

  label, p, button, a, span {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
