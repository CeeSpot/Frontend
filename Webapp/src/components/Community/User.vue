<template>
  <b-container fluid style="margin-top: 90px;">
    <b-row class="main-bg">
      <b-container>
        <b-row  align-v="start" class="d-flex flex-row">
          <b-col cols="auto">
            <!--<div style="background-image: url('/static/images/header.jpg'); width: 150px; height: 150px; background-position: center center; background-size: cover;"></div>-->
            <div class="image-wrapper"
                 v-bind:style="{height: '150px',
                                width: '150px',
                                backgroundImage: 'url(' + imageURL + ')',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                borderRadius: '50%'}"></div>

          </b-col>
          <b-col class="text-white d-flex flex-column flex-grow">

            <!-- Social media on big screen -->
            <b-row style="position:absolute;right:0;top:0;z-index:8;" class="d-none d-lg-block d-xl-block">
              <b-col class="opacity-text-8 text-white">
                <b-link v-if="user.website !== null && user.website.length > 0" class="social-media-link website" v-bind:href="user.website">
                  <font-awesome-icon :icon="{prefix: 'fas', iconName: 'globe'}"></font-awesome-icon>
                </b-link>
                <b-link v-for="site in user.social_media_sites" :key="site.id" v-bind:class="'social-media-link ' + site.site" v-bind:href="getLinkFromSite(site)"  target="_blank">
                  <font-awesome-icon :icon="{ prefix: 'fab', iconName: site.site }"></font-awesome-icon>
                </b-link>
              </b-col>
            </b-row>

            <!-- Persons name -->
            <b-row class=" text-white" style="z-index: 5;">
              <b-col md="12">
                <h2 class="text-white">
                  {{user.first_name}} {{user.insertions}} {{user.last_name}}
                </h2>
              </b-col>
            </b-row>

            <!-- Employed at -->
            <b-row class="mt-2" v-if="typeof user.companies !== 'undefined'">
              <b-col v-if="user.companies.length > 0">
                <span v-for="company in user.companies">
                  <b>{{company.role}} @ <a class="text-white text-underline" v-bind:href="getCompanyLink(company.company_id, company.name)">{{company.name}}</a></b><br>
                </span>
              </b-col>
            </b-row>

            <!-- Social media on small screen-->
            <b-row class="mt-3 d-lg-none">
              <b-col class="text-right header-text-sm-xs">
                <b-link v-if="user.website !== null && user.website.length > 0" class="social-media-link website" v-bind:href="user.website">
                  <font-awesome-icon :icon="{prefix: 'fas', iconName: 'globe'}"></font-awesome-icon>
                </b-link>
                <b-link v-for="site in user.social_media_sites" :key="site.id" v-bind:class="'social-media-link ' + site.site" v-bind:href="getLinkFromSite(site)" target="_blank">
                  <font-awesome-icon :icon="{ prefix: 'fab', iconName: site.site }"></font-awesome-icon>
                </b-link>
              </b-col>
            </b-row>

            <!-- Description -->
            <b-row class="mt-3">
              <b-col class="opacity-text-8" >
                {{user.description}}
              </b-col>
            </b-row>

            <!-- Tags-->
            <b-row class="mt-3">
              <b-col>
                <ul id="tagList">
                  <li v-for="tag in user.tags" :key="tag.id" >
                    <div :id="'tag' + tag.id"
                         class="btn-ceecee-oval-red">{{tag.description}}
                    </div>
                  </li>
                </ul>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </b-row>
    <b-row style="margin-top: -50px;" v-if="(user.email.length > 0 && user.mailVis) || user.addressVis">
      <b-container>
        <b-row>
          <b-col md="6" class="get-in-touch">
            <b-row>

              <b-col md="12">
                <b-card class="no-scale"
                        tag="article">
                  <b-row>
                    <b-col md="12">
                      <h6 class="text-uppercase"><b>Get in touch</b>
                      </h6>
                    </b-col>
                  </b-row>

                  <!-- Website -->
                  <b-row class="mt-3" v-if="user.website">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon"
                                         :icon="{ prefix: 'fas', iconName: 'globe' }"/>
                      <b style="padding-left: 5px;">Website</b>
                    </b-col>
                    <b-col style="padding-left: 45px;">
                      <span class="text-primary edit">{{user.website}}</span>
                    </b-col>
                  </b-row>

                  <!-- Address -->
                  <b-row class="mt-3" v-if="user.addressVis">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon"
                                         :icon="{ prefix: 'fas', iconName: 'map-marker-alt' }"/>
                      <b style="padding-left: 5px;">Address</b>
                    </b-col>
                    <b-col style="padding-left: 50px;">
                      <b-row v-if="user.address !== null">
                          <span class="text-primary edit">{{user.address}}</span>
                      </b-row>
                      <b-row v-if="user.zipcode !== null || user.city !== null">
                          <span class="text-primary edit" v-if="user.city !== null">{{user.city}}, </span><span v-if="user.zipcode !== null" class="text-primary edit">{{user.zipcode}}</span>
                      </b-row>
                      <b-row v-if="user.country !== null">
                          <span class="text-primary edit">{{user.country}}</span>
                      </b-row>
                    </b-col>
                  </b-row>
                  <!-- Email -->
                  <b-row class="mt-3" v-if="user.email && user.mailVis">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon"
                                         :icon="{ prefix: 'far', iconName: 'envelope' }"/>
                      <b style="padding-left: 5px;">Email</b>
                    </b-col>
                    <b-col style="padding-left: 42px;">
                      <span class="text-primary edit">{{user.email}}</span>
                    </b-col>
                  </b-row>

                  <!-- Phonenumber -->
                  <b-row class="mt-3" v-if="user.phone">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon"
                                         :icon="{ prefix: 'fas', iconName: 'mobile-alt' }"/>
                      <b style="padding-left: 5px;">Phone</b>
                    </b-col>
                    <b-col style="padding-left: 35px;">
                      <span class="text-primary edit">{{user.phone}}</span>
                    </b-col>
                  </b-row>

                </b-card>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </b-row>
  </b-container>
