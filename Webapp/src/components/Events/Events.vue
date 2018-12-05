<template>
  <b-container class="p-3 container-margin">
       <b-row>
        <b-col md="4">
            <button v-on:click="fireMethodCalendar('prev')">Prev</button>
            <button v-on:click="fireMethodCalendar('next')">Next</button>
            {{headerTitle}}
        </b-col>
        <b-col md="3" offset-md="5">
            <div class="toggle">
              <div class="switch">
                <input type="radio" class="switch-input" name="view" value="day" id="day" v-on:click="changeView('month')" checked>
                <label for="day" class="switch-label switch-label-off">&nbsp;Month</label>
                <input type="radio" class="switch-input" name="view" value="week" v-on:click="changeView('agendaWeek')" id="week">
                <label for="week" class="switch-label switch-label-on">&nbsp;Week</label>
                <input type="radio" class="switch-input" name="view" value="month" v-on:click="changeView('agendaDay')" id="month">
                <label for="month" class="switch-label switch-label-3">&nbsp;Day</label>
                <span class="switch-selection"></span>
              </div>
            </div>
        </b-col>
    </b-row>
    <full-calendar ref="CalendarRef" :event-sources="eventSources" :config="config" @event-selected="eventSelected"></full-calendar>
        <div>
            <!-- Modal Component -->
            <b-modal id="EventModal" ref="EventModalRef" size="lg" :title="selectedEvent.title" hide-footer>
              <p class="my-4">{{selectedEvent.description}}</p>
              <b-row>
                <b-col md="12" class="text-center">
                  <button v-if="!selectedEvent.attend" v-on:click="signUpEvent()" type="button" class="btn btn-ceecee-red text-center">
                    Sign up for this event!
                  </button>
                  <button v-else v-on:click="removeUserEvent()" type="button" class="btn btn-ceecee-red text-center">
                    Unsubscribe 
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
        eventColor: '#E60000',
        header: false
      },
      selectedEvent: {
        id: '',
        title: '',
        description: '',
        attend: false
      },
      headerTitle: '' 
    }
  },
  mounted () {
      this.getTitle();
  },
  methods: {
    eventSelected(event, jsEvent, view){
      this.selectedEvent.id = event.id;
      this.selectedEvent.title = event.title;
      this.selectedEvent.description = event.description;
      if(event.attend){
        this.selectedEvent.attend = event.attend;
      } else {
        this.selectedEvent.attend = false;
      }
      this.$refs.EventModalRef.show()
    },
    signUpEvent(){
      let data = { event_id : this.selectedEvent.id};
      eventApi.addUserEvent(data).then(response => {
         this.refreshEvents(); 
         this.$refs.EventModalRef.hide()
      });
    },
    removeUserEvent(){
      let data = { event_id : this.selectedEvent.id};
      eventApi.removeUserEvent(data).then(response => {
         this.refreshEvents();
         this.$refs.EventModalRef.hide()
      });
    },
    changeView(view) {
      //Month : month - Week : agendaWeek - Day : agendaDay
      this.$refs.CalendarRef.fireMethod('changeView', view);
      this.getTitle();
    },
    refreshEvents() {
      this.$refs.CalendarRef.$emit('refetch-events');
    },
    fireMethodCalendar(method) {
        this.$refs.CalendarRef.fireMethod(method);
        this.getTitle();
    },
    getTitle(){
        var view = this.$refs.CalendarRef.fireMethod('getView');
        this.headerTitle = view.title;
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

  .switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 17px;
  }

  .switch input {
      display:none;
  }

  .toggle{
      position: relative
  }

  .toggle .switch {
  position: absolute;
  margin: 20px auto;
  height: 30px;
  border-radius: 5px;
  width: 175px;
  top:-20px;
  right:0;
  background-color:white;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.15) !important;
}

.switch-label {
  position: relative;
  z-index: 2;
  float: left;
  width: 58px;
  line-height: 26px;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  cursor: pointer;
  font-size:12px;
  padding-top:2px;
}
.switch-label:active {
  /*font-weight: bold; */
}

.switch-label-off {
  padding-left: 1px;
}

.switch-label-on {
  padding-right: 4px;

}
.switch-label-3{
  padding-left: 2px;
}

.switch-input {
  display: none;
}
.switch-input:checked + .switch-label {
  /*font-weight: bold;*/
  color:white;
  -webkit-transition: 0.15s ease-out;
  -moz-transition: 0.15s ease-out;
  -o-transition: 0.15s ease-out;
  transition: 0.15s ease-out;
}
.switch-input:checked + .switch-label-off ~ .switch-selection{
  width: 54px;
  left: 5px;
}
.switch-input:checked + .switch-label-on ~ .switch-selection {
  left: 57px;
  width: 60px;
  /* Note: left: 50% doesn't transition in WebKit */
}
.switch-input:checked + .switch-label-3~ .switch-selection{
  width: 55px;
  left: 114px;
}

.switch-selection {
  display: block;
  position: absolute;
  z-index: 1;
  top: 4px;
  left: 4px;
  width: 58px;
  height: 22px;
   background: #E60000;
  border-radius: 5px;
  -webkit-transition: left 0.15s ease-out;
  -moz-transition: left 0.15s ease-out;
  -o-transition: left 0.15s ease-out;
  transition: left 0.15s ease-out;
}
</style>
