<template>
  <b-container fluid style="margin-top: 100px;">
    <b-row style="background: linear-gradient(to right, #1d2337 40%,#1d2337);padding-top: 50px;padding-bottom: 150px;">
      <b-container>

        <b-row  align-v="start" class="d-flex flex-row">

          <b-col lg="auto" md="auto" sm="auto" cols="auto" clas="d-flex flex-column">

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
          <b-col class="text-white d-flex flex-column flex-grow">


            <!-- Persons name -->
            <b-row class=" text-white" style="z-index: 5;">
              <b-col md="12">
                <h2 class="text-white">
                  {{company.name}}
                </h2>
              </b-col>
            </b-row>

            <!-- Social media on small screen-->

            <b-row class="mt-3">
              <b-col class="opacity-text-8" md="12">
                <b-link v-if="company.website !== null && company.website.length > 0" class="social-media-link"
                        v-bind:href="company.website">
                  <font-awesome-icon :icon="{prefix: 'fas', iconName: 'globe'}"></font-awesome-icon>
                </b-link>
                <b-link v-for="site in company.social_media_sites" class="social-media-link text-white"
                        v-bind:href="getLinkFromSite(site)" target="_blank">
                  <font-awesome-icon :icon="{ prefix: 'fab', iconName: site.site }"></font-awesome-icon>
                </b-link>
                <span v-if="company.social_media_sites.length === 0" class="modal-hover" v-b-modal.AddSocialMediaModal>
                  Add social media sites
                  <font-awesome-icon class="social-media-link ml-3"
                                     :icon="{ prefix: 'fas', iconName: 'edit'}"></font-awesome-icon>
                </span>
                <font-awesome-icon v-if="company.social_media_sites.length > 0" class="social-media-link ml-3"
                                   :icon="{ prefix: 'fas', iconName: 'edit'}"
                                   v-b-modal.AddSocialMediaModal></font-awesome-icon>
              </b-col>
            </b-row>

            <b-row class="mt-3">
              <b-col class="opacity-text-8" md="12" v-if="company.description !== null && company.description.length > 0 && !descriptionEditting">
                {{company.description}}
                <font-awesome-icon class="social-media-link" :icon="{ prefix: 'fas', iconName: 'edit'}" v-on:click="editDescription()"></font-awesome-icon>
              </b-col>

              <b-col v-if="(company.description === null || company.description.length === 0) && !descriptionEditting" v-on:click="editDescription()">
                Add Description
                <font-awesome-icon class="social-media-link ml-3" :icon="{ prefix: 'fas', iconName: 'edit'}"></font-awesome-icon>
              </b-col>
              <b-col v-if="descriptionEditting">
                <b-textarea style="min-height: 100px;" v-model="company.description" type="text"></b-textarea>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="descriptionEditting">
              <b-col>
                <b-button v-on:click="saveBaseAccountInfo()" class="pull-right" variant="primary">Save</b-button>
                <b-button v-on:click="editDescription()" class="pull-right" variant="danger">Cancel</b-button>
              </b-col>
            </b-row>

            <!-- Tags-->
            <b-row class="mt-2">
              <b-col>
                <ul>
                  <li v-for="tag in company.tags" :key="tag.id">
                    <div :id="'tag' + tag.id"
                         class="btn-ceecee-oval-red">{{tag.description}}
                    </div>
                  </li>
                  <li v-if="company.tags.length === 0" class="opacity-text-8 modal-hover" v-b-modal.UserTagsModal>
                    Add branches
                    <font-awesome-icon class="social-media-link ml-3"
                                       :icon="{ prefix: 'fas', iconName: 'edit'}"></font-awesome-icon>
                  </li>
                  <li v-if="company.tags.length > 0" v-b-modal.UserTagsModal>
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
                              v-if="company.country !== null">{{company.country}}</span>
                      <span class="text-primary edit" v-on:click="editAddressInfo()" v-if="company.country === null">Add country</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="addressInfoEditting">
                      <b-form-input v-model="company.country" type="text"></b-form-input>
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
                              v-if="company.city !== null">{{company.city}}</span>
                      <span class="text-primary edit" v-on:click="editAddressInfo()" v-if="company.city === null">Add city</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="addressInfoEditting">
                      <b-form-input v-model="company.city" type="text"></b-form-input>
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
                              v-if="company.address !== null">{{company.address}}</span>
                      <span class="text-primary edit" v-on:click="editAddressInfo()" v-if="company.address === null">Add address</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="addressInfoEditting">
                      <b-form-input v-model="company.address" type="text"></b-form-input>
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
                              v-if="company.zipcode !== null">{{company.zipcode}}</span>
                      <span class="text-primary edit" v-on:click="editAddressInfo()" v-if="company.zipcode === null">Add zipcode</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="addressInfoEditting">
                      <b-form-input v-model="company.zipcode" type="text"></b-form-input>
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
                    <b-col md="10" sm="10" cols="10">
                      <h6 class="text-uppercase"><b>Account info</b>
                      </h6>
                    </b-col>
                    <b-col class="text-right pull-right">
                      <font-awesome-icon v-b-modal.DeleteAccountModal class="text-danger ml-1"
                                         :icon="{ prefix: 'fas', iconName: 'trash' }"/>
                    </b-col>
                  </b-row>

                  <!-- Username -->
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon" :icon="{ prefix: 'far', iconName: 'user' }"/>
                      <b style="padding-left: 5px;">Username</b>
                    </b-col>
                    <b-col style="padding-left: 45px;">
                      <span class="text-dark">{{company.username}}</span>
                    </b-col>
                  </b-row>

                  <!-- Password -->
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
                    <b-col md="2" class="text-right pull-right">
                      <font-awesome-icon v-on:click="editContactInfo()" class=""
                                         :icon="{ prefix: 'far', iconName: 'edit' }"/>
                    </b-col>
                  </b-row>

                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon"
                                         :icon="{ prefix: 'far', iconName: 'envelope' }"/>
                      <b style="padding-left: 5px;">Email</b>
                    </b-col>

                    <b-col style="padding-left: 45px;" v-if="!contactInfoEditting">
                      <span class="text-primary edit" v-on:click="editContactInfo()">{{company.email}}</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="contactInfoEditting">
                      <b-form-input v-model="company.email" type="email"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col md="12">
                      <font-awesome-icon class="text-light main-icon"
                                         :icon="{ prefix: 'fas', iconName: 'phone' }"/>
                      <b style="padding-left: 5px;">Phone number</b>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="!contactInfoEditting">
                        <span class="text-primary edit" v-on:click="editContactInfo()"
                              v-if="company.phone !== null">{{company.phone}}</span>
                      <span class="text-primary edit" v-on:click="editContactInfo()" v-if="company.phone === null">Add phone</span>
                    </b-col>
                    <b-col style="padding-left: 45px;" v-if="contactInfoEditting">
                      <b-form-input v-model="company.phone" type="tel"></b-form-input>
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
    <social-media-modal v-bind:sites="socialMediaSites" v-bind:smrs="company.social_media_sites"
                        v-bind:resourceId="company.id" v-bind:type="type"
                        v-bind:website="company.website"></social-media-modal>
    <change-password-modal :type="type" v-bind:username="company.username" v-bind:userid="company.id"></change-password-modal>
  </b-container>
