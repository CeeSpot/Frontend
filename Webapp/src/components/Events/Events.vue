<template>
  <b-container class="p-3 container-margin">
    <full-calendar ref="CalendarRef" :event-sources="eventSources" :config="config" @event-selected="eventSelected"></full-calendar>

        <div>
            <!-- Modal Component -->
            <b-modal id="EventModal" ref="EventModalRef" size="lg" :title="selectedEvent.title" hide-footer>
              <p class="my-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis</p>
              <b-row>
                <b-col md="12" class="text-center">
                  <button v-on:click="signUpEvent()" type="button" class="btn btn-ceecee-red text-center">
                    Sign up for this event!
                  </button>
                </b-col>
              </b-row>
            </b-modal>
        </div>
        <social-sharing url="https://vuejs.org/"
                      title="The Progressive JavaScript Framework"
                      description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                      quote="Vue is a progressive framework for building user interfaces."
                      hashtags="vuejs,javascript,framework"
                      twitter-user="vuejs"
                      v-cloak inline-template>
        <div>
      <network network="facebook">
        <i class="fa fa-facebook"></i> Facebook
      </network>
      <network network="linkedin">
        <i class="fa fa-linkedin"></i> LinkedIn
      </network>
      <network network="reddit">
        <i class="fa fa-reddit"></i> Reddit
      </network>
      <network network="telegram">
        <i class="fa fa-telegram"></i> Telegram
      </network>
      <network network="twitter">
        <i class="fa fa-twitter"></i> Twitter
      </network>
      <network network="whatsapp">
        <i class="fa fa-whatsapp"></i> Whatsapp
      </network>
        </div>
      </social-sharing>
  </b-container>
</template>

<script>
import eventApi from '@/services/api/events.js'

export default {
  name: 'Events',
  data() {
    return {
      eventSources: [
        {
          events(start, end, timezone, callback) {
            eventApi.getEvents().then(response => { callback(response.data) })
          }
        }
      ],
      config: {
        defaultView: 'month',
        editable: false,
        eventTextColor: '#FFFFFF',
        eventColor: '#E60000'
      },
      selectedEvent: {
        title: '',
        description: ''
      } 
    }
  },
  mounted () {
  },
  methods: {
    eventSelected(event, jsEvent, view){
      console.log(view);
      console.log(this.$refs.CalendarRef);
      this.selectedEvent.title = event.title;
      this.$refs.EventModalRef.show()
    },
    signUpEvent(){
      this.$refs.EventModalRef.hide()
    },
    changeView(view) {
      //Month : month - Week : agendaWeek - Day : agendaDay
      this.$refs.CalendarRef.fireMethod('changeView', view)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .col{
    background: #000;
    border:1px solid green;
    color: #fff;
  }

  .container-margin {
    margin-top: 130px;
  }
</style>
