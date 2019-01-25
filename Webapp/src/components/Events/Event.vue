<template>
  <b-container fluid style="margin-top: 100px;">
    <b-row style="background: linear-gradient(to right, #1d2337 40%,#1d2337);padding-top: 50px;padding-bottom: 150px;">
      <b-container>
        <b-row>
          <b-col md="2">
            <b-img rounded="circle" width="200" height="200" class="image-border"
                   src="https://www.theceespot.nl/img/school-of-AI-simply-scaled-640.jpg"></b-img>
          </b-col>
          <b-col md="9" class="text-white ml-5">
            <b-row>
              <b-col md="12">
                <h1 class="text-white font-weight-bold">
                  {{event.title}}
                </h1>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <h4 class="text-white">
                  {{changeDateFormat(event.start, true)}} - {{changeDateFormat(event.end)}}
                </h4>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col class="opacity-text-8" md="12">
                {{event.small_description}}
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
              {{event.description}}
            </b-card>
          </b-col>
          <b-col>
            <b-card class="no-scale">
              <b-row>
                <b-col>
                  <ins class="font-weight-bold">@ {{event.location_name}}</ins>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <span>{{event.location_street}} {{event.location_number}} {{event.location_number_suffix}}</span>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <span>{{event.location_postalcode}}</span>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <span>{{event.location_city}}</span>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col class="text-center">
                  <button disabled v-if="user === null" type="button" style="width:100%;"
                          class="btn btn-ceecee-red text-center">
                    {{$t('event.login-to-join')}}
                  </button>
                  <button v-if="user !== null && user_attend === false" type="button" style="width:100%;"
                          class="btn btn-ceecee-red text-center" v-on:click="signUpEvent()">
                    {{$t('event.join')}}
                  </button>
                  <button v-if="user !== null && user_attend === true" type="button" style="width:100%;"
                          class="btn btn-ceecee-red text-center" v-on:click="removeUserEvent()">
                    {{$t('event.unsubscribe')}}
                  </button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <b-row v-if="event.show_attendees">
          <b-col>
            <b-card class="no-scale">
              <b-row class="text-center">
                <b-col v-if="participants.length === 0">
                  Er hebben zich nog geen gebruikers aangemeld voor dit event
                </b-col>
                <b-col>
                  <ul>
                    <li v-for="participant in participants">
                      <b-img rounded="circle" v-b-tooltip.hover
                             :title="fullName(participant.first_name, participant.insertions, participant.last_name)"
                             class="image-profile-chips" width="100" height="100"
                             src="https://images.pexels.com/photos/555790/pexels-photo-555790.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
                      </b-img>
                    </li>
                  </ul>
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
import eventApi from '@/services/api/events.js'
import moment from 'moment'

export default {
  name: 'Event',
  data() {
    return {
      event: [],
      participants: [],
      user: [],
      user_attend: false
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  mounted () {
    this.getEvent()
  },
  methods: {
    changeDateFormat(dateString, start) {
      if (dateString && start) {
        return moment(String(dateString)).format('hh:mm')
      } else {
        return moment(String(dateString)).format('hh:mm @ MM MMMM YYYY')
      }
    },
    getEvent () {
      eventApi.getEvent(this.id).then(response => {
          if(!response.data.success){
          this.$toasted.show('Failed to load event try again later!',
            {
              position: 'top-center',
              duration: 3000
            }
          )
         }
        this.event = response.data.data
        this.user = this.$store.getters.getUser
        if (this.event.show_attendees) {
          this.participants = response.data.data.participants
          if (this.user) {
            this.participants.forEach(participant => {
              if (participant.id === this.user.id) {
                this.user_attend = true
              }
            })
          }
        }
      })
    },
    fullName (first_name, insertion, last_name) {
      let full_name
      if (insertion) {
        full_name = first_name + ' ' + insertion + ' ' + last_name
      } else {
        full_name = first_name + ' ' + last_name
      }
      return full_name
    },
    signUpEvent () {
      let data = {event_id: this.event.id}
      eventApi.addUserEvent(data).then(response => {
        if(response.data.success){
                this.$toasted.show('Succesfully signed up',
                  {
                    position: 'bottom-center',
                    duration: 5000
                  }
                );
                this.participants.push(this.user)
                this.user_attend = true
        } else {
                this.$toasted.show('Something went wrong try again later!',
                  {
                    position: 'bottom-center',
                    duration: 5000
                  }
                );
        }
      })
    },
    removeUserEvent () {
      let data = {
        data:
          {
            event_id: this.event.id
          }
      }
      eventApi.removeUserEvent(data).then(response => {
        if(response.data.success){
          this.participants.splice(this.user, 1);
          this.user_attend = false;
          this.$toasted.show('Succesfully unsubscribed',
            {
              position: 'bottom-center',
              duration: 5000
            }
          )
        } else {
          this.$toasted.show('Something went wrong try again later!',
            {
              position: 'bottom-center',
              duration: 5000
            }
          )
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
