<template>

  <!-- Modal Component -->
  <b-modal id="DeleteAccountModal" ref="DeleteAccountModal" size="lg">
    <!--:title="selectedEvent.title" -->
    <div slot="modal-header" style="width: 100%;">
      <b-row>
        <b-col xs="6">
          <h3 class="text-white">Danger zone!</h3>
        </b-col>
        <b-col class="text-right" xs="6">
          <button v-on:click="closeModal"
                  style="border-radius: 20px; width: 40px; height: 40px; border: none; background-color: white; cursor: pointer;">
            <font-awesome-icon icon="times"/>
          </button>
        </b-col>
      </b-row>
    </div>

    <b-form @submit="deleteUser">
      <b-row>
        <b-col style="margin-bottom: 30px;">
          Warning, you are about to delete your account. Click cancel to stop and click delete to delete your account
        </b-col>
      </b-row>
    </b-form>
    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="secondary" v-on:click="closeModal">Cancel</b-btn>
          <b-btn variant="danger" v-on:click="deleteUser">Delete account</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import auth from '@/services/api/Authentication.js'

export default {
  name: 'DeleteAccountModal',
  methods: {
    deleteUser () {
      let data = {user_id: this.id}
      auth.deleteUser(data).then((resp) => {
        if (resp.data.success) {
          this.$store.dispatch('logout')
         this.$toasted.show('Successfully deleted user!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        } else {
          this.$toasted.show('Failed to delete this account.',
            {
              position: 'top-center',
              duration: 3000
            }
          )
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    closeModal () {
      this.$refs.DeleteAccountModal.hide()
    }
  },
  props: ['id']
}
</script>

<style scoped>

</style>
