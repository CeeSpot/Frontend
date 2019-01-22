<template>
  <b-container style="margin-top: 150px;">
    <b-row>
      <admin-menu v-bind:active="active"></admin-menu>
      <b-col md="8" v-if="authorised">
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
      <b-form-input class="mb15" v-model="newEvent.title" type="text" placeholder="Titel"></b-form-input>
      <b-form-textarea class="mb15" rows="3" v-model="newEvent.description" type="text"
                       placeholder="Omschrijving"></b-form-textarea>
      <b-form-textarea class="mb15" rows="2" v-model="newEvent.small_description" type="text"
                       placeholder="Korte omschrijving"></b-form-textarea>

                       <b-form-select class="mb15" :options="event_categories" 
                       v-model="newEvent.category"></b-form-select>

      <datetime class="mb15" type="datetime" input-class="form-control" placeholder="Starttijd"
                format="dd-MM-yyyy HH:mm:ss" v-model="newEvent.start"></datetime>
      <datetime class="mb15" type="datetime" input-class="form-control" placeholder="Eindtijd"
                format="dd-MM-yyyy HH:mm:ss" v-model="newEvent.end"></datetime>
      <b-form-input class="mb15" v-model="newEvent.location_name" type="text" placeholder="Naam locatie"></b-form-input>
      <b-form-input class="mb15" v-model="newEvent.location_address" type="text" placeholder="Adres"></b-form-input>
      <b-form-input class="mb15" v-model="newEvent.location_postalcode" type="text"
                    placeholder="Postcode"></b-form-input>
      <b-form-input class="mb15" v-model="newEvent.location_city" type="text" placeholder="Stad"></b-form-input>
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
      newEvent: {},
      date: '',
      openEvent: null,
      editEvent: null,
      authorised: false,
      event_categories: [],
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY')
    },
    addEvent() {
      this.newEvent.start = moment(this.newEvent.start).format('YYYY-MM-DD HH:mm:ss');
      this.newEvent.end = moment(this.newEvent.end).format('YYYY-MM-DD HH:mm:ss');

      AdminEventApi.addEvent({event: this.newEvent}).then(response => {
        if (response.data.success && response.data.authorised) {
          this.$refs.newEventModal.hide();
          this.newEvent = {};
          EventApi.getEvents().then(response => this.events = response.data.data)
        } else {
          if (!response.data.authorised) {
            location.href  = '/'
          }
        }
      }).catch((err) => {
        if (!err.data.authorised) {
          location.href = '/'
        }
      });
    },
    deleteEvent(event) {
      let data = {data: {event_id: event.id}}
      AdminEventApi.deleteEvent(data).then(response => {
        if (response.data.success && response.data.authorised) {
          this.events = this.events.filter(e => e.id !== event.id)
        } else {
          if (!response.data.authorised) {
            this.$router.push({path: '/'})
          }
        }
      }).catch((err) => {
        if (!err.data.authorised) {
          this.$router.push({path: '/'})
        }
      })
    }
  },
  mounted() {
    Emitter.$on('authorised', () => {
      this.authorised = true
      EventApi.getEvents().then((response) => this.events = response.data.data);
      EventApi.getEventCategories().then(response => {
        this.event_categories = response.data.data;
        this.event_categories.push({ value: null, text: 'Geen categorie'});
        });
    })
  }
}
</script>

<style scoped>

</style>
