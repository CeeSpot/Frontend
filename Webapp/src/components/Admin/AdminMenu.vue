<template>
    <b-col md="4" v-if="authorised">
        <div style="width: 100%; height: 100%;">
            <b-list-group class="shadow">
                <b-list-group-item v-for="item in items" v-bind:class="active === item ? 'active' : '' ">
                    <a :href="'/admin/' + item" class="menu-item-link">{{ item }}</a>
                </b-list-group-item>
            </b-list-group>
        </div>
    </b-col>
</template>

<script>
import AuthorisationApi from '@/services/api/Authorisation.js'
export default {
  name: "admin-menu",
  props: ['active'],
  data() {
    return {
      items: [
        "Users", "Events", "Companies", "Blogs", "Tags", "Website", "Spaces", "Requests", "Settings"
      ],
      authorised: false
    }
  },
  created () {
    AuthorisationApi.isAdmin().then((resp) => {
      if (!resp.data.authorised) {
        location.href = '/'
      } else {
        this.authorised = true
        Emitter.$emit('authorised')
      }
    }).catch((err) => {
      location.href = '/'
    })
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
