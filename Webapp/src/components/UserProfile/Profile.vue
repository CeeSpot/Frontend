<template>
  <b-container fluid style="margin-top: 100px;">
    <b-row style="background: linear-gradient(to right, #1d2337 40%,#1d2337);padding-top: 50px;padding-bottom: 150px;">
      <b-container>
        <b-row align-v="start">
          <b-col cols="auto">
            <div class="image-wrapper" id="baseImg"
                 v-bind:style="{height: '150px',
                                width: '150px',
                                backgroundImage: 'url(\'../static/images/users/6.png\')',
                                backgroundSize: 'cover',
                                borderRadius: '50%'}" v-on:click="selectImage()">
              <div class="image-overlay">
                <font-awesome-icon :icon="{prefix: 'fas', iconName: 'edit'}"></font-awesome-icon>
                <input type="file" id="baseImgFile" @change="fileChanged" accept="image/*">
              </div>
            </div>
          </b-col>
          <b-col md="9" class="text-white">
            <b-button style="position: absolute;right: 0;top: 0;z-index: 8;" variant="light" v-b-modal.RegisterCompanyModal>Add company</b-button>
            <b-row style="z-index:7;">
              <b-col md="12">
                <h2 class="text-white">
                  {{user.first_name}} {{user.insertions}} {{user.last_name}}
                </h2>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="typeof user.companies !== 'undefined'">
              <b-col v-if="user.companies.length > 0">
                <span v-for="company in user.companies">
                  <b>{{company.role}} @ <a class="text-white text-underline"
                                           v-bind:href="getCompanyLink(company.company_id, company.name)">{{company.name}}</a></b><br>
                </span>
              </b-col>
              <b-col v-if="user.companies.length ===0">
                Add positions
                <font-awesome-icon class="social-media-link ml-3" :icon="{ prefix: 'fas', iconName: 'edit'}"
                                   v-b-modal.CompanyRoleModal></font-awesome-icon>
              </b-col>
              <b-col v-if="user.companies.length > 0">
                <font-awesome-icon class="social-media-link ml-3" :icon="{ prefix: 'fas', iconName: 'edit'}"
                                   v-b-modal.CompanyRoleModal></font-awesome-icon>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col class="opacity-text-8" md="12" v-if="user.description !== null && user.description.length > 0 && !personalInfoEditting">
                {{user.description}}
                <font-awesome-icon class="social-media-link" :icon="{ prefix: 'fas', iconName: 'edit'}" v-on:click="editPersonalInfo()"></font-awesome-icon>
              </b-col>

              <b-col v-if="(user.description === null || user.description.length === 0) && !personalInfoEditting" v-on:click="editPersonalInfo()">
                Add Description
                <font-awesome-icon class="social-media-link ml-3" :icon="{ prefix: 'fas', iconName: 'edit'}"></font-awesome-icon>
              </b-col>
              <b-col v-if="personalInfoEditting">
                <b-textarea style="min-height: 100px;" v-model="user.description" type="text"></b-textarea>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="personalInfoEditting">
              <b-col>
                <b-button v-on:click="saveBaseAccountInfo()" class="pull-right" variant="primary">Save</b-button>
                <b-button v-on:click="editPersonalInfo()" class="pull-right" variant="danger">Cancel</b-button>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col class="opacity-text-8" md="12">
                <b-link v-if="user.website !== null && user.website.length > 0" class="social-media-link"
                        v-bind:href="user.website">
                  <font-awesome-icon :icon="{prefix: 'fas', iconName: 'globe'}"></font-awesome-icon>
                </b-link>
                <b-link v-for="site in user.social_media_sites" class="social-media-link"
                        v-bind:href="getLinkFromSite(site)" target="_blank">
                  <font-awesome-icon :icon="{ prefix: 'fab', iconName: site.site }"></font-awesome-icon>
                </b-link>
                <span v-if="user.social_media_sites.length === 0" class="modal-hover" v-b-modal.AddSocialMediaModal>
                  Add social media sites
                  <font-awesome-icon class="social-media-link ml-3"
                                     :icon="{ prefix: 'fas', iconName: 'edit'}"></font-awesome-icon>
                </span>
                <font-awesome-icon v-if="user.social_media_sites.length > 0" class="social-media-link ml-3"
                                   :icon="{ prefix: 'fas', iconName: 'edit'}"
                                   v-b-modal.AddSocialMediaModal></font-awesome-icon>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col>
                <ul>
                  <li v-for="tag in user.tags" :key="tag.id">
                    <div :id="'tag' + tag.id"
                         class="btn-ceecee-oval-red">{{tag.description}}
                    </div>
                  </li>
                  <li v-if="user.tags.length === 0" class="opacity-text-8 modal-hover" v-b-modal.UserTagsModal>
                    Add abilities
                    <font-awesome-icon class="social-media-link ml-3"
                                       :icon="{ prefix: 'fas', iconName: 'edit'}"></font-awesome-icon>
                  </li>
                  <li v-if="user.tags.length > 0" v-b-modal.UserTagsModal>
                    <font-awesome-icon class="social-media-link ml-3"
                                       :icon="{ prefix: 'fas', iconName: 'edit'}"></font-awesome-icon>
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
                      <span class="text-primary edit" v-on:click="editAddressInfo()"
                            v-if="user.country !== null">{{user.country}}</span>
                      <span class="text-primary edit" v-on:click="editAddressInfo()" v-if="user.country === null">Add country</span>
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
                      <span class="text-primary edit" v-on:click="editAddressInfo()"
                            v-if="user.city !== null">{{user.city}}</span>
                      <span class="text-primary edit" v-on:click="editAddressInfo()" v-if="user.city === null">Add city</span>
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
                      <span class="text-primary edit" v-on:click="editAddressInfo()"
                            v-if="user.address !== null">{{user.address}}</span>
                      <span class="text-primary edit" v-on:click="editAddressInfo()" v-if="user.address === null">Add address</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="addressInfoEditting">
                      <b-form-input v-model="user.address" type="text"></b-form-input>
                    </b-col>
                  </b-row>

                  <!-- Zipcode -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon"
                                         :icon="{ prefix: 'fas', iconName: 'map-marker-alt' }"/>
                      <b style="padding-left: 5px;">Zipcode</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!addressInfoEditting">
                      <span class="text-primary edit" v-on:click="editAddressInfo()"
                            v-if="user.zipcode !== null">{{user.zipcode}}</span>
                      <span class="text-primary edit" v-on:click="editAddressInfo()" v-if="user.zipcode === null">Add zipcode</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="addressInfoEditting">
                      <b-form-input v-model="user.zipcode" type="text"></b-form-input>
                      <b-form-checkbox v-model="user.addressVis">
                        Address visible to everyone
                      </b-form-checkbox>
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
                      <font-awesome-icon v-b-modal.DeleteAccountModal class="text-danger ml-1"
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
                      <b-form-checkbox v-model="user.mailVis">
                        Email visible to everyone
                      </b-form-checkbox>
                    </b-col>
                  </b-row>

                  <!-- Username -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon" :icon="{ prefix: 'far', iconName: 'user' }"/>
                      <b style="padding-left: 5px;">Username</b>
                    </b-col>
                    <b-col style="padding-left: 45px;">
                      <span class="text-primary edit">{{user.username}}</span>
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
                            v-if="user.birthdate !== null">{{getBirthdateAsText(user.birthdate)}}</span>
                      <span class="text-primary edit" v-on:click="editContactInfo()" v-if="user.birthdate === null">Add birthdate</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="contactInfoEditting">
                      <datetime class="mb15 vdate" type="date" input-class="form-control" placeholder="" format="dd-MM-yyyy"
                                v-model="user.birthdate"></datetime>

                      <b-form-checkbox class="mt-3" v-model="user.birthdateVis">
                        Birthdate visible to everyone
                      </b-form-checkbox>
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
    <social-media-modal v-bind:sites="socialMediaSites" v-bind:smrs="user.social_media_sites"
                        v-bind:resourceId="user.id" v-bind:type="type"
                        v-bind:website="user.website"></social-media-modal>
    <change-password-modal v-bind:username="user.username" v-bind:userid="user.id"></change-password-modal>
    <company-role-modal v-bind:companies="companies" v-bind:user_companies="user.companies"></company-role-modal>
    <user-tags-modal v-bind:tags="tags" v-bind:user_tags="user.tags"></user-tags-modal>
    <delete-account-modal :id="user.id"></delete-account-modal>
    <register-company-modal></register-company-modal>
  </b-container>
