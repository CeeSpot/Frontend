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
    <add-event-modal :event_categories="event_categories"></add-event-modal>
  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import EventApi from '@/services/api/events.js'
import AdminEventApi from '@/services/api/admin/events.js'
import moment from 'moment'
import ActionButton from '@/components/Core/Other/ActionButton'
import AdminCard from '@/components/Core/Other/AdminCard'
import AddEventModal from '@/components/Core/Modals/Admin/AddEventModal'

export default {
  name: "events",
  components: {
    AdminMenu,
    ActionButton,
    AdminCard,
    AddEventModal
  },
  data() {
    return {
      active: "Events",
      openUser: null,
      events: [],
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
    getEvents() {
      EventApi.getEvents().then((response) => {
        if (response.data.success) {
          this.events = response.data.data
        } else {
          this.getEvents()
        }
      }).catch(() => {
        this.getEvents()
      })
    },
    getEventCategories () {
      EventApi.getEventCategories().then(response => {
        if (response.data.success) {
          this.event_categories = response.data.data;
          this.event_categories.push({value: null, text: 'Geen categorie'});
        } else {
          this.getEventCategories()
        }
      }).catch(() => {
        this.getEventCategories()
      })
    }
  },
  mounted() {
    Emitter.$on('authorised', () => {
      this.authorised = true
      this.getEvents()
      this.getEventCategories()
    })
    Emitter.$on('newAdminEventAdded', () => {
      this.getEvents()
    })
  }
}
</script>

<style scoped>

</style>
