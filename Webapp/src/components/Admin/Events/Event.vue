<template>
    <b-container style="margin-top: 150px;">
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
    <button class="fab red" v-on:click="updateEvent">
        <font-awesome-icon style="cursor: pointer;" icon="save" class="save"/>
    </button>
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
          let data = {data: {event_id: event.id}}
          AdminEventApi.deleteEvent(data).then(response => {
              this.events = this.events.filter(e => e.id != event.id);
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
    .fab {
    border: none;
    font-size: 22px;
    color: white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin: auto;
    -webkit-box-shadow: 2px 3px 3px 0px rgba(41, 41, 41, .3);
    box-shadow: 2px 3px 3px 0px rgba(41, 41, 41, .3);
    position: fixed;
    bottom: 0;
    right: 0;
    margin-bottom: 20px;
    margin-right: 20px;
    cursor: pointer;
}

.red{
    background: #E60000;
}

.red:hover{
    background: #FF2C2C;
}
</style>
