<template>
    <b-container style="margin-top: 150px;">
        <b-row>
            <admin-menu v-bind:active="active"></admin-menu>
            <b-col md="8" v-if="authorised">
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
      userList: [],
      authorised: false
    }
  },
  methods: {
    openUserCard(id) {
      // do absolutely nothing
    }
  },
  mounted () {
    Emitter.$on('authorised', () => {
      this.authorised = true
      CommunityApi.getUsers().then((response) => {
      if(!response.data.success){
          this.$toasted.show('Failed load users try again later!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        }
        this.userList = response.data.data
      }).catch((err) => {
        this.$toasted.show('Something went wrong, please try again',
              {
                position: 'top-center',
                duration: 3000
              }
          )
      });
    })
  }
}
</script>

<style scoped>
</style>
