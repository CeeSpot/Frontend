<template>
    <b-container style="margin-top: 150px;">
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
            this.company = response.data.company;
        })
    }
  }
</script>

<style scoped>
    .user-list-item {
        margin-top: 15px;
        cursor: pointer;
    }

    .user-list-item:first-of-type {
        margin-top: 0;
    }

    .user-card {
        border-radius: 4px;
        padding: 20px;
        background-color: white;
    }

    .user-card:hover {
        background-color: #E60000;
        color: white;
    }
</style>
