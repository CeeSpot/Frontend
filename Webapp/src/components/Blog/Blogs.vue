<template>
  <b-container class="container-margin">
      <b-row class="mt-3">
            <b-col md="8" class="mr-3">
               <b-card v-for="blog in filterSearchAndTags()">
                    <b-row>
                    <b-col md="9">
                        <div style="padding: 15px">
                            <h3 class="bold">{{blog.title}}</h3>
                            <p class="description">{{blog.description}}</p>
                            <small class="text-muted">{{formatDate(blog.date_created)}}</small>
                        </div>
                    </b-col>
                    <b-col>
                         <b-img class="card-image" src="https://images.pexels.com/photos/1496183/pexels-photo-1496183.jpeg?cs=srgb&dl=adult-article-assortment-1496183.jpg&fm=jpg" fluid-grow/>
                    </b-col>
                </b-row>
                </b-card>
           </b-col>
          <b-col>
            <b-row>
                <div style="width: 100%; padding: 15px; font-size: 1.125em;" class="card shadow no-scale">
                    <h3>Zoeken</h3>
                    <hr>
                    <b-row>
                        <b-col>
                            <b-input-group class="form-group-search">
                                <b-form-input v-model="search" :placeholder="$t('events.search')"
                                                class="form-control"></b-form-input>
                                <span class="form-control-icon">
                                    <font-awesome-icon icon="search" class="search-color"/>
                                </span>
                            </b-input-group>
                        </b-col>
                    </b-row>
                </div>
            </b-row>
            <b-row>
                <div style="width: 100%; padding: 15px; font-size: 1.125em;" class="card shadow no-scale">
                    <h3>Tags</h3>
                    <hr>
                    <b-row>
                        <b-col>
                            <ul>
                                <li v-for="tag in tags">
                                    <div :id="'tag' + tag.id" v-on:click="updateSelectedTags(tag.id);filterSearchAndTags();"
                                        class="btn-ceecee-oval-red">{{tag.description}}
                                    </div>
                                </li>
                            </ul>
                        </b-col>
                    </b-row>
                </div>
            </b-row>
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
        tags: [],
        search: '',
        selectedTags: []
      }
    },
    methods: {
      formatDate(date) {
            return moment(date).format('MMMM DD, YYYY')
      },
     updateSelectedTags: function (id) {
        let button = document.getElementById("tag" + id);
        if (button.classList.contains('btn-ceecee-oval-red-active')) {
          button.classList.remove("btn-ceecee-oval-red-active");
          this.selectedTags.splice(this.selectedTags.indexOf(id), 1);
        } else {
          button.classList.add("btn-ceecee-oval-red-active");
          this.selectedTags.push(id);
        }
      },
      filterSearchAndTags() {
        let newBlogsList = [];
        let filteredTags = 0;
        this.blogList.forEach(blog => {
          if (blog.tags.length > 0) {
            blog.tags.forEach(tag => {
              if (this.selectedTags.includes(tag.id)) {
                if (!newBlogsList.includes(blog)) {
                  newBlogsList.push(blog);
                  filteredTags++;
                }
              }
            });
          }
        })
        if (this.selectedTags.length === 0) {
          newBlogsList = this.blogList;
        }
        return newBlogsList;
      }
    },
    mounted() {
       blogApi.getBlogs().then(response => this.blogs = response.data.data);
       blogApi.getBlogsTags().then(response => this.tags = response.data.data);
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
     -webkit-line-clamp: 2;
     -webkit-box-orient: vertical;
    }

    .card-title {
        font-weight: bold;
        font-size: 22px;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    li {
        float: left;
        margin-top: 5px;
    }

    .card-image {
          background-repeat: no-repeat;
          background-size: auto;
          height: 100%;
    }

    .blog-card {
         cursor: pointer;
    }

    .card-body {
        padding: 0px;
    }
</style>