</template>

<script>
import UserMenu from '@/components/UserProfile/UserMenu'
import Tag from '@/components/Core/Other/Tag'

import CommunityApi from '@/services/api/community.js'
import TagsApi from '@/services/api/tags.js'
import auth from '@/services/api/Authentication.js'
import uploadFile from '@/services/api/uploadFile.js'

import socialMediaModal from '@/components/Core/Modals/AddSocialMediaModal'
import changePasswordModal from '@/components/Core/Modals/ChangePasswordModal'
import companyRoleModal from '@/components/Core/Modals/CompanyRoleModal'
import userTagsModal from '@/components/Core/Modals/UserTagsModal'
import deleteAccountModal from '@/components/Core/Modals/DeleteAccountModal'
import registerCompanyModal from '@/components/Core/Modals/RegisterCompanyModal'

import Company from '../Admin/Companies/Company'
import moment from 'moment'

export default {
  name: 'user-profile',
  components: {
    Company,
    UserMenu,
    Tag,
    socialMediaModal,
    changePasswordModal,
    companyRoleModal,
    userTagsModal,
    deleteAccountModal,
    registerCompanyModal
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
      addressInfoEditting: false,
      companies: [],
      tags: [],
      date: null
    }
  },
  methods: {
    selectImage() {
      document.getElementById('baseImgFile').click()
    },
    fileChanged(event) {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader()
        reader.onload = function (e) {
          // e.target.result is the base64 image
          document.getElementById('baseImg').style.backgroundImage = 'url(\'' + e.target.result + '\')'
        }
        reader.readAsDataURL(event.target.files[0])

        let imageFile = event.target.files[0] // this is the img file
        uploadFile.uploadFile(this.user.id, 'profile', imageFile)
      }
    },
    getLinkFromSite(site) {
      if (site.site === 'linkedin') {
        return 'https://www.linkedin.com/in/' + site.url
      }
      return 'https://www.' + site.site + '.com/' + site.url
    },
    getBirthdateAsText(birthdate) {
      return moment(birthdate).format('DD-MM-YYYY')
    },
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
    deleteUser() {
      let data = {user_id: this.user.id}
      auth.deleteUser(data).then((resp) => {
        if (resp.data.success) {
          this.$router.push({path: '/lr'})
        } else {
          this.$toasted.show('Failed to delete this account.',
            {
              position: 'top-center',
              duration: 3000
            }
          )
        }
      })
    },
    saveBaseAccountInfo() {
      this.user.birthdate = moment(this.user.birthdate)
      auth.updateUser({user: this.user}).then((resp) => {
        console.log(resp)
        if (!resp.data.success) {
          this.$toasted.show('Failed to change your information',
            {
              position: 'top-center',
              duration: 3000
            }
          )
        } else {
          this.$store.dispatch('updateToken', resp.data.token)
          this.getProfile()
          this.contactInfoEditting = false
          this.personalInfoEditting = false
          this.accountInfoEditting = false
          this.addressInfoEditting = false
          this.$toasted.show('Successfully changed your information',
            {
              position: 'top-center',
              duration: 3000
            }
          )
        }
      }).catch((err) => {
        console.log(err)
        this.$toasted.show('Failed to change your information',
          {
            position: 'top-center',
            duration: 3000
          }
        )
      })
    },
    compare (resourceSocialMediaSites, socialMediaSites) {
      let ids = [];
      resourceSocialMediaSites.forEach((i) => ids.push(i.social_media_id));
      this.socialMediaSites = socialMediaSites.filter(function (item) {
        return ids.indexOf(item.id) === -1
      })
    },
    getCompanyLink(id, name) {
      name = name.replace(/\s+/g, '-').toLowerCase()
      return '/company/' + id + '/' + name
    },
    getProfile () {
      CommunityApi.getProfile().then(response => {
        if (!response.data.success) {
          this.$store.dispatch('logout')
        }
        this.user = response.data.user
        console.log(this.user)
        this.compare(response.data.user.social_media_sites, response.data.sites)
        this.type = response.data.type
      }).catch((err) => {
        this.$store.dispatch('logout')
      })

      CommunityApi.getCompanies().then(response => {
        if (response.data.success) {
          this.companies = response.data.data
        } else {
          this.$store.dispatch('logout')
        }
      }).catch((err) => {
        this.$store.dispatch('logout')
      })

      TagsApi.getUserTags().then((resp) => {
        if (resp.data.success) {
          this.tags = resp.data.data
        } else {
          this.$store.dispatch('logout')
        }
      }).catch((err) => {
        this.$store.dispatch('logout')
      })
    }
  },
  created () {
    Emitter.$on('userPasswordChanged', (token) => {
      this.$store.dispatch('updateToken', token)
      this.$toasted.show('Succesfully changed your password',
        {
          position: 'top-center',
          duration: 3000
        }
      )
    })
    Emitter.$on('companyRolesChanged', () => {
      this.getProfile()
      this.$toasted.show('Successfully changed your company roles',
        {
          position: 'top-center',
          duration: 3000
        }
      )
    })
    Emitter.$on('userTagsChanged', () => {
      this.$toasted.show('Successfully changed your abilities',
        {
          position: 'top-center',
          duration: 3000
        }
      )
    })

    Emitter.$on('updatedSocialMediaSiteForUser', (token) => {
      this.$store.dispatch('updateToken', token)
      this.getProfile()
      this.$toasted.show('Successfully updated your socials',
        {
          position: 'top-center',
          duration: 3000
        }
      )
    })
  },
  mounted() {
    this.getProfile()
    let imageURL = ""
    uploadFile.checkIfFileExists(this.user.id);
  }
}
</script>

<style scoped>
  .main-icon {
    width: 20px;
    text-align: right;
    cursor: pointer;
  }

  .main-icon:hover {
    color: #999;
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

  .social-media-link {
    color: #7dacff;
    font-size: 25px;
    transition: 250ms;
    margin-left: 15px;
  }

  .social-media-link:first-of-type {
    margin-left: 0;
  }

  .social-media-link:hover {
    color: #6c94dc;
    cursor: pointer;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
  }

  .btn-ceecee-oval-red {
    background-color: #E60000;
    color: #fff;
  }

  .modal-hover {
    cursor: pointer;
  }

  .modal-hover:hover {
    color: #fff;
  }

  #baseImgFile {
    display: none
  }

  .image-wrapper {
    display: inline-block;
    position: relative;
  }

  .image-wrapper .image-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
    top: 0;
    left: 0;
    border-radius: 50%;
    text-align: center;
    line-height: 150px;
    color: white;
    font-size: 35px;
    opacity: 0;
    visibility: hidden;
    transition: 250ms;
    cursor: pointer;
  }

  .image-wrapper:hover .image-overlay {
    opacity: 1;
    visibility: visible;
  }

</style>
