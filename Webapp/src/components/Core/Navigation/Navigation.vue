<template>
  <b-navbar toggleable="md" type="dark" variant="red" fixed="top">
    <b-container>

      <b-navbar-brand href="/">
        <img src="/static/images/ceespot_logo.svg">
      </b-navbar-brand>

      <menu-list></menu-list>
    </b-container>
  </b-navbar>
</template>

<script>
import MenuList from '@/components/Core/Navigation/MenuList'
export default {
  name: 'Navigation',
  data () {
    return {
      language: 'nl',
      resource: null,
      blogActive: false
    }
  },
  methods: {
  },
  components: {
    MenuList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg-navigation {
    background: #E60000;
  }

  .bg-red {
    padding-top: 25px;
    padding-bottom: 25px;
    background: #E60000;
  }
</style>
