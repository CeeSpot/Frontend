<template>
    <b-container class="p-3 container-margin">
        <b-row>
            <b-col xs="6">
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
            <b-col xs="6" class="text-right">
                <div class="toggle">
                    <div class="switch">
                        <input type="radio" class="switch-input" name="view" value="day" id="day"
                               v-on:click="changeView('month')" checked>
                        <label for="day" class="switch-label switch-label-off">&nbsp;{{$t('events.month')}}</label>
                        <input type="radio" class="switch-input" name="view" value="week"
                               v-on:click="changeView('agendaWeek')" id="week">
                        <label for="week" class="switch-label switch-label-on">&nbsp;{{$t('events.week')}}</label>
                        <input type="radio" class="switch-input" name="view" value="month"
                               v-on:click="changeView('agendaDay')" id="month">
                        <label for="month" class="switch-label switch-label-3">&nbsp;{{$t('events.day')}}</label>
                        <span class="switch-selection"></span>
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <full-calendar style="background-color: white; box-shadow: 0 3px 5px #d2d2d2;" ref="CalendarRef"
                               :event-sources="eventSources" :config="config"
                               @event-selected="eventSelected"></full-calendar>
            </b-col>
        </b-row>
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
              eventApi.getEvents().then(response => {
                callback(response.data.message)
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
        headerTitle: ''
      }
    },
    mounted() {
      this.getTitle()
      this.$root.$on('toggleLocaleCalendar', (locale) => {
          this.toggleLocale(locale);
      })
    },
    methods: {
      eventSelected(event, jsEvent, view) {
         location.href = '/event/' + event.id;
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
      getTitle() {
        var view = this.$refs.CalendarRef.fireMethod('getView');
        this.headerTitle = view.title;
      },
      toggleLocale(newLocale){
          this.$refs.CalendarRef.fireMethod('option', 'locale', newLocale);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
        width: 175px;
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
</style>
