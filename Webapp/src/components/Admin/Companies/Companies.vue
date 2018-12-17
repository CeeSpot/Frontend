<template>
    <b-container style="margin-top: 150px;">
    <b-row>
            <admin-menu v-bind:active="active"></admin-menu>
            <b-col md="8">
                <b-row v-for="company in companies" class="user-list-item">
                    <b-col md="12" class="shadow user-card" v-on:click="openDetailPage(company.id)">
                        <b-row>
                            <b-col md="4">{{ company.name }}</b-col>
                        </b-row>
                    </b-col>
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

  export default {
    name: "companies",
    components: {
      AdminMenu,
      ActionButton
    },
    data() {
      return {
        active: "Companies",
        companies: []
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
        CommunityApi.getCompanies().then(response => this.companies = response.data)
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