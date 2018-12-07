<template>
    <b-container style="margin-top: 150px;">
        <b-row>
            <admin-menu v-bind:active="active"></admin-menu>
            <b-col md="8">
                <b-row v-for="event in events" class="user-list-item">
                    <b-col md="12" class="bg-white shadow user-card">
                        <b-row>
                            <b-col md="4">{{ formatDate(event.start) }}</b-col>
                            <b-col md="4">{{ event.title }}</b-col>
                            <b-col md="4" class="text-right"><font-awesome-icon style="cursor: pointer;" icon="trash" v-on:click="deleteEvent(event)"/></b-col>
                        </b-row>
                        <!--<transition name="fade">
                            <b-row v-show="openUser === user.id">
                                <b-col>
                                    <b-row>
                                        <hr style="border-bottom: 1px solid #e5e5e5; width: 100%;">
                                    </b-row>
                                    <b-row>
                                        <b-col md="8" id="inputFields">
                                            <b-row>
                                                <b-col md="4">
                                                    <span>First name</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.first_name">
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col md="4">
                                                    <span>Last name</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.last_name">
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col md="4">
                                                    <span>Address</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.address">
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col md="4">
                                                    <span>Zip code</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.zipcode">
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col md="4">
                                                    <span>City</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.city">
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col md="4">
                                                    <span>E-mail</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.email">
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col md="4">
                                                    <span>Phone</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.phone">
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col md="4" class="text-right">
                                            <b-badge variant="success">Geactiveerd</b-badge>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </transition> -->
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <action-button color="red" icon="+" v-b-modal.newevent></action-button>
        <!-- Modal Component -->
    <b-modal ref="newEventModal" hide-footer id="newevent" title="Nieuw evenement">
        <b-form-input class="mb15" v-model="newEventTitle" type="text" placeholder="Titel"></b-form-input>
        <b-form-textarea class="mb15" rows="3" v-model="newEventDescription" type="text" placeholder="Omschrijving"></b-form-textarea>
        <datetime class="mb15" type="datetime" input-class="form-control" placeholder="Starttijd" format="dd-MM-yyyy HH:mm:ss" v-model="newEventStart"></datetime>
        <datetime class="mb15" type="datetime" input-class="form-control" placeholder="Eindtijd" format="dd-MM-yyyy HH:mm:ss" v-model="newEventEnd"></datetime>
        
        <b-button class="float-right" v-on:click="addEvent">Opslaan</b-button>
  </b-modal>
    </b-container>
</template>

<script>
  import AdminMenu from '@/components/Admin/AdminMenu'
  import EventApi from '@/services/api/events.js'
  import AdminEventApi from '@/services/api/admin/events.js'
  import moment from 'moment'
  import ActionButton from '@/components/Core/Other/ActionButton'

  export default {
    name: "events",
    components: {
      AdminMenu,
      ActionButton
    },
    data() {
      return {
        active: "Events",
        openUser: null,
        events: [],
        newEventTitle: '',
        newEventDescription: '',
        newEventStart: '',
        newEventEnd: '',
        date: '',
        popoverShow: false
      }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY')
      },
      addEvent(){
          var event = {title: this.newEventTitle, description: this.newEventDescription,
          start: moment(this.newEventStart).format('YYYY-MM-DD HH:mm:ss'), end: moment(this.newEventEnd).format('YYYY-MM-DD HH:mm:ss')}

          AdminEventApi.addEvent(event).then(response => { 
              this.$refs.newEventModal.hide();
              this.newEventTitle = '';
              this.newEventDescription = '';
              this.newEventStart = '';
              this.newEventEnd = '';

              this.events.push(event);
           });
      },
      deleteEvent(event){
          let data = {data: {event_id: event.id}}
          AdminEventApi.deleteEvent(data).then(response => {
              this.events = this.events.filter(e => e.id != event.id);
          });
      }
    },
    mounted() {
      EventApi.getEvents().then(response => this.events = response.data)
    }
  }
</script>

<style scoped>
    .user-list-item {
        margin-top: 15px;
    }

    .user-list-item:first-of-type {
        margin-top: 0;
    }

    .user-card {
        border-radius: 4px;
        padding: 20px;
    }
</style>