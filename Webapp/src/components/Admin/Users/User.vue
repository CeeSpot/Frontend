<template>
  <b-container style="margin-top: 150px;">
    <b-row>
      <b-col cols="6">
        <b-card class="no-scale" title="Personal info">
          <b-form-input class="mb15" type="text" v-model="user.first_name" placeholder="First name"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="user.insertion" placeholder="Insertion"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="user.last_name" placeholder="Last name"></b-form-input>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card class="no-scale" title="Account info">
          <b-form-input class="mb15" type="text" v-model="user.email" placeholder="Email"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="user.username" placeholder="Username"></b-form-input>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card class="no-scale" title="Address info">
          <b-form-input class="mb15" type="text" v-model="user.address" placeholder="Address"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="user.zipcode" placeholder="Postcode"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="user.city" placeholder="City"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="user.country" placeholder="Street"></b-form-input>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card class="no-scale" title="Contact info">
          <b-form-input class="mb15" type="text" v-model="user.phone" placeholder="Phone"></b-form-input>
          <b-form-input class="mb15" type="text" v-model="user.birthdate" placeholder="Birthdate"></b-form-input>
        </b-card>
      </b-col>
    </b-row>
    <div class="fab-buttons">
      <b-row class="mt-3">
        <b-col>
          <action-button
            color="red"
            icon="trash"
            :fixed="false"
            v-on:click.native="deleteUser"></action-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <action-button
            color="red"
            icon="save"
            :fixed="false"
            v-on:click.native="updateUser"></action-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <action-button color="red" :fixed="false" icon="chevron-left" v-on:click.native="back()"></action-button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
  import AdminMenu from '@/components/Admin/AdminMenu'
  import CommunityApi from '@/services/api/community.js'
  import Authentication from '@/services/api/Authentication.js'
  import AdminUserApi from '@/services/api/admin/users.js'
  import moment from 'moment'
  import ActionButton from '@/components/Core/Other/ActionButton'

  export default {
    name: 'user',
    components: {
      AdminMenu,
      ActionButton
    },
    deleteUser () {
      let data = {user_id: this.user.id}
      Authentication.deleteUser(data).then((resp) => {
        if (resp.data.success) {
          this.$router.push({path: '/admin/users'})
        } else {
          this.$toasted.show('Failed to delete this account.',
            {
              position: 'top-center',
              duration: 3000
            }
          )
        }
      })
    },
    updateUser () {
      let data = {user: this.user}
      AdminUserApi.updateUser(data).then(() => {
        alert('user successfully updated')
      })
    },
    mounted () {
      CommunityApi.getUser(this.$route.params.id).then(response => this.user = response.data.user)
    }
  }
</script>

<style scoped>
</style>
