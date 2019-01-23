<template>
    <b-container class="container-margin">
        <b-row class="mt-3">
            <b-col md="8" class="mr-3">
                <b-card v-for="blog in filterSearchAndTags()" v-on:click="routeToBlog(blog.id, blog.title)">
                    <b-row>
                        <b-col md="9">
                            <div style="padding: 15px">
                                <h3 class="bold">{{blog.title}}</h3>
                                <p class="description">{{blog.description}}</p>
                                <b-row>
                                    <b-col>
                                        <small class="text-muted">{{formatDate(blog.date_created)}}</small>
                                    </b-col>
                                    <b-col>
                                        <ul class="float-right">
                                            <li v-for="tag in blog.tags">
                                                <div class="tags">{{tag.description}}
                                                </div>
                                            </li>
                                        </ul>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-col>
                        <b-col>
                            <div :id="'blogImg' + blog.id" class="blog-image"
                                 v-bind:style="{ backgroundImage: 'url(' + getImage(blog.id) + ')' }">
                            </div>
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
                                                  class="form-control" style="border-radius: 4px;"></b-form-input>
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
                                        <div :id="'tag' + tag.id"
                                             v-on:click="updateSelectedTags(tag.id);filterSearchAndTags();"
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
  import uploadFile from '@/services/api/uploadFile.js'

  export default {
    name: 'Blogs',
    data() {
      return {
        blogs: [],
        tags: [],
        search: '',
        selectedTags: [],
        images: []
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
      },
      routeToBlog(id, title) {
        title = title.replace(/\s+/g, '-').toLowerCase();
        location.href = '/blog/' + id + '/' + title;
      },
      getImage(id) {
        uploadFile.checkIfFileExists(this.imageBaseURL + '/blogs_header/' + id + '.jpg')
          .then((res) => {
            document.getElementById('blogImg' + id).style.backgroundImage = 'url(\'' + this.imageBaseURL + '/blogs_header/' + id + '.jpg' + '\')'
          })
          .catch((err) => {
            document.getElementById('blogImg' + id).style.backgroundImage = 'url(\'/static/images/header.jpg\')'
          });
      }
    },
    mounted() {
      blogApi.getBlogsTags().then(response => this.tags = response.data.data);
    },
    created() {
      blogApi.getBlogs().then(response => {
        this.blogs = response.data.data;
      });
    },
    computed: {
      blogList() {
        return this.blogs.filter(blog => {
          return blog.title.toLowerCase().includes(this.search.toLowerCase()) || blog.body.toLowerCase().includes(this.search.toLowerCase());
        })
      }
    }
  }
</script>
<style scoped>
    .container-margin {
        margin-top: 130px;
    }

    .blog-image {
        width: 100%;
        height: 100%;
        background-position: center center;
        background-size: cover;
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

    .tags {
        border: 2px solid grey;
        border-radius: 15px;
        background-color: transparent;
        color: grey;
        height: 30px;
        line-height: 15px;
        text-align: center;
        min-width: 70px;
        font-weight: 500;
        padding: 5px;
        margin-right: 8px;
        transform: scale(0.7);
        transform-origin: 0 0;
    }
</style>