</template>

<script>
import CommunityApi from '@/services/api/community.js'
import Tag from '@/components/Core/Other/Tag' // Import the navigation into the base app
import uploadFile from '@/services/api/uploadFile.js'

export default {
  name: 'User',
  data() {
    return {
      user: null,
      imageURL: ''
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      CommunityApi.getUser(this.id).then((response) => {
        if (response.data.success) {
          this.user = response.data.user
          uploadFile.checkIfFileExists(this.imageBaseURL + '/profile/' + this.user.id + '.jpg')
            .then((res) => {
              this.imageURL = this.imageBaseURL + '/profile/' + this.user.id + '.jpg';
            })
            .catch((err) => {
              this.imageURL = '/static/images/header.jpg';
            });
        } else {
          this.$toasted.show('Failed load user try again later',
            {
              position: 'top-center',
              duration: 3000
            }
           )
        }
      }).catch((err) => {
        this.$toasted.show('Something went wrong, please try again',
              {
                position: 'top-center',
                duration: 3000
              }
          )
    });
    },
    getCompanyLink(id, name) {
      name = name.replace(/\s+/g, '-').toLowerCase()
      return '/company/' + id + '/' + name
    },
    imageLoadError() {
      this.imageURL = '/static/images/users/user-icon.svg';
    },
    getLinkFromSite (site) {
      if (site.site === 'linkedin') {
        return 'https://www.linkedin.com/in/' + site.url
      }
      return 'https://www.' + site.site + '.com/' + site.url
    },
  },
  created() {
    this.id = this.$route.params.id;
  },
  components: {
    Tag
  }
}
</script>

<style>
  body {
    background-color: #ededed;
  }

  .box-shadow {
    box-shadow: 0 3px 5px #d2d2d2;
  }

  #image-container {
    width: 100%;
    text-align: center;
    margin-top: -100px;
    padding-bottom: 20px;
  }

  #tagList {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  #tagList > li {
    float: left;
  }

  #userInformation {
    padding-left: 25px;
    padding-right: 25px;
  }

  #userContainer {
    margin-top: 200px;
  }

  #userDesc {
    padding: 25px;
  }

  #userProfileCol {
    margin-top: 20px;
  }

  .main-icon {
    width: 20px;
    text-align: right;
  }

  .text-light {
    color: #bbb !important;
  }

  .btn-ceecee-oval-red {
    background-color: #E60000;
    color:#fff;
  }
  .get-in-touch {
    margin-left:160px;
  }
  .social-media-link {
    margin-right: 15px;
    color: rgba(255,255,255,.75);
    /*color:blue;*/
    font-size:25px;
    line-height:25px;
    cursor:pointer;
    transition:250ms;
  }
  .social-media-link:last-of-type{
    margin-right: 0;
  }
  .social-media-link:hover{
    color: #fff;
  }
  .image-wrapper{
    display:inline-block;
    padding: 0;
    width: 125px;
    height: 125px;
  }
  .main-bg{
    background-color: #1d2337;
    padding-top: 50px;
    padding-bottom: 80px;
  }
  @media screen and (max-width:992px) {
    .main-bg{
      padding-bottom: 80px;
    }
    .get-in-touch {
      /*margin-left: 0;*/
      margin-left: 150px;
    }

  }
  .header-text-xs{
    padding-left: 165px;
    text-align: left !important;

  }
  .header-text-sm-xs{
    text-align: left !important;
  }
  @media screen and (max-width:520px) {
    .image-wrapper {
      width: 90px;
      height: 90px;
    }
    .header-text-xs {
      padding-left: 115px;
    }
    .get-in-touch {
      margin-left: 0;
    }
  }

</style>
