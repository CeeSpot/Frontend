<template>
    <b-container style="margin-top: 150px;">
    <b-row>
            <admin-menu v-bind:active="active"></admin-menu>
            <b-col md="8">
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import AdminMenu from '@/components/Admin/AdminMenu'
  import ActionButton from '@/components/Core/Other/ActionButton'
  import settingsApi from '@/services/api/admin/settings.js'

  export default {
    name: "event",
    components: {
      AdminMenu,
      ActionButton
    },
    data() {
      return {
        settings: []
      }
    },
    methods: {
   
    },
    mounted() {
      settingsApi.getSettings().then(response => { 
        this.settings = response.data.data; 
        });
    }
  }
</script>
<style scoped>
</style>
