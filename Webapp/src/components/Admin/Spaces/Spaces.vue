<template>
    <b-container style="margin-top: 150px;">
        <b-row>
            <admin-menu v-bind:active="active"></admin-menu>
            <b-col md="8">
                <b-row v-for="space in spaces" class="user-list-item">
                <AdminCard 
                    :firstcol="space.title"
                    :secondcol="space.capacity" 
                    :target="'/admin/spaces/' + space.id"></AdminCard>
                </b-row>
            </b-col>
        </b-row>
        <action-button color="red" :fixed="true" icon="plus" v-b-modal.newevent></action-button>
        <!-- Modal Component -->
    <b-modal ref="newSpaceModal" hide-footer id="newspace" title="Nieuwe ruimte">
    
        <b-button class="float-right" v-on:click="addSpace">Opslaan</b-button>
  </b-modal>
    </b-container>
</template>

<script>
  import AdminMenu from '@/components/Admin/AdminMenu'
  import SpaceApi from '@/services/api/spaces.js'
 // import AdminEventApi from '@/services/api/admin/events.js'
  import moment from 'moment'
  import ActionButton from '@/components/Core/Other/ActionButton'
  import AdminCard from '@/components/Core/Other/AdminCard'

  export default {
    name: "spaces",
    components: {
      AdminMenu,
      ActionButton,
      AdminCard
    },
    data() {
      return {
        active: "Spaces",
        spaces: []
      }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY')
      },
      addSpace(){
          

        //   AdminEventApi.addEvent(event).then(response => { 
        //       this.$refs.newEventModal.hide();
        //       this.newEventTitle = '';
        //       this.newEventDescription = '';
        //       this.newEventStart = '';
        //       this.newEventEnd = '';

        //       this.events.push(event);
        //    });
      }
    },
    mounted() {
        SpaceApi.getSpaces().then(response => this.spaces = response.data.data);
    }
  }
</script>

<style scoped>

</style>
