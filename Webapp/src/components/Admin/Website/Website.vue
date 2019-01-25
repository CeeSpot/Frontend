<template>
  <b-container style="margin-top: 150px;">
    <b-row>
      <admin-menu v-bind:active="active"></admin-menu>
        <b-col md="8" v-if="authorised">
        <b-row v-for="txt in text" class="user-list-item">
          <AdminCard
            :firstcol="txt.key"
            secondcol=""
            :target="'/admin/website/edit/' + txt.id"></AdminCard>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import ActionButton from '@/components/Core/Other/ActionButton'
import {VueEditor} from 'vue2-editor'
import websiteApi from '@/services/api/website.js'
import AdminCard from '@/components/Core/Other/AdminCard'

export default {
  name: "website",
  components: {
    AdminMenu,
    ActionButton,
    VueEditor,
    AdminCard
  },
  data() {
    return {
      active: "Website",
      authorised: false,
      text: []
    }
  },
  methods: {
 
  },
  mounted() {
    Emitter.$on('authorised', () => {
      this.authorised = true
      websiteApi.getText().then(response => {
        console.log(response);
        this.text = response.data.data;
      }).catch((err) => {
        if (!err.data.authorised) {
          this.$router.push({path: '/'})
        }
      })
    })
  }
}
</script>
<style scoped>
</style>
