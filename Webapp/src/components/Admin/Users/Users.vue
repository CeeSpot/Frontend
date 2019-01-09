<template>
    <b-container style="margin-top: 150px;">
        <b-row>
            <admin-menu v-bind:active="active"></admin-menu>
            <b-col md="8">
                <b-row v-for="user in userList" class="user-list-item">
                    <AdminCard 
                    :firstcol="user.first_name + ' ' + user.last_name"
                    :secondcol="user.email" 
                    :target="'/admin/users/' + user.id"></AdminCard>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import AdminMenu from '@/components/Admin/AdminMenu'
  import CommunityApi from '@/services/api/community.js'
  import AdminCard from '@/components/Core/Other/AdminCard'

  export default {
    name: "users",
    components: {
      AdminMenu,
      AdminCard,
      CommunityApi
    },
    data() {
      return {
        active: "Users",
        openUser: null,
        userList: []
      }
    },
    methods: {
      openUserCard(id) {
        // do absolutely nothing
      }
    },
    mounted() {
      CommunityApi.getUsers().then(response => this.userList = response.data.data);
    }
  }
</script>

<style scoped>
    .user-list-item {
        margin-top: 15px;
    }

    .user-list-item:first-of-type {
        margin-top: 0;
    }

    .user-card {
        border-radius: 4px;
        padding: 20px;
    }
</style>
