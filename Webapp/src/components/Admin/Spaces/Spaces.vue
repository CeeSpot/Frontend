<template>
  <b-container style="margin-top: 150px;">
    <b-row>
      <admin-menu v-bind:active="active"></admin-menu>
      <b-col md="8" v-if="authorised">
        <b-row v-for="space in spaces" class="user-list-item">
          <AdminCard
            :firstcol="space.title"
            :secondcol="space.capacity"
            :target="'/admin/spaces/' + space.id"></AdminCard>
        </b-row>
      </b-col>
    </b-row>
    <action-button color="red" :fixed="true" icon="plus" v-b-modal.newspace></action-button>
    <!-- Modal Component -->
    <b-modal ref="newspace" hide-footer id="newspace" title="Nieuwe ruimte">
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

        <b-button class="float-right" v-on:click="addSpace">Opslaan</b-button>
      </b-row>
    </b-modal>
  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import SpaceApi from '@/services/api/spaces.js'
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
      spaces: [],
      newSpace: {},
      authorised: false
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY')
    },
    addSpace() {
      SpaceApi.addSpace(this.newSpace).then(response => {
        this.newSpace.title = '';
        this.newSpace.description = '';
        this.newSpace.short_description = '';
        this.newSpace.capacity = 0;
        this.newSpace.costs = '';
        this.newSpace.targets = '';
        this.newSpace.facilities = '';

        this.$refs.newspace.hide();
        SpaceApi.getSpaces().then(response => this.spaces = response.data.data);
      })
    }
  },
  mounted() {
    Emitter.$on('authorised', () => {
      this.authorised = true
      SpaceApi.getSpaces().then((response) => this.spaces = response.data.data);
    })
  }
}
</script>

<style scoped>

</style>
