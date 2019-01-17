<template>
    <b-container style="margin-top: 150px;">
        <b-row>
            <admin-menu v-bind:active="active"></admin-menu>
            <b-col md="8">
            
            </b-col>
        </b-row>
        <action-button color="red" :fixed="true" icon="plus" v-b-modal.newevent></action-button>
        <!-- Modal Component -->
    <b-modal ref="spacerequest" hide-footer id="spacerequest" title="Verzoek ruimte">
    
        <b-button class="float-right" v-on:click="formatDate('')">Opslaan</b-button>
  </b-modal>
    </b-container>
</template>

<script>
  import AdminMenu from '@/components/Admin/AdminMenu'
  import moment from 'moment'
  import ActionButton from '@/components/Core/Other/ActionButton'
  import AdminCard from '@/components/Core/Other/AdminCard'

  export default {
    name: "requests",
    components: {
      AdminMenu,
      ActionButton,
      AdminCard
    },
    data() {
      return {
        active: "Requests",
        
      }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY')
      }
    },
    mounted() {
        
    }
  }
</script>

<style scoped>

</style>
