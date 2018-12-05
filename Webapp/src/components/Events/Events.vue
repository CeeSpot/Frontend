<template>
  <b-container class="p-3 container-margin">
    <full-calendar ref="CalendarRef" :events="events" :config="config" @event-selected="eventSelected"></full-calendar>

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
            start  : '2018-12-04'
        },
        {
            title  : 'event2',
            start  : '2018-12-05',
            end    : '2018-12-06',
            allDay : false
        },
        {
            title  : 'event3',
            start  : '2018-12-07T12:30:00',
            allDay : false
        },
      ],
      config: {
        defaultView: 'month',
        editable: false,
        eventTextColor: '#FFFFFF'
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
