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
                {{event.description}}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </b-row>
    <b-row style="margin-top: -50px;">
      
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
                return moment(String(dateString)).format('hh:mm - MM MMMM')
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
</style>
