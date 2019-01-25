<template>

  <b-modal ref="spacerequest" id="spacerequest" title="Verzoek ruimte">
    <b-row>
      <b-col>
        <h3>Boeking {{activeSRequest.space_title}}</h3>
        <table class="table table-borderless">
          <tbody>
          <tr>
            <th>Naam:</th>
            <td>{{activeSRequest.name}}</td>
          </tr>
          <tr>
            <th>Telefoon:</th>
            <td>{{activeSRequest.phone}}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{{activeSRequest.email}}</td>
          </tr>
          <tr>
            <th>Datum:</th>
            <td>{{activeSRequest.stringdate}}</td>
          </tr>
          <tr>
            <th>Starttijd:</th>
            <td>{{activeSRequest.start}}</td>
          </tr>
          <tr>
            <th>Eindtijd:</th>
            <td>{{activeSRequest.end}}</td>
          </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="primary" v-on:click="approveDeclineSR(1)">Goedkeuren</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import RequestApi from '@/services/api/admin/requests.js'
export default {
  name: 'UpdateSpaceRequestStateModal',
  methods: {
    approveDeclineSR(approved) {
      RequestApi.updateReservationState(this.activeSRequest, approved).then(response => {
        if (response.data.success && response.data.authorised) {
          Emitter.$emit('updateStateSpaceRequest', this.activeSRequest)
         this.$toasted.show('Successfully updated reservation state!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
          this.$refs.spacerequest.hide()
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
  props: ['activeSRequest']
}
</script>

<style scoped>

</style>
