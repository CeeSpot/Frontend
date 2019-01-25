<template>

  <!-- Add tag modal Component -->
  <b-modal ref="NewTagModal" id="NewTagModal" title="New tag">
    <b-row class="my-1">
      <b-col sm="12">
        <b-form-input v-model="newTagName" id="input-default" type="text" placeholder="Tag name"></b-form-input>
      </b-col>
    </b-row>

    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="primary" v-on:click="newTag()">Save</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import adminTagsApi from '@/services/api/admin/tags.js'

export default {
  name: 'AddTagModal',
  data () {
    return {
      newTagName: null
    }
  },
  methods: {
    newTag () {
      let data = {
        tag: {
          description: this.newTagName
        }
      }
      adminTagsApi.addTag(data, this.selectedTab).then((response) => {
        if (response.data.success) {
         this.$toasted.show('Successfully added tag!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
          data.tag.id = response.data.data.insertId
          Emitter.$emit('addTag', [this.selectedTab, data.tag])
          this.$refs.NewTagModal.hide()
        } else {
          this.$toasted.show(response.data.data.toString(),
            {
              position: 'top-center',
              duration: 3000
            }
          )
        }
      }).catch((err) => {
        this.$toasted.show(err.toString(),
          {
            position: 'top-center',
            duration: 3000
          }
        )
      })
    }
  },
  props: ['selectedTab']
}
</script>

<style scoped>

</style>
