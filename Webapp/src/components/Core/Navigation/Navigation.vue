<template>
  <b-navbar toggleable="md" type="dark" variant="red" fixed="top">
    <b-container>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">
        <img src="https://www.theceespot.nl/images/ceecee-logo.svg"> the cee spot
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">Spaces</b-nav-item>
          <b-nav-item href="#">Events</b-nav-item>
          <b-nav-item href="#">Community</b-nav-item>
          <b-nav-item href="#">Contact</b-nav-item>
          <b-nav-item href="#">
            <b-img id="language-img" v-on:click="switchLanguage()" src="https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg" width="30"></b-img>
          </b-nav-item>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
const LANGUAGE_KEY = 'CCLanguage'
export default {
  name: 'Navigation',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      language: 'nl'
    }
  },
  methods: {
    switchLanguage () {
      if (this.language === 'nl') {
        this.setLanguage('en')
      } else {
        this.setLanguage('nl')
      }
      this.save()
    },
    setLanguage (lang) {
      this.language = lang
      if (lang === 'nl') {
        document.getElementById('language-img').src = 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg'
      } else {
        document.getElementById('language-img').src = 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg'
      }
    },
    save () {
      localStorage.setItem(LANGUAGE_KEY, JSON.stringify(this.language))
    }
  },
  mounted () {
    this.language = JSON.parse(localStorage.getItem(LANGUAGE_KEY))
    this.setLanguage(this.language)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg-navigation{
    background: #E60000;
  }
  .bg-red{
    padding-top: 25px;
    padding-bottom: 25px;
    background: #E60000;
  }
  .navbar-dark .navbar-nav .nav-link {
    color: rgba(255,255,255,.8);
  }
  .navbar-dark .navbar-nav .nav-link:hover {
    color: #fff;
  }
</style>