</template>

<script>
import CommunityApi from '@/services/api/community.js'
import uploadFile from '@/services/api/uploadFile.js'
import socialMediaModal from '@/components/Core/Modals/AddSocialMediaModal'
import auth from '@/services/api/Authentication.js'
import changePasswordModal from '@/components/Core/Modals/ChangePasswordModal'

export default {
  name: 'companyprofile',
  components: {
    socialMediaModal,
    changePasswordModal
  },
  data () {
    return {
      company: null,
      failedMessage: 'dsfs',
      type: -22,
      socialMediaSites: null,
      addressInfoEditting: false,
      contactInfoEditting: false,
      descriptionEditting: false
    }
  },
  methods: {
    saveBaseAccountInfo() {

      auth.updateCompany({company: this.company}).then((resp) => {
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
          this.getCompanyProfile()
          this.contactInfoEditting = false
          this.descriptionEditting = false
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
        uploadFile.uploadFile(this.company.id, 'company', imageFile)
      }
    },
    compare (resourceSocialMediaSites, socialMediaSites) {
      let ids = [];
      resourceSocialMediaSites.forEach((i) => ids.push(i.social_media_id));
      this.socialMediaSites = socialMediaSites.filter(function (item) {
        return ids.indexOf(item.id) === -1
      })
    },
    getCompanyProfile () {
      CommunityApi.getCompanyProfile().then(response => {
        console.log(response)
        this.failedMessage = null
        console.log(response.data.company)
        this.company = response.data.company
        this.compare(response.data.company.social_media_sites, response.data.sites)
        this.type = response.data.type
      }).catch(() => {
        this.failedMessage = 'Failed loading data, please '
      })
    },
    getLinkFromSite(site) {
      if (site.site === 'linkedin') {
        return 'https://www.linkedin.com/in/' + site.url
      }
      return 'https://www.' + site.site + '.com/' + site.url
    },
    editAddressInfo() {
      this.addressInfoEditting = !this.addressInfoEditting
    },
    editContactInfo() {
      this.contactInfoEditting = !this.contactInfoEditting
    },
    editDescription() {
      this.descriptionEditting = !this.descriptionEditting
    }
  },
  mounted () {
    this.getCompanyProfile()

    Emitter.$on('updatedSocialMediaSiteForCompany', (token) => {
      this.$store.dispatch('updateToken', token)
      this.getCompanyProfile()
      this.$toasted.show('Successfully updated the company socials',
        {
          position: 'top-center',
          duration: 3000
        }
      )
    })

    Emitter.$on('companyPasswordChanged', (token) => {
      this.$store.dispatch('updateToken', token)
      this.$toasted.show('Succesfully changed your password',
        {
          position: 'top-center',
          duration: 3000
        }
      )
    })
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

  #baseImgFile {
    display: none
  }
</style>
