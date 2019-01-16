<template>
    <b-container style="margin-top: 150px;">
    <b-col cols="4" class="text-center" offset="4" style="margin-bottom: 20px;">
    <action-button 
        color="red" 
        icon="save" 
        :fixed="false"
        v-on:click.native="updateSpace"></action-button>
    <action-button 
        color="red" 
        icon="trash" 
        :fixed="false"
        v-on:click.native="deleteSpace"
        style="margin-left: 15px;"></action-button>

    </b-col>
    <b-row>
    <b-col cols="6">
    <b-card class="no-scale" title="General info">
    <b-form-input class="mb15" type="text" v-model="space.title" placeholder="Naam"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="space.description" placeholder="Omschrijving"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="space.short_description" placeholder="Korte omschrijving"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="space.capacity" placeholder="Capaciteit"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="space.location" placeholder="Locatie"></b-form-input>
    </b-card>
    </b-col>
    </b-row>
    </b-container>
</template>

<script>
  import AdminMenu from '@/components/Admin/AdminMenu'
  import SpaceApi from '@/services/api/spaces.js'
 // import AdminEventApi from '@/services/api/admin/spaces.js'
  import moment from 'moment'
  import ActionButton from '@/components/Core/Other/ActionButton'

  export default {
    name: "space",
    components: {
      AdminMenu,
      ActionButton
    },
    data() {
      return {
          space: {}
      }
    },
    methods: {
        deleteSpace(){
          let data = {data: {space_id: this.space.id}}
          SpaceApi.deleteSpace(data).then(response => {
              if (response.data.success){
                  this.$router.push({ path: '/admin/spaces' });
              }
          });
      },
      updateSpace() {
          SpaceApi.updateSpace(this.space).then(response => { 
              console.log(response.data.success);
              });
      }
    },
    mounted() {
      SpaceApi.getSpace(this.$route.params.id).then(response => {
          this.space = response.data.data[0];
      })
    }
  }
</script>

<style scoped>
</style>
