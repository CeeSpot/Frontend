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
          <b-col md="4" v-for="blog in blogList">
              <b-card
                      :title="blog.title"
                      img-src="https://images.pexels.com/photos/1496183/pexels-photo-1496183.jpeg?cs=srgb&dl=adult-article-assortment-1496183.jpg&fm=jpg"
                      img-top>
                  <p class="card-text description">
                      {{blog.description}}
                  </p>
                              <div slot="footer">
                <small class="text-muted">{{formatDate(blog.date_created)}}</small>
            </div>
              </b-card>
          </b-col>
      </b-row>
  </b-container>
</template>
<script>
import Vue from 'vue'
import blogApi from '@/services/api/blogs.js'
import moment from 'moment'
  export default {
    name: 'Blogs',
    data() {
      return {
        blogs: [],
        search: ''
      }
    },
    methods: {
      formatDate(date) {
            return moment(date).format('MMMM DD, YYYY')
      }
    },
    mounted() {
       blogApi.getBlogs().then(response => this.blogs = response.data.data);
    },
    computed: {
        blogList() {
            return this.blogs.filter(blog => {
                return blog.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
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

    .card-title {
        font-weight: bold;
        font-size: 22px;
    }
</style>