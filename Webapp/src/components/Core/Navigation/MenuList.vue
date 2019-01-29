<template>
    <div style="z-index: 10; width: 100%;">
        <b-collapse is-nav id="nav_collapse">

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item href="/spaces">Spaces</b-nav-item>
                <b-nav-item href="/events">Events</b-nav-item>
                <b-nav-item href="/community">Community</b-nav-item>
                <b-nav-item v-if="blogActive" href="/blogs">Blogs</b-nav-item>
                <b-nav-item href="/contact">Contact</b-nav-item>
                <b-nav-item href="#">
                    <b-img id="language-img" v-on:click="switchLanguage()"
                           src="https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg"
                           width="30"></b-img>
                </b-nav-item>
                <b-nav-item v-if="typeof resource === 'undefined' || resource === null" right href="/lr"><b>Login</b>
                </b-nav-item>
                <!--<b-nav-item v-if="typeof resource !== 'undefined' && resource !== null" right href="/account">{{resource.first_name}} {{resource.last_name}}</b-nav-item>-->

                <b-nav-item-dropdown v-if="typeof resource !== 'undefined' && resource !== null" right>
                    <!-- Using button-content slot -->
                    <template slot="button-content" v-if="typeof resource.company_resource_roles === 'undefined'"
                              class="resourcename-link">
                        <b style="color: white;">{{resource.first_name}} {{resource.last_name}}</b>
                    </template>
                    <b-dropdown-item href="/account" v-if="typeof resource.company_resource_roles === 'undefined'">
                        Profile
                    </b-dropdown-item>

                    <template slot="button-content" v-if="typeof resource.company_resource_roles !== 'undefined'"
                              class="resourcename-link">
                        <b style="color: white;">{{resource.name}}</b>
                    </template>
                    <b-dropdown-item href="/account/company"
                                     v-if="typeof resource.company_resource_roles !== 'undefined'">profile
                    </b-dropdown-item>

                    <b-dropdown-item v-on:click="logout()">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    </div>
</template>

<script>
  import Vue from 'vue'
  import settingsApi from '@/services/api/admin/settings.js'
  const LANGUAGE_KEY = 'CCLanguage'

  export default {
    name: "menu-list",
    data() {
      return {
        language: 'nl',
        resource: null,
        blogActive: false
      }
    },
    methods: {
      /**
       * Switch the language
       */
      switchLanguage () {
        if (this.language === 'nl') {
          this.setLanguage('en')
          Vue.i18n.set('en')
          this.$root.$emit('toggleLocaleCalendar', 'en')
        } else {
          this.setLanguage('nl')
          Vue.i18n.set('nl')
          this.$root.$emit('toggleLocaleCalendar', 'nl')
        }
        this.save();
        window.location.reload();
      },
      /**
       * Set a language
       *
       * @param lang
       */
      setLanguage (lang) {
        this.language = lang
        if (lang === 'nl') {
          document.getElementById('language-img').src = 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg'
          Vue.i18n.set('nl')
          this.$root.$emit('toggleLocaleCalendar', 'nl')
        } else {
          document.getElementById('language-img').src = 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg'
          Vue.i18n.set('en')
          this.$root.$emit('toggleLocaleCalendar', 'en')
        }
      },
      logout () {
        this.$store.dispatch('logout')
      },

      /**
       * Save everything
       */
      save () {
        localStorage.setItem(LANGUAGE_KEY, JSON.stringify(this.language))
      }
    },
    mounted () {
      this.language = JSON.parse(localStorage.getItem(LANGUAGE_KEY))
      this.setLanguage(this.language)

      this.resource = this.$store.getters.getUser
      settingsApi.getSettings().then(response => {
        if (response.data.data[0].is_on == 1) {
          this.blogActive = true
        } else {
          this.blogActive = false
        }
      })
    }

  }
</script>

<style scoped>
    .nav-link {
        color: white !important;
        font-weight: 600;
        font-size: 1.2em;
    }

    .dropdown-toggle {
        color: white;
    }
</style>