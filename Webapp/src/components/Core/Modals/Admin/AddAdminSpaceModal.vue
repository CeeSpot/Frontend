<template>
  <b-modal ref="newspace" id="newspace" title="Nieuwe ruimte">
    <b-row>
      <b-col cols="12"><label>Titel:</label></b-col>
      <b-col cols="12">
        <b-form-input class="mb15" v-model="newSpace.title" type="text"></b-form-input>
      </b-col>

      <b-col cols="12"><label>Omschrijving:</label></b-col>
      <b-col cols="12">
        <b-form-input class="mb15" v-model="newSpace.description" type="text"></b-form-input>
      </b-col>

      <b-col cols="12"><label>Korte omschrijving:</label></b-col>
      <b-col cols="12">
        <b-form-input class="mb15" v-model="newSpace.short_description" type="text"></b-form-input>
      </b-col>

      <b-col cols="12"><label>Capaciteit (aantal personen):</label></b-col>
      <b-col cols="12">
        <b-form-input class="mb15" v-model="newSpace.capacity" type="number"></b-form-input>
      </b-col>

      <b-col cols="12"><label>Gebruiken voor:</label></b-col>
      <b-col cols="12">
        <b-form-input class="mb15" v-model="newSpace.targets" type="text"></b-form-input>
      </b-col>

      <b-col cols="12"><label>Faciliteiten:</label></b-col>
      <b-col cols="12">
        <b-form-input class="mb15" v-model="newSpace.facilities" type="text"></b-form-input>
      </b-col>

      <b-col cols="12"><label>Kosten:</label></b-col>
      <b-col cols="12">
        <b-form-input class="mb15" v-model="newSpace.costs" type="text"></b-form-input>
      </b-col>
    </b-row>
    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn class="float-right" variant="primary" v-on:click="addSpace">Opslaan</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import SpaceApi from '@/services/api/spaces.js'
export default {
  name: 'AddAdminSpaceModal',
  data () {
    return {
      newSpace: {}
    }
  },
  methods: {
    addSpace() {
      SpaceApi.addSpace(this.newSpace).then(response => {
         if(response.data.success){
         this.$toasted.show('Successfully added space!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        }
        this.newSpace = {}
        Emitter.$emit('addSpace')
        this.$refs.newspace.hide()
      })
    }
  }
}
</script>

<style scoped>

</style>
