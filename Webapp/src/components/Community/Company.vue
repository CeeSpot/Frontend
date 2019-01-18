<template>
  <b-container fluid style="margin-top: 100px;">
    <b-row style="background: linear-gradient(to right, #1d2337 40%,#1d2337);padding-top: 50px;padding-bottom: 150px;">
      <b-container>
        <b-row>
          <b-col md="2">
            <b-img rounded="circle" fluid v-bind:src="'../static/images/users/6.png'"></b-img>
          </b-col>
          <b-col md="8" class="text-white ml-3">
            <b-row>
              <b-col md="12">
                <h2 class="text-white">
                  {{company.name}}
                </h2>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col>
                {{company.description}}
              </b-col>
            </b-row>
            <b-row class="mt-3" v-if="company !== null && company.social_media_sites !== null && company.social_media_sites.length > 0">
              <b-col class="opacity-text-8" md="12">
                <b-link v-for="site in company.social_media_sites" class="social-media-link" v-bind:href="site.url.includes('https://') ? site.url : 'https://' + site.url" target="_blank">
                  <font-awesome-icon :icon="{ prefix: 'fab', iconName: site.site }"></font-awesome-icon>
                </b-link>
                <span v-if="company.social_media_sites.length === 0" class="modal-hover" v-b-modal.AddSocialMediaModal>
                  Add social media sites
                  <font-awesome-icon class="social-media-link ml-3" :icon="{ prefix: 'fas', iconName: 'edit'}"></font-awesome-icon>
                </span>
                <font-awesome-icon v-if="company.social_media_sites.length > 0" class="social-media-link ml-3" :icon="{ prefix: 'fas', iconName: 'edit'}" v-b-modal.AddSocialMediaModal></font-awesome-icon>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col>
                <ul>
                  <li class="no-marg" v-for="tag in company.tags" :key="tag.id" >
                    <div :id="'tag' + tag.id"
                         class="btn-ceecee-oval-red">{{tag.name}}
                    </div>
                  </li>
                </ul>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </b-row>
    <b-row style="margin-top: -50px;">
      <b-container>
        <b-row>
          <b-col md="8">
            <b-card class="no-scale"
                    tag="article">
              <b-row>
                <b-col>
                  <h6 class="text-uppercase"><b>Employees</b>
                  </h6>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <ul>
                    <li v-for="participant in company.users">
                      <b-link v-bind:href="'/user/' + participant.id" class="text-dark">
                        <b-row>
                          <b-col>
                            <b-img center rounded="circle" v-b-tooltip.hover
                                   class="image-profile-chips center-block " width="100" height="100"
                                   src="https://images.pexels.com/photos/555790/pexels-photo-555790.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
                            </b-img>
                          </b-col>
                        </b-row>
                        <div class="mt-3 text-center">
                          <b>{{participant.name}}</b>
                        </div>
                        <div class="text-center">
                            {{participant.role}}
                        </div>
                      </b-link>
                    </li>
                  </ul>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col md="4">
            <b-card class="no-scale"
                    tag="article">
              <b-row>
                <b-col md="12">
                  <h6 class="text-uppercase"><b>Contact info</b>
                  </h6>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col md="12">
                  <font-awesome-icon class="text-light main-icon"
                                     :icon="{ prefix: 'far', iconName: 'envelope' }"/>
                  <b style="padding-left: 5px;">Email</b>
                </b-col>
                <b-col style="padding-left: 45px;">
                    <span class="text-primary edit">{{company.email}}</span>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col md="12">
                  <font-awesome-icon class="text-light main-icon"
                                     :icon="{ prefix: 'fas', iconName: 'phone' }"/>
                  <b style="padding-left: 5px;">Phone number</b>
                </b-col>
                <b-col style="padding-left: 45px;">
                    <span class="text-primary edit">{{company.phone}}</span>
                </b-col>
              </b-row>
            </b-card>
          </b-col>

        </b-row>
      </b-container>
    </b-row>
  </b-container>
</template>

<script>
import CommunityApi from '@/services/api/community.js'
export default {
  name: 'company',
  data () {
    return {
      id: -1,
      company: null,
      failedMessage: 'dsfs',
      type: -22,
    }
  },
  methods: {
    getCompanyProfile () {
      let self = this
      CommunityApi.getCompany(this.id).then(response => {
        self.failedMessage = null
        self.company = response.data.company
        self.type = response.data.type
        console.log(response.data.company)
      }).catch(() => {
        this.failedMessage = 'Failed loading data, please '
      })
    },
  },
  mounted () {
    this.id = this.$route.params.id
    this.getCompanyProfile()
  }
}
</script>

<style scoped>
  .no-marg{
    margin: 0;
  }
  .main-icon {
    width: 20px;
    text-align: right;
  }

  .text-light {
    color: #bbb !important;
  }

  .opacity-text-8 {
    color: rgba(255, 255, 255, .8);
  }

  .text-primary.edit {
    transition: 250ms;
  }

  .text-primary.edit:hover {
    cursor: pointer;
    color: #005bbc !important;
  }
  .social-media-link{
    color: #7dacff;
    font-size: 25px;
    transition: 250ms;
    margin-left: 15px;
  }
  .social-media-link:first-of-type{
    margin-left: 0;
  }
  .social-media-link:hover{
    color: #6c94dc;
    cursor: pointer;
  }
  .opacity-text-8 {
    color: rgba(255, 255, 255, .8);
  }

  .image-border {
    border: 2px solid #E60000;
  }

  .image-profile-chips {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    float: left;
    margin: 15px;
  }

  .btn-ceecee-oval-red {
    background-color: #E60000;
    color:#fff;
  }
  .modal-hover{
    cursor: pointer;
  }
  .modal-hover:hover{
    color:#fff;
  }
</style>
