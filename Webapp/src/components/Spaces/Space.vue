<template>
  <b-container fluid style="margin-top: 90px;">
    <b-row style="background: linear-gradient(to right, #1d2337 40%,#1d2337);padding-top: 50px;padding-bottom: 150px;">
      <b-container>
        <b-row>
          <b-col md="2">
            <b-img rounded="circle" width="200" height="200" class="image-border"
                   v-bind:src="imageURL"></b-img>
          </b-col>
          <b-col md="9" class="text-white ml-5">
            <b-row>
              <b-col md="12">
                <h1 class="text-white font-weight-bold">
                  {{space.title}}
                </h1>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col class="opacity-text-8" md="12">
                <font-awesome-icon icon="users"/>&nbsp;{{space.capacity}} <br/>
                Targets: {{space.targets}} <br/>
                Facilities: {{space.facilities}}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </b-row>
    <b-row style="margin-top: -80px;">
      <b-container>
        <b-row>
          <b-col md="7">
            <b-card class="no-scale">
              <p>
                {{space.description}}
              </p>
            </b-card>
          </b-col>
          <b-col>
            <b-card class="no-scale">
              <b-row>
                <b-col>
                  <h2>{{$t('space.book-a-space')}}</h2>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <span>Cost: {{space.costs}}</span>
                </b-col>
              </b-row>
              <b-row v-if="loggedIn" class="mt-2">
                <b-col class="text-center">
                  <button type="button" style="width:100%;"
                          class="btn btn-ceecee-red text-center" v-b-modal.bookspace>
                    {{$t('space.book-a-space')}}
                  </button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mb-5">
            <div class="p-2" style="background-color: white;">
              <full-calendar :events="reservations" :config="config"></full-calendar>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-row>

    <!-- Modal Component -->
    <b-modal ref="bookspace" id="bookspace" title="Booking">
      <b-row>
        <b-col>
          <b-alert show variant="danger" v-if="failedMessage.length > 0">{{failedMessage}}</b-alert>
        </b-col>
      </b-row>
      <b-form-group id="nameGroup"
                    label="Name"
                    label-for="name">
        <b-form-input id="name"
                      class="mb15"
                      v-model="form.name"
                      :state="!$v.form.name.$invalid"
                      type="text">
        </b-form-input>
      </b-form-group>
      <b-form-group id="emailGroup"
                    label="Email"
                    label-for="email">
        <b-form-input id="email"
                      class="mb15"
                      v-model="form.email"
                      :state="!$v.form.email.$invalid"
                      type="email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="phoneGroup"
                    label="Phone"
                    label-for="phone">
        <b-form-input id="phone"
                      class="mb15"
                      v-model="form.phone"
                      :state="!$v.form.phone.$invalid"
                      type="tel">
        </b-form-input>
      </b-form-group>
      <b-form-group id="dateGroup"
                    label="Date"
                    label-for="date">
        <datetime id="date"
                  class="mb15"
                  type="date"
                  input-class="form-control"
                  format="dd-MM-yyyy"
                  v-model="form.date">
        </datetime>
      </b-form-group>

      <b-form-group id="startGroup"
                    label="Starts at"
                    label-for="start">
        <datetime id="start"
                  class="mb15"
                  type="time"
                  input-class="form-control"
                  format="HH:mm"
                  v-model="form.start"></datetime>
      </b-form-group>

      <b-form-group id="endGroup"
                    label="Ends at"
                    label-for="end">
        <datetime id="end"
                  class="mb15"
                  type="time"
                  input-class="form-control"
                  format="HH:mm"
                  v-model="form.end"></datetime>
        <small id="website__BV_description_" class="form-text">
            <span v-if="!startAfterEnd && startAfterEnd != null"
                  class="text-danger">Start must be before event</span>
        </small>
      </b-form-group>


      <footer slot="modal-footer">
        <b-row>
          <b-col>
            <b-btn variant="secondary" v-on:click="closeModal">Cancel</b-btn>
            <b-btn variant="primary" v-on:click="addReservation"
                   :disabled="$v.form.$invalid">Save</b-btn>
          </b-col>
        </b-row>
      </footer>
    </b-modal>
  </b-container>
</template>

