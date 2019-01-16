<template>
    <b-container style="margin-top: 150px;">
    <b-form-input class="mb15" type="text" v-model="company.name"></b-form-input>
    <b-form-input class="mb15" type="text" v-model="company.description"></b-form-input>
    </b-container>
</template>

<script>
  import AdminMenu from '@/components/Admin/AdminMenu'
  import CommunityApi from '@/services/api/community.js'
  import TagApi from '@/services/api/tags.js'
  import ActionButton from '@/components/Core/Other/ActionButton'

  export default {
    name: "company",
    components: {
      AdminMenu,
      ActionButton
    },
    data() {
      return {
          company: {}
      }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY')
      }
    },
    mounted() {
        CommunityApi.getCompany(this.$route.params.id).then(response => {
            this.company = response.data.data[0];
        })
    }
  }
</script>

<style scoped>
</style>
