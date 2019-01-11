<template>
  <b-container fluid style="margin-top: 100px;">
    <b-row style="background: linear-gradient(to right, #1d2337 40%,#1d2337);padding-top: 50px;padding-bottom: 150px;">
      <b-container>
        <b-row>
          <b-col md="2">
            <b-img rounded="circle" fluid v-bind:src="'../static/images/users/6.png'"></b-img>
          </b-col>
          <b-col md="6" class="text-white ml-3">
            <b-row>
              <b-col md="12">
                <h2 class="text-white">
                  {{user.first_name}} {{user.insertions}} {{user.last_name}}
                </h2>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col md="12">
                <b>Born: </b>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b>Nationality: </b><span class="opacity-text-8">{{user.country}}</span>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col class="opacity-text-8" md="12">
                {{user.description}}
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col class="opacity-text-8" md="12">
                <b-link v-for="site in user.social_media_sites" class="social-media-link" v-bind:href="site.url.includes('https://') ? site.url : 'https://' + site.url" target="_blank">
                  <font-awesome-icon :icon="{ prefix: 'fab', iconName: site.site }"></font-awesome-icon>
                </b-link>

                <font-awesome-icon class="social-media-link ml-3" :icon="{ prefix: 'fas', iconName: 'edit'}" v-b-modal.AddSocialMediaModal></font-awesome-icon>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </b-row>
    <b-row style="margin-top: -50px;">
      <b-container>
        <b-row>
          <b-col md="6">

            <b-row>
              <b-col md="12">
                <b-card class="no-scale"
                        tag="article">
                  <b-row>
                    <b-col md="10">
                      <h6 class="text-uppercase"><b>Personal info</b>
                      </h6>
                    </b-col>
                    <b-col md="2" class="text-right pull-right">
                      <font-awesome-icon v-on:click="editPersonalInfo()" class=""
                                         :icon="{ prefix: 'far', iconName: 'edit' }"/>
                    </b-col>
                  </b-row>

                  <!-- First name -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon" :icon="{ prefix: 'far', iconName: 'user' }"/>
                      <b style="padding-left: 5px;">First name</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!personalInfoEditting">
                      <span class="text-primary edit" v-on:click="editPersonalInfo()">{{user.first_name}}</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="personalInfoEditting">
                      <b-form-input v-model="user.first_name" type="text"></b-form-input>
                    </b-col>
                  </b-row>

                  <!-- Insertions -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon" :icon="{ prefix: 'far', iconName: 'user' }"/>
                      <b style="padding-left: 5px;">Insertions</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!personalInfoEditting">
                      <span class="text-primary edit" v-on:click="editPersonalInfo()"
                            v-if="user.insertions !== null">{{user.insertions}}</span>
                      <span class="text-primary edit" v-on:click="editPersonalInfo()" v-if="user.insertions === null">Add insertions</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="personalInfoEditting">
                      <b-form-input v-model="user.insertions" type="text"></b-form-input>
                    </b-col>
                  </b-row>

                  <!-- Last name -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon" :icon="{ prefix: 'far', iconName: 'user' }"/>
                      <b style="padding-left: 5px;">Last name</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!personalInfoEditting">
                      <span class="text-primary edit" v-on:click="editPersonalInfo()">{{user.last_name}}</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="personalInfoEditting">
                      <b-form-input v-model="user.last_name" type="text"></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="mt-3" v-if="personalInfoEditting">
                    <b-col class="pull-right">
                      <b-button v-on:click="saveBaseAccountInfo()" class="pull-right" variant="primary">Save</b-button>
                      <b-button v-on:click="editPersonalInfo()" class="pull-right" variant="danger">Cancel</b-button>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-card class="no-scale"
                        tag="article">
                  <b-row>
                    <b-col md="10">
                      <h6 class="text-uppercase"><b>Address info</b>
                      </h6>
                    </b-col>
                    <b-col md="2" class="text-right pull-right">
                      <font-awesome-icon v-on:click="editAddressInfo()" class=""
                                         :icon="{ prefix: 'far', iconName: 'edit' }"/>
                    </b-col>
                  </b-row>

                  <!-- Country -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon" :icon="{ prefix: 'fas', iconName: 'globe' }"/>
                      <b style="padding-left: 5px;">Country</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!addressInfoEditting">
                      <span class="text-primary edit" v-on:click="editAddressInfo()">{{user.country}}</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="addressInfoEditting">
                      <b-form-input v-model="user.country" type="text"></b-form-input>
                    </b-col>
                  </b-row>

                  <!-- City -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon" :icon="{ prefix: 'fas', iconName: 'city' }"/>
                      <b style="padding-left: 5px;">City</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!addressInfoEditting">
                      <span class="text-primary edit" v-on:click="editAddressInfo()">{{user.city}}</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="addressInfoEditting">
                      <b-form-input v-model="user.city" type="text"></b-form-input>
                    </b-col>
                  </b-row>

                  <!-- Street -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon"
                                         :icon="{ prefix: 'far', iconName: 'address-card' }"/>
                      <b style="padding-left: 5px;">Address</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!addressInfoEditting">
                      <span class="text-primary edit" v-on:click="editAddressInfo()">{{user.address}}</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="addressInfoEditting">
                      <b-form-input v-model="user.address" type="text"></b-form-input>
                    </b-col>
                  </b-row>

                  <!-- Street -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon"
                                         :icon="{ prefix: 'fas', iconName: 'map-marker-alt' }"/>
                      <b style="padding-left: 5px;">Zipcode</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!addressInfoEditting">
                      <span class="text-primary edit" v-on:click="editAddressInfo()">{{user.zipcode}}</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="addressInfoEditting">
                      <b-form-input v-model="user.zipcode" type="text"></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="mt-3" v-if="addressInfoEditting">
                    <b-col class="pull-right">
                      <b-button v-on:click="saveBaseAccountInfo()" class="pull-right" variant="primary">Save</b-button>
                      <b-button v-on:click="editAddressInfo()" class="pull-right" variant="danger">Cancel</b-button>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="6">
            <b-row>
              <b-col md="12">
                <b-card class="no-scale"
                        tag="article">
                  <b-row>
                    <b-col md="8">
                      <h6 class="text-uppercase"><b>Account info</b>
                      </h6>
                    </b-col>
                    <b-col class="text-right pull-right">
                      <font-awesome-icon v-on:click="editAccountInfo()" class=""
                                         :icon="{ prefix: 'far', iconName: 'edit' }"/>
                      <font-awesome-icon v-on:click="removeAccount()" class="text-danger ml-1"
                                         :icon="{ prefix: 'fas', iconName: 'trash' }"/>
                    </b-col>
                  </b-row>

                  <!-- Email -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon" :icon="{ prefix: 'far', iconName: 'envelope' }"/>
                      <b style="padding-left: 5px;">Email</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!accountInfoEditting">
                      <span class="text-primary edit" v-on:click="editAccountInfo()">{{user.email}}</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="accountInfoEditting">
                      <b-form-input v-model="user.email" type="tel"></b-form-input>
                    </b-col>
                  </b-row>

                  <!-- Username -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon" :icon="{ prefix: 'far', iconName: 'user' }"/>
                      <b style="padding-left: 5px;">Username</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!accountInfoEditting">
                      <span class="text-primary edit" v-on:click="editAccountInfo()">{{user.username}}</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="accountInfoEditting">
                      <b-form-input v-model="user.username" type="tel"></b-form-input>
                    </b-col>
                  </b-row>

                  <!-- Phonenumber -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon" :icon="{ prefix: 'fas', iconName: 'lock' }"/>
                      <b style="padding-left: 5px;">Password</b>
                    </b-col>
                    <b-col style="padding-left: 45px;">
                      <span class="text-primary edit" v-b-modal.ChangePasswordModal>Change password</span>
                    </b-col>
                  </b-row>


                  <b-row class="mt-3" v-if="accountInfoEditting">
                    <b-col class="pull-right">
                      <b-button v-on:click="saveBaseAccountInfo()" class="pull-right" variant="primary">Save</b-button>
                      <b-button v-on:click="editAccountInfo()" class="pull-right" variant="danger">Cancel</b-button>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
            <b-row>

              <b-col md="12">
                <b-card class="no-scale"
                        tag="article">
                  <b-row>
                    <b-col md="10">
                      <h6 class="text-uppercase"><b>Contact info</b>
                      </h6>
                    </b-col>
                    <b-col class="pull-right text-right">
                      <font-awesome-icon v-on:click="editContactInfo()" class=""
                                         :icon="{ prefix: 'far', iconName: 'edit' }"/>
                    </b-col>
                  </b-row>

                  <!-- Phonenumber -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon"
                                         :icon="{ prefix: 'fas', iconName: 'mobile-alt' }"/>
                      <b style="padding-left: 5px;">Phone</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!contactInfoEditting">
                      <span class="text-primary edit" v-on:click="editContactInfo()"
                            v-if="user.phone !== null">{{user.phone}}</span>
                      <span class="text-primary edit" v-on:click="editContactInfo()" v-if="user.phone === null">Add phone</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="contactInfoEditting">
                      <b-form-input v-model="user.phone" type="tel"></b-form-input>
                    </b-col>
                  </b-row>

                  <!-- Birthdate -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon"
                                         :icon="{ prefix: 'far', iconName: 'calendar-alt' }"/>
                      <b style="padding-left: 5px;">Birthdate</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!contactInfoEditting">
                      <span class="text-primary edit" v-on:click="editContactInfo()"
                            v-if="user.birthdate !== null">{{user.birthdate}}</span>
                      <span class="text-primary edit" v-on:click="editContactInfo()" v-if="user.birthdate === null">Add birthdate</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="contactInfoEditting">
                      <b-form-input v-model="user.birthdate" type="date"></b-form-input>
                    </b-col>
                  </b-row>


                  <b-row class="mt-3" v-if="contactInfoEditting">
                    <b-col class="pull-right">
                      <b-button v-on:click="saveBaseAccountInfo()" class="pull-right" variant="primary">Save</b-button>
                      <b-button v-on:click="editContactInfo()" class="pull-right" variant="danger">Cancel</b-button>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
          </b-col>

        </b-row>
      </b-container>
    </b-row>
    <social-media-modal id="addSocialMediaModal" v-bind:sites="socialMediaSites" v-bind:smrs="user.social_media_sites" v-bind:resourceId="user.id" v-bind:type="type"></social-media-modal>
    <change-password-modal id="changePasswordModal" v-bind:username="user.username" v-bind:userid="user.id"></change-password-modal>
  </b-container>
