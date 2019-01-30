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
    <b-modal ref="bookspace" hide-footer id="bookspace" title="Boeking">
      <b-row>
        <b-col cols="12"><label>Naam:</label></b-col>
        <b-col cols="12">
          <b-form-input class="mb15" v-model="booking.name" type="text"></b-form-input>
        </b-col>

        <b-col cols="12"><label>Email:</label></b-col>
        <b-col cols="12">
          <b-form-input class="mb15" v-model="booking.email" type="text"></b-form-input>
        </b-col>

        <b-col cols="12"><label>Telefoon:</label></b-col>
        <b-col cols="12">
          <b-form-input class="mb15" v-model="booking.phone" type="text"></b-form-input>
        </b-col>

        <b-col cols="12"><label>Datum:</label></b-col>
        <b-col cols="12">
        <datetime class="mb15" type="date" input-class="form-control" placeholder="" format="dd-MM-yyyy"
                  v-model="booking.date"></datetime>
        </b-col>

        <b-col cols="12"><label>Start:</label></b-col>
        <b-col cols="12">
        <datetime class="mb15" type="time" input-class="form-control" placeholder="" format="HH:mm"
                  v-model="booking.start"></datetime>
        </b-col>

        <b-col cols="12"><label>Eind:</label></b-col>
        <b-col cols="12">
        <datetime class="mb15" type="time" input-class="form-control" placeholder="" format="HH:mm"
                  v-model="booking.end"></datetime>
        </b-col>


        <b-col cols="12" class="text-right">
        <b-button variant="primary" class="float-right" v-on:click="addReservation">Opslaan</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </b-container>
</template>

<script>
import VueMasonryGallery from '@/components/Core/Other/VueMasonryGallery';
import SpaceApi from '@/services/api/spaces.js';
import Authorisation from '@/services/api/Authorisation.js';
import moment from 'moment';
import uploadFile from '@/services/api/uploadFile.js'

export default {
  name: "Space",
  mounted() {
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
  data() {
    return {
      modalIsVisible: false,
      modalContent: "",
      modalTitle: "",
      space: {},
      booking: {},
      imgsArr: [],
      loggedIn: false,
      eventSources: [],
      reservations: [],
      imageURL: '',
      config: {
        header: {
  left:   'title',
  center: '',
  right:  'today prev,next'
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
    getData() {
      // In the real environment,the backend will return a new image array based on the parameter group.
      // Here I simulate it with a stunned json file.
      this.imgsArr = [
        {
          title: "Test",
          src: "https://www.teachprivacy.com/wp-content/uploads/Hacker1.jpg",
          srcBig: "https://www.teachprivacy.com/wp-content/uploads/Hacker1.jpg",
          href: "https://picsum.photos/600/300/?image=5"
        },
        {
          title: "Test",
          src: "https://pbs.twimg.com/media/DoQGxT6W0AAPred.png",
          srcBig: "https://pbs.twimg.com/media/DoQGxT6W0AAPred.png",
          href: "https://picsum.photos/600/300/?image=4"
        },
        {
          title: "Test",
          src: "http://www2.pictures.zimbio.com/mp/yLDsty1F6N2x.jpg",
          srcBig: "http://www2.pictures.zimbio.com/mp/yLDsty1F6N2x.jpg",
          href: "https://picsum.photos/600/300/?image=4"
        },
        {
          title: "Test",
          src: "https://pbs.twimg.com/media/DoQGxT6W0AAPred.png",
          srcBig: "https://pbs.twimg.com/media/DoQGxT6W0AAPred.png",
          href: "https://picsum.photos/600/300/?image=4"
        },
        {
          title: "Test",
          src: "https://www.incimages.com/uploaded_files/image/1940x900/getty_818918912_2000133120009280241_360639.jpg",
          srcBig: "https://www.incimages.com/uploaded_files/image/1940x900/getty_818918912_2000133120009280241_360639.jpg",
          href: "https://picsum.photos/600/300/?image=4"
        },
        {
          title: "Test",
          src: "https://pbs.twimg.com/media/DoQGxT6W0AAPred.png",
          srcBig: "https://pbs.twimg.com/media/DoQGxT6W0AAPred.png",
          href: "https://picsum.photos/600/300/?image=4"
        }
      ];
    },
    clickFn(event, {index}) {
      event.preventDefault();
      console.log(this.imgsArr[index].title);
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
    this.getData();
    Authorisation.isLoggedIn().then((resp) => {
      this.loggedIn = resp.data.success && resp.data.authorised
      let user = this.$store.getters.getUser
      if (user.insertions !== null && user.insertions.length > 0) {
        this.booking.name = user.first_name + ' ' + user.insertions + ' ' + user.last_name
      } else {
        this.booking.name = user.first_name + ' ' + user.last_name
      }
      this.booking.email = user.email
      this.booking.phone = user.phone
    }).catch(() => {
      this.loggedIn = false
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
