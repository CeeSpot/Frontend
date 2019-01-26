<template>

  <b-modal ref="eventrequest" id="eventrequest" title="Verzoek event">
    <b-row>
      <b-col>
          <h3>Event {{activeERequest.title}}</h3>
        <table class="table table-borderless">
          <tbody>
          <tr>
            <th>Description:</th>
            <td>{{activeERequest.small_description}}</td>
          </tr>
          <tr>
            <th>Location:</th>
            <td>{{activeERequest.location_address}} {{activeERequest.location_city}} {{activeERequest.name}} {{activeERequest.postalcode}}</td>
          </tr>
          <tr>
            <th>Start:</th>
            <td>{{activeERequest.startdate}}</td>
          </tr>
          <tr>
            <th>End:</th>
            <td>{{activeERequest.enddate}}</td>
          </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="primary" v-on:click="approve()">Goedkeuren</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import RequestApi from '@/services/api/admin/requests.js'
export default {
  name: 'RequestEventModal',
  methods: {
    approve() {
        RequestApi.approveEvent(this.activeERequest.id).then(response => {
        if (response.data.success && response.data.authorised) {
         Emitter.$emit('updateStateEventRequest', this.activeERequest)
         this.$toasted.show('Successfully updated event state!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
          this.$refs.eventrequest.hide()
        } else {
          if (!response.data.authorised) {
            this.$router.push({path: '/'})
          } else {
            this.$toasted.show('Failed to update state request',
              {
                position: 'top-center',
                duration: 3000
              }
            )
          }
        }
      }).catch((err) => {
        if (!err.data.authorised) {
          this.$router.push({path: '/'})
        } else {
          this.$toasted.show('Failed to update state request',
            {
              position: 'top-center',
              duration: 3000
            }
          )
        }
      })
    }
  },
  props: ['activeERequest']
}
</script>

<style scoped>

</style>
