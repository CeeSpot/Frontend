<template>
  <b-container style="margin-top: 150px;">
    <b-row>
      <admin-menu v-bind:active="active"></admin-menu>
      <b-col md="8" v-if="authorised">
        <b-row v-for="company in companies" class="user-list-item">
          <AdminCard
            :firstcol="company.name"
            :secondcol="company.name"
            :target="'/admin/companies/' + company.id"></AdminCard>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import AdminMenu from '@/components/Admin/AdminMenu'
  import CommunityApi from '@/services/api/community.js'
  import TagApi from '@/services/api/tags.js'
  import ActionButton from '@/components/Core/Other/ActionButton'
  import AdminCard from '@/components/Core/Other/AdminCard'

  export default {
    name: "companies",
    components: {
      AdminMenu,
      ActionButton,
      AdminCard
    },
    data() {
      return {
        active: "Companies",
        companies: [],
        authorised: false,
      }
    },
    methods: {
      formatDate(date) {
        return moment(date).format('DD-MM-YYYY')
      },
      openDetailPage(id) {
        this.$router.push('/admin/companies/' + id);
      }
    },
    mounted() {
      Emitter.$on('authorised', () => {
        this.authorised = true
        CommunityApi.getCompanies().then((response) => this.companies = response.data)
      })
    }
  }
</script>

<style scoped>
</style>
