<template>
  <b-container v-if="authorised" style="margin-top: 150px;">
    <b-col cols="4" class="text-center" offset="4" style="margin-bottom: 20px;">
    </b-col>
    <b-row>
      <b-col cols="6">
        <b-card class="no-scale" title="General info">
          <b-form-input class="mb15" type="text" v-model="event.title" placeholder="Naam"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="event.description" placeholder="Omschrijving"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="event.small_description"
                        placeholder="Korte omschrijving"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="start" placeholder="Start"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="end" placeholder="Eind"></b-form-input>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card class="no-scale" title="Location">
          <b-form-input class="mb15" type="text" v-model="event.location_name" placeholder="Naam"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="event.location_address" placeholder="Straat"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="event.location_postalcode"
                        placeholder="Postcode"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="event.location_city" placeholder="Stad"></b-form-input>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card class="no-scale" title="Participants">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="participant in event.participants">
              <th scope="col">{{participant.username}}</th>
              <th scope="col"></th>
              <th scope="col">
                <font-awesome-icon class="pull-right" style="cursor: pointer;" icon="trash"
                                   v-on:click="deleteUser(participant.id)"/>
              </th>
            </tr>
            </tbody>
          </table>
        </b-card>
      </b-col>
    </b-row>
    <div class="fab-buttons">
      <b-row>
        <b-col>
          <action-button
            color="red"
            icon="trash"
            :fixed="false"
            v-on:click.native="deleteEvent"
          ></action-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <action-button
            color="red"
            icon="save"
            :fixed="false"
            v-on:click.native="updateEvent"></action-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <action-button color="red" :fixed="false" icon="chevron-left" @click.native="back()"></action-button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import EventApi from '@/services/api/events.js'
import AdminEventApi from '@/services/api/admin/events.js'
import moment from 'moment'
import ActionButton from '@/components/Core/Other/ActionButton'
import AuthorisationApi from '@/services/api/Authorisation.js'

export default {
  name: 'event',
  components: {
    AdminMenu,
    ActionButton
  },
  data() {
    return {
      event: {},
      start: '',
      end: '',
      authorised: false
    }
  },
  methods: {
    formatDate (date) {
      return moment(date).format('DD-MM-YYYY')
    },
    deleteEvent (event) {
      let data = {data: {event_id: this.event.id}}
      AdminEventApi.deleteEvent(data).then(response => {
        if (response.data.success && response.data.authorised) {
          this.$router.push({path: '/admin/events'})
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
    },
    deleteUser (userId) {
      let data = {
        data: {
          event_id: this.event.id, user_id: userId
        }
      }
      EventApi.removeUserEvent(data).then(response => {
        for (var i = 0; i < this.event.participants.length; i++) {
          if (this.event.participants[i].id === userId) {
            this.event.participants.splice(i, 1)
          }
        }
      })
    },
    updateEvent () {
      this.event.start = this.start
      this.event.end = this.end

      AdminEventApi.updateEvent({event: this.event}).then(response => {
        if (response.data.success && response.data.authorised) {
          alert('succesvol gewijzigd')
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
    },
    back () {
      location.href = '/admin/events/'
    }
  },
  mounted () {
    AuthorisationApi.isAdmin().then((resp) => {
      if (resp.data.authorised) {
        this.authorised = true
        EventApi.getEvent(this.$route.params.id).then(response => {
          this.event = response.data.data
          this.start = moment(this.event.start).format('YYYY-MM-DD HH:mm')
          this.end = moment(this.event.end).format('YYYY-MM-DD HH:mm')
        })
      } else {
        location.href = '/'
      }
    }).catch(() => {
      location.href = '/'
    })
  }
}
</script>

<style scoped>
</style>
