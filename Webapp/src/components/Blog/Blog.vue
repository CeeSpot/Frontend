<template>
  <b-container class="container-margin">
      <b-row>
          <b-col md="8">
              <h1 class="text-center">This is a test article</h1>
              <p class="text-center">Small</p>
          </b-col>
          <b-col>
              test
          </b-col>
      </b-row>
  </b-container>
</template>
<script>
import Vue from 'vue'
import blogApi from '@/services/api/blogs.js'
import moment from 'moment'
  export default {
    name: 'Blog',
    data() {
      return {
        blog: null
      }
    },
    methods: {
      formatDate(date) {
            return moment(date).format('MMMM DD,YYYY')
      }
    },
    mounted() {
    
    }
  }
</script>
<style scoped>
    .container-margin {
        margin-top: 130px;
    }
</style>