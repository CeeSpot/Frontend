<template>
  <b-container class="container-margin">
      <b-row>
        <b-col md="4">
          <b-input-group class="form-group-search">
              <b-form-input v-model="search" :placeholder="$t('events.search')"
                              class="form-control"></b-form-input>
              <span class="form-control-icon">
                  <font-awesome-icon icon="search" class="search-color"/>
              </span>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mt-3">
          <b-col md="4" v-for="blog in blogs">
              <b-card
                      :title="blog.title"
                      img-src="https://images.pexels.com/photos/1496183/pexels-photo-1496183.jpeg?cs=srgb&dl=adult-article-assortment-1496183.jpg&fm=jpg"
                      img-top
                      tag="event">
                  <p class="card-text description">
                      {{blog.description}}
                  </p>
              </b-card>
          </b-col>
      </b-row>
  </b-container>
</template>
<script>
import Vue from 'vue'
import blogApi from '@/services/api/blogs.js'
  export default {
    name: 'Blogs',
    data() {
      return {
        blogs: []
      }
    },
    methods: {
    },
    mounted() {
       blogApi.getBlogs().then(response => this.blogs = response.data.data);
    }
  }
</script>
<style scoped>
    .container-margin {
        margin-top: 130px;
    }

    .form-group-search .form-control {
        padding-left: 0rem;
    }

    .form-group-search .form-control-icon {
        position: absolute;
        z-index: 2;
        display: block;
        width: 2.375rem;
        right: 5px;
        height: 2.375rem;
        line-height: 2.375rem;
        text-align: center;
        padding-top: 5px;
        pointer-events: none;
        color: #aaa;
    }

    .search-color {
        color: #E60000;
        font-size: 25px;
    }

    .description {
     overflow: hidden;
     display: -webkit-box;
     -webkit-line-clamp: 3;
     -webkit-box-orient: vertical;
    }
</style>