<script>
import VueMasonryGallery from '@/components/Core/Other/VueMasonryGallery';
import SpaceApi from '@/services/api/spaces.js';
import Authorisation from '@/services/api/Authorisation.js';
import moment from 'moment';
import uploadFile from '@/services/api/uploadFile.js'
import {validationMixin} from 'vuelidate'
import {required, email} from 'vuelidate/lib/validators'

export default {
  name: "Space",
  data() {
    return {
      modalIsVisible: false,
      modalContent: "",
      modalTitle: "",
      space: {},
      form: {
        name: '',
        email: '',
        phone: '',
        date: '',
        start: '',
        end: ''
      },
      startAfterEnd: null,
      failedMessage: '',
      imgsArr: [],
      loggedIn: false,
      eventSources: [],
      reservations: [],
      imageURL: '',
      config: {
        header: {
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        defaultView: 'month',
        editable: false,
        eventTextColor: '#FFFFFF',
        eventColor: '#E60000',
        locale: 'en',
        displayEventEnd: true
      }
    }
  },
  mixins: [
    validationMixin
  ],
  validations: {
    form: {
      name: {
        required
      },
      email: {
        required, email
      },
      phone: {
        required
      }
    }
  },
  methods: {
    addReservation() {
      this.booking.date = moment(this.booking.date).format('YYYY-MM-DD');
      this.booking.start = moment(this.booking.start).format('HH:mm');
      this.booking.end = moment(this.booking.end).format('HH:mm');
      SpaceApi.checkAvailability(this.booking).then(response => {
        if (response.data.success && response.data.authorised) {
          this.$refs.bookspace.hide()
          this.$toasted.show('Successfully added your reservation',
            {
              position: 'top-center',
              duration: 3000
            }
          )
        } else {
          // brownie needs to add this
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
    closeModal() {
      this.$refs.bookspace.hide()
    },
    addReservation() {
      let start = moment(moment(this.form.start).format('HH:mm'), 'hh:mm')
      let end = moment(moment(this.form.end).format('HH:mm'), 'hh:mm')
      this.startAfterEnd = moment(start).isBefore(moment(end))
      this.failedMessage = ''
      if (this.startAfterEnd) {
        SpaceApi.checkAvailability({
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          date: moment(this.form.date).format('YYYY-MM-DD'),
          start: start,
          end: end,
          space_id: this.form.space_id,
          space_title: this.form.space_title
        }).then(response => {
          console.log(response)
          if (response.data.success && response.data.authorised) {
            this.$refs.bookspace.hide()
            this.startAfterEnd = null
            this.$toasted.show('Successfully added your reservation',
              {
                position: 'top-center',
                duration: 5000
              }
            )
          } else {
            this.failedMessage = response.data.data
          }
        }).catch((err) => {
          this.failedMessage = err
        })
      } else {
        this.failedMessage = 'Start must be before end'
      }
    },
    clickFn(event, {index}) {
      event.preventDefault();
      this.modalTitle = this.imgsArr[index].title;
      this.modalContent = this.imgsArr[index].srcBig;
      this.showModal();
    },
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    }
  },
  created() {
    Authorisation.isLoggedIn().then((resp) => {
      this.loggedIn = resp.data.success && resp.data.authorised
      let user = this.$store.getters.getUser
      // this.$v.form.name.$model
      if (user.insertions !== null && user.insertions.length > 0) {
        this.form.name = user.first_name + ' ' + user.insertions + ' ' + user.last_name
      } else {
        this.form.name = user.first_name + ' ' + user.last_name
      }
      this.form.email = user.email
      this.form.phone = user.phone
    }).catch(() => {
      this.loggedIn = false
    })
    SpaceApi.getSpace(this.$route.params.id).then(response => {
      this.space = response.data.data;
      // console.log(response);
      uploadFile.checkIfFileExists(this.imageBaseURL + '/spaces/' + this.$route.params.id + '.jpg')
        .then((res) => {
          this.imageURL = this.imageBaseURL + '/spaces/' + this.$route.params.id + '.jpg';
        })
        .catch((err) => {
          this.imageURL = '/static/images/header.jpg';
        });
      this.booking.space_id = this.space.id;
      this.booking.space_title = this.space.title;

      this.reservations = this.space.reservations;
    })
  },
  components: {
    VueMasonryGallery,
  }
}
</script>

<style scoped>
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
</style>
