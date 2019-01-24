<template>

  <b-modal ref="newEventModal" id="newevent" title="Nieuw evenement">
    <b-form-input class="mb15" v-model="newEvent.title" type="text" placeholder="Titel"></b-form-input>
    <b-form-textarea class="mb15" rows="3" v-model="newEvent.description" type="text"
                     placeholder="Omschrijving"></b-form-textarea>
    <b-form-textarea class="mb15" rows="2" v-model="newEvent.small_description" type="text"
                     placeholder="Korte omschrijving"></b-form-textarea>

    <b-form-select class="mb15" :options="event_categories" v-model="newEvent.category"></b-form-select>

    <datetime class="mb15" type="datetime" input-class="form-control" placeholder="Starttijd"
              format="dd-MM-yyyy HH:mm:ss" v-model="newEvent.start"></datetime>
    <datetime class="mb15" type="datetime" input-class="form-control" placeholder="Eindtijd"
              format="dd-MM-yyyy HH:mm:ss" v-model="newEvent.end"></datetime>
    <b-form-input class="mb15" v-model="newEvent.location_name" type="text" placeholder="Naam locatie"></b-form-input>
    <b-form-input class="mb15" v-model="newEvent.location_address" type="text" placeholder="Adres"></b-form-input>
    <b-form-input class="mb15" v-model="newEvent.location_postalcode" type="text"
                  placeholder="Postcode"></b-form-input>
    <b-form-input class="mb15" v-model="newEvent.location_city" type="text" placeholder="Stad"></b-form-input>
    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="primary" v-on:click="addEvent">Opslaan</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import AdminEventApi from '@/services/api/admin/events.js'
import moment from 'moment'

export default {
  name: 'AddEventModal',
  data () {
    return {
      newEvent: {}
    }
  },
  methods: {

    addEvent() {
      this.newEvent.start = moment(this.newEvent.start).format('YYYY-MM-DD HH:mm:ss');
      this.newEvent.end = moment(this.newEvent.end).format('YYYY-MM-DD HH:mm:ss');

      AdminEventApi.addEvent({event: this.newEvent}).then(response => {
        if (response.data.success && response.data.authorised) {
          this.$refs.newEventModal.hide()
          this.newEvent = {}
          Emitter.$emit('newAdminEventAdded')
        } else {
          if (!response.data.authorised) {
            location.href  = '/'
          } else {
            this.$toasted.show('Failed to add new event. Please try again',
              {
                position: 'top-center',
                duration: 3000
              }
            )
          }
        }
      }).catch((err) => {
        if (!err.data.authorised) {
          location.href = '/'
        } else {
          this.$toasted.show('Failed to add new event. Please try again',
            {
              position: 'top-center',
              duration: 3000
            }
          )
        }
      });
    }
  },
  props: ['event_categories']
}
</script>

<style scoped>

</style>
