<template>
  <b-container style="margin-top: 150px;">
    <b-row>
      <admin-menu v-bind:active="active"></admin-menu>
      <b-col md="8" v-if="authorised">
        <b-card class="no-scale">
          <div>
            <h2 class="text-center">Blogs</h2>
            <hr>
            <div class="text-center">
              <label class="font-weight-bold" for="inputDescription">Active:</label>
              <b-button-group size="sm">
                <b-button :pressed="blogActive" v-on:click="toggle()" variant="outline-primary">Yes</b-button>
                <b-button :pressed="!blogActive" v-on:click="toggle()" variant="outline-primary">No</b-button>
              </b-button-group>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import ActionButton from '@/components/Core/Other/ActionButton'
import settingsApi from '@/services/api/admin/settings.js'

export default {
  name: "event",
  components: {
    AdminMenu,
    ActionButton
  },
  data() {
    return {
      active: "Settings",
      settings: [],
      blogActive: false,
      authorised: false
    }
  },
  methods: {
    toggle() {
      this.blogActive = !this.blogActive;
      let data = {
        is_on: this.blogActive
      };
      settingsApi.toggleBlog(data).then(response => {
      });
    }
  },
  mounted() {
    Emitter.$on('authorised', () => {
      this.authorised = true
      settingsApi.getSettings().then(response => {
        if (response.data.success && response.data.authorised) {
          this.settings = response.data.data
          this.blogActive = this.settings[0].is_on === 1
        } else {
          if (!response.data.authorised) {
            this.$router.push({path: '/'})
          }
        }
      }).catch((err) => {
        if (!err.data.authorised) {
          this.$router.push({path: '/'})
        }
      })
    })
  }
}
</script>
<style scoped>
</style>
