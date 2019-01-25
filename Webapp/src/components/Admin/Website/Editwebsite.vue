<template>
  <b-container v-if="authorised" style="margin-top: 150px;">
    <b-row>
      <b-col>
        <h1>{{text.key}}</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
         <label class="font-weight-bold" for="blognlText">Dutch</label>
        <vue-editor class="card shadow no-scale" id="blognlText" v-model="text.value_nl"></vue-editor>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <label class="font-weight-bold" for="blogenText">English</label>
        <vue-editor class="card shadow no-scale" id="blogenText" v-model="text.value_en"></vue-editor>
      </b-col>
    </b-row>
    <div class="fab-buttons">
      <b-row class="mt-3">
        <b-col>
          <action-button color="red" :fixed="false" icon="save" @click.native="editWebsite()"></action-button>
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
import ActionButton from '@/components/Core/Other/ActionButton'
import {VueEditor} from 'vue2-editor'
import AuthorisationApi from '@/services/api/Authorisation.js'
import websiteApi from '@/services/api/website.js'
import adminWebsiteApi from '@/services/api/admin/website.js'

export default {
  name: 'editwebsite',
  components: {
    ActionButton,
    VueEditor
  },
  data() {
    return {
      authorised: false,
      text: [],
      content: ''
    }
  },
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    editWebsite() {
      adminWebsiteApi.updateText(this.text).then(response => {
        if (response.data.success && response.data.authorised) {
          this.$toasted.show('Successfully edited text!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
          location.href = '/admin/website/'
        } else {
          this.$toasted.show('Something went wrong try again later!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        }
      });
    },
    back() {
      location.href = '/admin/website/'
    },
  },
  mounted() {
    AuthorisationApi.isAdmin().then((resp) => {
      if (resp.data.authorised) {
        this.authorised = true
        websiteApi.getOneText(this.id).then(response => {
          this.text = response.data.data[0];
         })
      } else {
        location.href = '/'
      }
    }).catch(() => {
      location.href = '/'
    })
  }
}
</script>
<style scoped>

</style>
