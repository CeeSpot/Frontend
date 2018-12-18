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
            this.company = response.data.message[0];
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