<template>
  <b-container v-if="authorised" style="margin-top: 150px;">
    <b-form-group label="Name" label-for="companyName">
      <b-form-input id="companyName" class="mb15" type="text" v-model="company.name"></b-form-input>
    </b-form-group>

    <b-form-group label="Description" label-for="companyDescription">
      <b-form-input id="companyDescription" class="mb15" type="text" v-model="company.description"></b-form-input>
    </b-form-group>

    <b-form-group label="Name" label-for="companyEmail">
      <b-form-input id="companyEmail" class="mb15" type="email" v-model="company.email"></b-form-input>
    </b-form-group>

    <b-form-group label="Name" label-for="companyPhone">
      <b-form-input id="companyPhone" class="mb15" type="tel" v-model="company.phone"></b-form-input>
    </b-form-group>
    <div class="fab-buttons">
      <b-row class="mt-3">
        <b-col>
          <action-button color="red" :fixed="false" icon="chevron-left" @click.native="back()"></action-button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import CommunityApi from '@/services/api/community.js'
import TagApi from '@/services/api/tags.js'
import ActionButton from '@/components/Core/Other/ActionButton'
import AuthorisationApi from '@/services/api/Authorisation.js'

export default {
  name: 'company',
  components: {
    AdminMenu,
    ActionButton
  },
  data() {
    return {
      company: {},
      authorised: false
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY')
    },
    back() {
      this.$router.push({path: '/admin/companies'})
    }
  },
  mounted() {
    AuthorisationApi.isAdmin().then((resp) => {
      if (resp.data.authorised) {
        this.authorised = true
        CommunityApi.getCompany(this.$route.params.id).then(response => {
          if(!response.data.success){
            this.$toasted.show('Failed to load company!',
              {
                position: 'top-center',
                duration: 3000
              }
            )
          }
          this.company = response.data.company;
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