</template>

<script>
import UserMenu from '@/components/UserProfile/UserMenu'
import Tag from '@/components/Core/Other/Tag'
import CommunityApi from '@/services/api/community.js'
import auth from '@/services/api/Authentication.js'
import socialMediaModal from '@/components/Core/Modals/AddSocialMediaModal'
import changePasswordModal from '@/components/Core/Modals/ChangePasswordModal'

export default {
  name: 'user-profile',
  components: {
    UserMenu,
    Tag,
    socialMediaModal,
    changePasswordModal
  },
  data() {
    return {
      active: 'Profile',
      user: null,
      testStuff: null,
      type: -22,
      socialMediaSites: null,
      contactInfoEditting: false,
      personalInfoEditting: false,
      accountInfoEditting: false,
      addressInfoEditting: false
    }
  },
  methods: {
    editContactInfo() {
      this.contactInfoEditting = !this.contactInfoEditting
    },
    editPersonalInfo() {
      this.personalInfoEditting = !this.personalInfoEditting
    },
    editAccountInfo() {
      this.accountInfoEditting = !this.accountInfoEditting
    },
    editAddressInfo() {
      this.addressInfoEditting = !this.addressInfoEditting
    },
    saveBaseAccountInfo() {
      auth.updateUser({user: this.user}).then((resp) => {
        this.$store.dispatch('updateToken', resp.data.token)
        this.contactInfoEditting = false
        this.personalInfoEditting = false
        this.accountInfoEditting = false
        this.addressInfoEditting = false
      }).catch((err) => {
        alert(err.message)
      })
    },
    compare(resourceSocialMediaSites, socialMediaSites){
      let ids = [];
      resourceSocialMediaSites.forEach((i) => ids.push(i.social_media_id));
      this.socialMediaSites = socialMediaSites.filter(function(item){
        return ids.indexOf(item.id) === -1
      })
    },
    getProfile () {
      CommunityApi.getProfile().then(response => {
        if (!response.data.success) {
          this.$store.dispatch('logout')
        }
        this.user = response.data.user
        this.compare(response.data.user.social_media_sites,response.data.sites)
        this.type = response.data.type
      }).catch((err) => {
        this.$store.dispatch('logout');
      });
    }
  },
  created () {
    Emitter.$on('passwordChanged', (token) => {
      this.$store.dispatch('updateToken', token)
      this.$toasted.show('Succesfully changed your password',
        {
          position: 'top-center',
          duration: 3000
        }
      )
    })
  },
  mounted () {
    this.getProfile()

    Emitter.$on('updatedSocialMediaSiteForUser', () => {
      this.getProfile()
    })
  }
}
</script>

<style scoped>
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
</style>
