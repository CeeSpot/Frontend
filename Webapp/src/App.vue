<template>
  <div id="app">
    <navigation v-if="!showHomeNav"></navigation>
    <div id="main" role="main">
      <router-view/>
    </div>
    <div id="footer" class="footer">
      <page-footer></page-footer>
    </div>
  </div>
</template>

<script>
  import { JSON_TOKEN } from  './constants'
  import Navigation from '@/components/Core/Navigation/Navigation' // Import the navigation into the base app
  import PageFooter from '@/components/Core/Footer/PageFooter'
  export default {
    name: 'App',
    data() {
      return {
        token: '',
        showHomeNav: false
      }
    },
    mounted() {
      if(this.$route.name === 'Landingpage') {
        this.showHomeNav = true;
      }
//      Emitter.$on('tokenReceived', (token) => {
//        localStorage.setItem(JSON_TOKEN, JSON.stringify(token))
//        this.token = token
//        window.location.href = '/'
//      });
//      this.token = JSON.parse(localStorage.getItem(JSON_TOKEN))
    },
    components: {
      Navigation,
      PageFooter
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

  html {
    position: relative;
    min-height: 100%;
  }
  body {
    /* Margin bottom by footer height */
    margin-bottom: 60px;
  }

</style>
