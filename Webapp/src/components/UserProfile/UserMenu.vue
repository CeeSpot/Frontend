<template>
    <b-col md="4">
        <div style="width: 100%; height: 100%;">
            <b-list-group class="shadow">
                <b-list-group-item v-for="item in items" v-bind:class="active === item ? 'active' : '' ">
                    <a href="#" class="menu-item-link">{{ item }}</a>
                </b-list-group-item>
              <b-list-group-item>
                <a v-on:click="logout()" class="menu-item-link">Uitloggen</a>
              </b-list-group-item>
            </b-list-group>
        </div>
    </b-col>
</template>

<script>
  export default {
    name: "user-menu",
    props: ['active'],
    data() {
      return {
        items: [
          "Profile", "Companies", "Settings", "Events", "Activity"
        ]
      }
    },
    methods : {
      logout(){
        this.$store.dispatch('logout');
      }
    }
  }
</script>

<style scoped>
    .active {
        color: white;
        border: 1px solid #E60000;
        background-color: #E60000;
        font-weight: bold;
    }

    .menu-item-link {
        color: black;
    }

    .active > a {
        color: white !important;
    }

</style>
