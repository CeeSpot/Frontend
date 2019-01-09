<template>
    <b-container style="margin-top: 150px;">
        <b-row>
            <admin-menu v-bind:active="active"></admin-menu>
            <b-col md="8">
                <b-row v-for="event in events" class="user-list-item">
                <AdminCard 
                    :firstcol="formatDate(event.start)"
                    :secondcol="event.title" 
                    :target="'/admin/events/' + event.id"></AdminCard>
                </b-row>
            </b-col>
        </b-row>
        <action-button color="red" :fixed="true" icon="plus" v-b-modal.newevent></action-button>
        <!-- Modal Component -->
    <b-modal ref="newEventModal" hide-footer id="newevent" title="Nieuw evenement">
        <b-form-input class="mb15" v-model="newEventTitle" type="text" placeholder="Titel"></b-form-input>
        <b-form-textarea class="mb15" rows="3" v-model="newEventDescription" type="text" placeholder="Omschrijving"></b-form-textarea>
        <b-form-textarea class="mb15" rows="2" v-model="newEventShortDescription" type="text" placeholder="Omschrijving"></b-form-textarea>
        <datetime class="mb15" type="datetime" input-class="form-control" placeholder="Starttijd" format="dd-MM-yyyy HH:mm:ss" v-model="newEventStart"></datetime>
        <datetime class="mb15" type="datetime" input-class="form-control" placeholder="Eindtijd" format="dd-MM-yyyy HH:mm:ss" v-model="newEventEnd"></datetime>
        <b-form-input class="mb15" v-model="newEventLocation" type="text" placeholder="Naam locatie"></b-form-input>
        <b-form-input class="mb15" v-model="newEventAddress" type="text" placeholder="Adres"></b-form-input>
        <b-form-input class="mb15" v-model="newEventHousenr" type="text" placeholder="Huisnr"></b-form-input>
        <b-form-input class="mb15" v-model="newEventPostal" type="text" placeholder="Postcode"></b-form-input>
        <b-form-input class="mb15" v-model="newEventCity" type="text" placeholder="Stad"></b-form-input>
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
  import AdminCard from '@/components/Core/Other/AdminCard'

  export default {
    name: "events",
    components: {
      AdminMenu,
      ActionButton,
      AdminCard
    },
    data() {
      return {
        active: "Events",
        openUser: null,
        events: [],
        newEventTitle: '',
        newEventDescription: '',
        newEventShortDescription: '',
        newEventStart: '',
        newEventEnd: '',
        newEventLocation: '',
        newEventAddress: '',
        newEventHousenr: '',
        newEventPostal: '',
        newEventCity: '',
        date: '',
        openEvent: null,
        editEvent: null
      }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY')
      },
      addEvent(){
          var event = {title: this.newEventTitle, description: this.newEventDescription,
          start: moment(this.newEventStart).format('YYYY-MM-DD HH:mm:ss'), end: moment(this.newEventEnd).format('YYYY-MM-DD HH:mm:ss'),
          shortdescription: this.newEventShortDescription, location: this.newEventLocation, address: this.newEventAddress,
          housenr: this.newEventHousenr, postalcode: this.newEventPostal, city: this.newEventCity}

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
      EventApi.getEvents().then(response => this.events = response.data.data)
    }
  }
</script>

<style scoped>
    .user-list-item {
        margin-top: 15px;
        cursor: pointer;
    }

    .user-list-item:first-of-type {
        margin-top: 0;
    }

    .user-card {
        border-radius: 4px;
        padding: 20px;
        background-color: white;
    }

    .user-card:hover {
        background-color: #E60000;
        color: white;
    }
</style>
