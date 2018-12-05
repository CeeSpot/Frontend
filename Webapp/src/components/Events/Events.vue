<template>
  <b-container class="p-3 container-margin">
    <full-calendar :events="events" :config="config" @event-selected="eventSelected"></full-calendar>

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
export default {
  name: 'Events',
  data() {
    return {
      events: [
        {
            title  : 'BlaBla',
            start  : '2018-12-04',
        },
        {
            title  : 'event2',
            start  : '2018-12-05',
            end    : '2018-12-06',
        },
        {
            title  : 'event3',
            start  : '2018-12-07T12:30:00',
            allDay : false,
        },
      ],
      config: {
        defaultView: 'month',
        editable: false
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
      this.selectedEvent.title = event.title;
      this.$refs.EventModalRef.show()
    },
    signUpEvent(){
      this.$refs.EventModalRef.hide()
    }
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
