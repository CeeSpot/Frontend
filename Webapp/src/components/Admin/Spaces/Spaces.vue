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
    <add-admin-space-modal></add-admin-space-modal>
  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import SpaceApi from '@/services/api/spaces.js'
import moment from 'moment'
import ActionButton from '@/components/Core/Other/ActionButton'
import AdminCard from '@/components/Core/Other/AdminCard'
import AddAdminSpaceModal from '@/components/Core/Modals/Admin/AddAdminSpaceModal'

export default {
  name: "spaces",
  components: {
    AdminMenu,
    ActionButton,
    AdminCard,
    AddAdminSpaceModal
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
    getSpaces() {
      SpaceApi.getSpaces().then((response) => {
        if (response.data.success) {
          this.spaces = response.data.data
        } else {
          this.getSpaces()
        }
      }).catch(() => this.getSpaces())
    }
  },
  mounted() {
    Emitter.$on('authorised', () => {
      this.authorised = true
      this.getSpaces()
    })
    Emitter.$on('addSpace', () => {
      this.getSpaces()
    })
  }
}
</script>

<style scoped>

</style>
