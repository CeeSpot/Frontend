<template>
  <b-container fluid style="margin-top: 100px;">
    <b-row style="background: linear-gradient(to right, #1d2337 40%,#1d2337);padding-top: 50px;padding-bottom: 150px;">
      <b-container>
        <b-row>
          <b-col md="2">
            <b-img rounded="circle" width="200" height="200" class="image-border" src="https://www.theceespot.nl/img/school-of-AI-simply-scaled-640.jpg"></b-img>
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
                {{changeDateFormat(event.start,true)}} - {{changeDateFormat(event.end)}}
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
                            <button v-if="true" type="button" style="width:100%;"
                                    class="btn btn-ceecee-red text-center">
                                Sign up for this event!
                            </button>
                            <button v-else type="button" style="width:100%;"
                                    class="btn btn-ceecee-red text-center">
                                Unsubscribe
                            </button>
                    </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <b-row v-if="event.show_attendees" >
            <b-col>
                 <b-card class="no-scale">
                     <b-row>
                         <b-col>
                            <b-img rounded="circle" class="image-profile-chips" width="100" height="100" src="https://images.pexels.com/photos/555790/pexels-photo-555790.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></b-img>
                         </b-col>
                         <b-col>
                            <b-img rounded="circle" class="image-profile-chips" width="100" height="100" src="https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></b-img>
                         </b-col>
                         <b-col>
                            <b-img rounded="circle" class="image-profile-chips" width="100" height="100" src="https://images.pexels.com/photos/209790/pexels-photo-209790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></b-img>
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
          event: []
      }
    },
    created() {
        this.id = this.$route.params.id;
    },
    mounted() {
        let self = this;
        eventApi.getEvent(this.id).then(response => {this.event = response.data.message[0]})
    },
    methods: {
        changeDateFormat(dateString, start){
            if(dateString && start){
                return moment(String(dateString)).format('hh:mm')
            } else {
                return moment(String(dateString)).format('hh:mm @ MM MMMM YYYY')
            }
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
        border:2px solid #E60000;
  }

  .image-profile-chips {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); 
  }
</style>
