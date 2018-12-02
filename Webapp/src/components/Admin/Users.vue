<template>
    <b-container style="margin-top: 150px;">
        <b-row>
            <admin-menu v-bind:active="active"></admin-menu>
            <b-col md="8">
                <b-row v-for="user in userList" class="user-list-item">
                    <b-col md="12" class="bg-white shadow user-card">
                        <b-row>
                            <b-col md="4">{{ user.first_name + ' ' + user.last_name}}</b-col>
                            <b-col md="4">{{ user.email }}</b-col>
                            <b-col md="4" class="text-right">
                                <font-awesome-icon style="cursor: pointer;" icon="chevron-down" class="chevron-down" v-on:click="openUserCard(user.id)" />
                            </b-col>
                        </b-row>
                        <transition name="fade">
                            <b-row v-show="openUser === user.id">
                                <b-col>
                                    <b-row>
                                        <hr style="border-bottom: 1px solid #e5e5e5; width: 100%;">
                                    </b-row>
                                    <b-row>
                                        <b-col md="8" id="inputFields">
                                            <b-row>
                                                <b-col md="4">
                                                    <span>First name</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.first_name">
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col md="4">
                                                    <span>Last name</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.last_name">
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col md="4">
                                                    <span>Address</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.address">
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col md="4">
                                                    <span>Zip code</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.zipcode">
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col md="4">
                                                    <span>City</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.city">
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col md="4">
                                                    <span>E-mail</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.email">
                                                </b-col>
                                            </b-row>
                                            <b-row class="mt-1">
                                                <b-col md="4">
                                                    <span>Phone</span>
                                                </b-col>
                                                <b-col md="8">
                                                    <input type="text" class="form-control" v-bind:value="user.phone">
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col md="4" class="text-right">
                                            <b-badge variant="success">Geactiveerd</b-badge>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </transition>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import AdminMenu from '@/components/Admin/AdminMenu';
  import CommunityApi from '@/services/api/community.js'

  export default {
    name: "users",
    components: {
      AdminMenu
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
        if(this.openUser === id) {
          this.openUser = 0;
        } else {
          this.openUser = id;
        }
      }
    },
    mounted() {
      CommunityApi.getUsers().then(response => this.userList = response.data);
      CommunityApi.getUsers().then(function(response) {
        console.log(response.data);
      });
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