<template>
  <b-container v-if="authorised" style="margin-top: 150px;">
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
            <b-form-select v-model="user.user_role_id">
              <option v-for="option in roles"
                      v-bind:value="option.value" :selected="option.value === user.user_role_id ? 'selected' : ''">
                 {{option.text}}
              </option>
            </b-form-select>
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
import AdminUserApi from '@/services/api/admin/users.js'
import moment from 'moment'
import ActionButton from '@/components/Core/Other/ActionButton'
import AuthorisationApi from '@/services/api/Authorisation.js'

export default {
  name: "user",
  components: {
    AdminMenu,
    ActionButton
  },
  data() {
    return {
      user: {},
      authorised: false,
      roles: []
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY');
    },
    deleteUser() {
      let data = {data: {user_id: this.user.id}}
      AdminUserApi.deleteUser(data).then(response => {
        this.$router.push({path: '/admin/users'})
      });
    },
    updateUser() {
      let userRoleId = this.user.user_role_id
      delete this.user.user_role_id
      let data = {user: this.user}
      AdminUserApi.updateUser(data).then(response => {
        if (response.data.success) {
          AdminUserApi.updateUserRole({data: {id: this.user.id, role: userRoleId}}).then((resp) => {
            if (resp.data.success) {
              this.$toasted.show('Successfully changed the user\'s information',
                {
                  position: 'top-center',
                  duration: 3000
                }
              )
            } else {
              this.$toasted.show('Failed to change the user\'s information',
                {
                  position: 'top-center',
                  duration: 3000
                }
              )
            }
          })
        } else {
          this.$toasted.show('Failed to change the user\'s information',
            {
              position: 'top-center',
              duration: 3000
            }
          )
        }
      })
    },
    back() {
      this.$router.push({path: '/admin/users'});
    }
  },
  mounted() {
    AuthorisationApi.isAdmin().then((resp) => {
      if (resp.data.authorised) {
        this.authorised = true
        AdminUserApi.getRoles().then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            this.roles.push({
              value: response.data.data[i].id,
              text: response.data.data[i].name
            })
          }
        })
        CommunityApi.getUser(this.$route.params.id).then((response) => {
          this.user = response.data.user
        });
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
