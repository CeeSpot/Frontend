<template>
  <b-container class="container-margin">
      <div style="width: 100%; height: 100%; font-size: 1.125em;" class="card shadow no-scale">
        <b-row>
          <b-col>
            <div class="blog-image" v-bind:style="{ backgroundImage: 'url(' + 'https://images.pexels.com/photos/1496183/pexels-photo-1496183.jpeg?cs=srgb&dl=adult-article-assortment-1496183.jpg&fm=jpg' + ')' }">
              <!-- <div class="carousel-caption">
                <b-row>
                <b-col>
                <h1>{{blog.title}}</h1>
                  <ul>
                      <li v-for="tag in blog.tags">
                          <div :id="'tag' + tag.id" class="tags">{{tag.description}}
                          </div>
                      </li>
                  </ul>
                </b-col>
                <b-col class="text-right">
                  <div>
                    <social-sharing url="http://localhost:8080/events"
                                          :title="Test"
                                          :description="Test"
                                          hashtags="TheCeeSpot"
                                          twitter-user="vuejs"
                                          v-cloak inline-template>
                              <div>
                                  <network network="facebook" class="pr-2">
                                      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"/>
                                  </network>
                                  <network network="linkedin" class="pr-2">
                                      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'linkedin' }"/>
                                  </network>
                                  <network network="twitter" class="pr-2">
                                      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }"/>
                                  </network>
                              </div>
                    </social-sharing>
                  </div>
                  </b-col>
                </b-row>
              </div>
                          !-->
              <b-row class="p-4" style="margin-top: 240px;">
                <b-col>
                  <b-row>
                      <b-col>
                          <h1 class="blog-title">{{blog.title}}</h1>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <ul>
                            <li v-for="tag in blog.tags">
                                <div :id="'tag' + tag.id" class="tags">{{tag.description}}
                                </div>
                            </li>
                        </ul>
                      </b-col>
                      <b-col style="color: white; text:" class="text-right">
                        <social-sharing style="cursor: pointer;" :url="blogUrl"
                                              :title="blog.title"
                                              :description="blog.description"
                                              hashtags="TheCeeSpot"
                                              twitter-user="vuejs"
                                              v-cloak inline-template>
                                  <div>
                                      <network network="facebook" class="pr-2">
                                          <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"/>
                                      </network>
                                      <network network="linkedin" class="pr-2">
                                          <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'linkedin' }"/>
                                      </network>
                                      <network network="twitter" class="pr-2">
                                          <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }"/>
                                      </network>
                                  </div>
                        </social-sharing>
                      </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
        <b-row class="p-4">
          <b-col>
            <div style="padding: 5px;" v-html="blog.body"></div>
          </b-col>
        </b-row>
      </div>
  </b-container>
</template>
<script>
import Vue from 'vue'
import blogApi from '@/services/api/blogs.js'
import CommunityApi from '@/services/api/community.js'
import moment from 'moment'
  export default {
    name: 'Blog',
    data() {
      return {
        blog: [],
        imageURL: '',
        blogUrl: '',
        author: []
      }
    },
    created() {
      this.id = this.$route.params.id;
    },
    methods: {
      formatDate(date) {
            return moment(date).format('MMMM DD,YYYY')
      },
      imageLoadError() {
        this.imageURL = '/static/images/users/user-icon.svg';
      },
      fullName: function (first_name, insertion, last_name) {
        let full_name;
        if (insertion) {
          full_name = first_name + ' ' + insertion + ' ' + last_name;
        } else {
          full_name = first_name + ' ' + last_name;
        }
        return full_name;
      }
    },
    mounted() {
      blogApi.getBlog(this.id).then(response => { 
        this.blog = response.data.data[0] 
        this.blogUrl = 'http://localhost:8080/blog/' + this.id;
        });
    }
  }
</script>
<style scoped>
    .container-margin {
        margin-top: 130px;
    }

    .blog-title {
      color: white;
    }

  .pickgradient{
  position:relative;
  display:inline-block;
}
.pickgradient:after {
  content:'';
  position:absolute;
  left:0; top:0;
  width:100%; height:100%;
  display:inline-block;
  background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%); /* FF3.6+ */
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.65)), color-stop(100%,rgba(0,0,0,0))); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%); /* Opera 11.10+ */
  background: -ms-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%); /* IE10+ */
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 ); /* IE6-9 */
}

img{
  display:block;
  height:200px;width:auto;
}

.carousel-caption {
    right: 0%;
    left: 0%;
    text-align: left;
    margin-left: 25px;
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

.tags {
    border: 2px solid white;
    border-radius: 15px;
    background-color: transparent;
    color: white;
    height: 30px;
    line-height: 15px;
    text-align: center;
    min-width: 70px;
    font-weight: 500;
    padding: 5px;
    margin-right: 8px;
}

.blog-image{
  width: 100%; 
  height: 400px;
  background-size: cover;
  display:inline-block;
  position: relative;
}

.blog-image:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%);
  opacity: .6;
}
</style>