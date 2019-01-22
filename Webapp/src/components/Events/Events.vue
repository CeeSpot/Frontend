<template>
    <b-container class="p-3 container-margin">
    <b-row id="upcoming-header"><b-col><h1>Upcoming events</h1></b-col></b-row>
    <b-row id="upcoming-container">
    <b-col cols="12" md="4" xl="4" lg="4" v-for="upcoming in upcomingEvents" v-on:click="routeToEvent(upcoming.id)">
        <b-card class="mb-2 upc-card">
            <div class="upc-title">
                <strong>{{upcoming.title}}<br/></strong>
                <span>{{getDateFormat(upcoming.start)}} @ {{getTimeFormat(upcoming.start)}} - {{getTimeFormat(upcoming.end)}}</span>
            </div>
        </b-card>
    </b-col>
    </b-row>
    <b-row id="allevents-header"><b-col><h1>All events</h1></b-col></b-row>
        <b-row style="height: 40px;">
            <b-col xs="6" v-if="showCalendar">
                <b-button style="background-color: white; color: black; height: 30px; line-height: 15px;"
                        v-on:click="fireMethodCalendar('prev')">
                    <font-awesome-icon icon="chevron-left"/>
                </b-button>
                <b-button style="background-color: white; color: black; height: 30px; line-height: 15px;"
                        v-on:click="fireMethodCalendar('next')">
                    <font-awesome-icon icon="chevron-right"/>
                </b-button>
                <span class="header-title">{{headerTitle}}</span>
            </b-col>
            <b-col xs="6" v-else>
                <b-row>
                    <b-col md="8">
                        <b-input-group class="form-group-search">
                            <b-form-input v-model="search" :placeholder="$t('events.search')"
                                            class="form-control"></b-form-input>
                            <span class="form-control-icon">
                                <font-awesome-icon icon="search" class="search-color"/>
                            </span>
                        </b-input-group>
                    </b-col>
                </b-row>
               
            </b-col>
            <b-col xs="6" class="text-right">
                <div class="toggle">
                    <div class="switch">
                        <input type="radio" class="switch-input" name="view" value="calendar" id="calendar"
                               v-on:click="toggleView('list')" checked>
                        <label for="calendar" class="switch-label switch-label-off">&nbsp;list</label>
                        <input type="radio" class="switch-input" name="view" value="calendar" id="list"
                               v-on:click="toggleView('calendar')">
                        <label for="list" class="switch-label switch-label-on">&nbsp;calendar</label>
                        <span class="switch-selection"></span>
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-row class="mt-3" v-bind:class="{'show':showCalendar, 'hidden':!showCalendar}">
            <b-col>
                <full-calendar style="background-color: white; box-shadow: 0 3px 5px #d2d2d2;" ref="CalendarRef"
                               :event-sources="eventSources" :config="config"
                               @event-selected="eventSelected"></full-calendar>
            </b-col>
        </b-row>
        <b-row class="mt-3" v-bind:class="{'show': !showCalendar, 'hidden': showCalendar}">
            <b-col md="4" v-for="calEvent in eventList">
                <a v-on:click="routeToEvent(calEvent.id)" style="color: black;">
                    <b-card
                            v-bind:title="calEvent.title"
                            img-src="https://picsum.photos/600/300/?image=23"
                            v-bind:img-alt="calEvent.title"
                            img-top
                            >
                        <p style="font-size: 1em;">
                        {{getDateFormat(calEvent.start)}} @ {{getTimeFormat(calEvent.start)}} - {{getTimeFormat(calEvent.end)}}
                        </p>
                        <p>
                            {{ calEvent.small_description }}
                        </p>
                    </b-card>
                </a>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import eventApi from '@/services/api/events.js'
  import moment from 'moment'

  export default {
    name: 'Events',
    data() {
      return {
        eventSources: [
          {
            events(start, end, timezone, callback) {
              eventApi.getEvents().then(response => {
                callback(response.data.data)
              })
            }
          }
        ],
        config: {
          defaultView: 'month',
          editable: false,
          eventTextColor: '#FFFFFF',
          eventColor: '#E60000',
          header: false,
          locale: 'en'
        },
        headerTitle: '',
        showCalendar: false,
        events: [],
        search: '',
        upcomingEvents: []
      }
    },
    mounted() {
      this.getTitle();
      this.$root.$on('toggleLocaleCalendar', (locale) => {
          this.toggleLocale(locale);
      });
      eventApi.getEvents().then(response => this.events = response.data.data);
      eventApi.getUpcoming().then(response => this.upcomingEvents = response.data.data);
    },
    methods: {
      eventSelected(event, jsEvent, view) {
         location.href = '/event/' + event.id;
      },
      refreshEvents() {
        this.$refs.CalendarRef.$emit('refetch-events');
      },
      fireMethodCalendar(method) {
        this.$refs.CalendarRef.fireMethod(method);
        this.getTitle();
      },
      getTitle() {
        var view = this.$refs.CalendarRef.fireMethod('getView');
        this.headerTitle = view.title;
      },
      toggleLocale(newLocale){
          this.$refs.CalendarRef.fireMethod('option', 'locale', newLocale);
      },
      toggleView(type){
          if (type === 'calendar') this.showCalendar = true;
          else  this.showCalendar = false;
      },
      routeToEvent(id) {
        location.href = '/event/' + id;
      },
      changeDateFormat(dateString, start){
        if(dateString && start){
          return moment(String(dateString)).format('hh:mm')
        } else {
          return moment(String(dateString)).format('hh:mm @ MM MMMM YYYY')
        }
      },
      getDateFormat(input){
          return moment(input).format('DD-MM-YYYY');
      },
      getTimeFormat(input){
          return moment(input).format('HH:mm');
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    computed: {
        eventList() {
            return this.events.filter(event => {
                return event.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Upcoming */
.upc-card{

    background-image: url("https://www.intentsfestival.nl/wp-content/themes/intents2016/images/2018/aftermovie/5.jpg");
    /* Full height */
    height: 100%; 

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 200px;
    width: 100%;
}

.upc-card > .card-body{
    padding: 0px !important;
}

.upc-title{
        background-color: rgba(255,255,255,1);
    margin-top: 115px;
    padding-left: 28px;
    width: 100%;
}

.upc-title > strong{
    font-size: 22px;
}

.upc-title > span{
    font-size: 16px;
    font-style: italic;
}

#upcoming-container{
    margin-bottom: 30px;
}

#upcoming-header{
    margin-bottom: 15px;
}
/* END */

#allevents-header{
    margin-bottom: 15px;
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
        display: none;
    }

    .toggle {
        position: relative
    }

    .toggle .switch {
        position: absolute;
        margin: 20px auto;
        height: 30px;
        border-radius: 5px;
        width: 125px;
        top: -20px;
        right: 0;
        background-color: white;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15) !important;
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
        font-size: 12px;
        padding-top: 2px;
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

    .switch-label-3 {
        padding-left: 2px;
    }

    .switch-input {
        display: none;
    }

    .switch-input:checked + .switch-label {
        /*font-weight: bold;*/
        color: white;
        -webkit-transition: 0.15s ease-out;
        -moz-transition: 0.15s ease-out;
        -o-transition: 0.15s ease-out;
        transition: 0.15s ease-out;
    }

    .switch-input:checked + .switch-label-off ~ .switch-selection {
        width: 54px;
        left: 5px;
    }

    .switch-input:checked + .switch-label-on ~ .switch-selection {
        left: 57px;
        width: 60px;
        /* Note: left: 50% doesn't transition in WebKit */
    }

    .switch-input:checked + .switch-label-3 ~ .switch-selection {
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

    .header-title {
        font-size: 1.5em;
        padding-left: 25px;
    }

    @media (max-width: 992px) {
        .header-title {
            font-size: 1.2em;
            padding-left: 5px;
        }
    }

    .hidden {
        display: none !important;
    }
    .show {}


        .search-color {
        color: #E60000;
        font-size: 25px;
    }

    .form-group-search .form-control {
        padding-left: 0rem;
    }

    .form-group-search .form-control-icon {
        position: absolute;
        z-index: 2;
        display: block;
        width: 2.375rem;
        right: 5px;
        height: 2.375rem;
        line-height: 2.375rem;
        text-align: center;
        padding-top: 5px;
        pointer-events: none;
        color: #aaa;
    }
</style>
