<template>
    <b-container style="margin-top: 150px;">
    <b-col cols="4" class="text-center" offset="4" style="margin-bottom: 20px;">
    </b-col>
    <b-row>
    <b-col cols="6">
    <b-card class="no-scale" title="General info">
    <b-form-input class="mb15" type="text" v-model="event.title" placeholder="Naam"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="event.description" placeholder="Omschrijving"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="event.small_description" placeholder="Korte omschrijving"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="start" placeholder="Start"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="end" placeholder="Eind"></b-form-input>
    </b-card>
    </b-col>
    <b-col cols="6">
    <b-card class="no-scale" title="Location">
    <b-form-input class="mb15" type="text" v-model="event.location_name" placeholder="Naam"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="event.location_postalcode" placeholder="Postcode"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="event.location_city" placeholder="Stad"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="event.location_street" placeholder="Straat"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="event.location_number" placeholder="Huisnummer"></b-form-input>
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
                <th scope="col">{{participant.username}}</th><th scope="col"></th>
                <th scope="col"><font-awesome-icon class="pull-right" style="cursor: pointer;" icon="trash" v-on:click="deleteUser(participant.id)"/></th>
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

  export default {
    name: "event",
    components: {
      AdminMenu,
      ActionButton
    },
    data() {
      return {
          event: {},
          start: '',
          end: ''
      }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY')
      },
      deleteEvent(event){
          let data = {data: {event_id: this.event.id}}
          AdminEventApi.deleteEvent(data).then(response => {
              this.$router.push({ path: '/admin/events' });
          });
      },
      deleteUser(user_id){
          let data = {
          data:
            {
              event_id: this.event.id, user_id: user_id
            }
        };
        EventApi.removeUserEvent(data).then(response => {
            for (var i = 0; i < this.event.participants.length; i++){
                if (this.event.participants[i].id === user_id){
                    this.event.participants.splice(i, 1);
                }
            }
        });
      },
      updateEvent() {
          this.event.start = this.start;
          this.event.end = this.end;
          AdminEventApi.updateEvent(this.event).then(response => { alert('succesvol gewijzigd') });
      },
      back() {
        location.href = '/admin/events/'
      }
    },
    mounted() {
      EventApi.getEvent(this.$route.params.id).then(response => {
          this.event = response.data.data;
          this.start = moment(this.event.start).format('YYYY-MM-DD HH:mm');
          this.end = moment(this.event.end).format('YYYY-MM-DD HH:mm');
      })
    }
  }
</script>

<style scoped>
</style>
