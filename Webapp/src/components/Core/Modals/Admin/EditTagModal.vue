<template>

  <!-- Edit tag modal Component -->
  <b-modal ref="EditTagModal" id="EditTagModal" title="Edit tag">
    <b-row class="my-1">
      <b-col sm="12">
        <b-form-input v-model="selectedTagName" id="input-default" type="text" placeholder="Tag name"></b-form-input>
      </b-col>
    </b-row>
    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="danger" v-on:click="deleteTag()">Delete tag</b-btn>
          <b-btn variant="primary" v-on:click="editTag()">Save</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import adminTagsApi from '@/services/api/admin/tags.js'
export default {
  name: 'EditTagModal',
  methods: {

    editTag () {
      let data = {
        tag: {
          id: this.selectedId,
          description: this.selectedTagName
        }
      }
      adminTagsApi.editTag(data, this.selectedTab).then((response) => {
        Emitter.$emit('editTag', [this.selectedTab, this.selectedId, this.selectedTagName])
        this.$refs.EditTagModal.hide()
      })
    },
    deleteTag () {
      let data = {
        tag: {
          id: this.selectedId
        }
      }
      adminTagsApi.deleteTag(data, this.selectedTab).then((response) => {
        // let tag
        if(response.data.success){
         this.$toasted.show('Successfully deleted tag!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        }
        Emitter.$emit('deleteTag', [this.selectedId, this.selectedTab])
        // switch (this.selectedTab) {
        //   case 0:
        //     tag = this.blogtags.find(tag => tag.id === this.selectedId)
        //     this.deleteFromArray(this.blogtags, tag)
        //     Emitter.$emit('deleteFromBlogTags', tag)
        //     break
        //   case 1:
        //     tag = this.usertags.find(tag => tag.id === this.selectedId)
        //     this.deleteFromArray(this.usertags, tag)
        //     Emitter.$emit('deleteFromUserTags', tag)
        //     break
        //   case 2:
        //     tag = this.companytags.find(tag => tag.id === this.selectedId)
        //     this.deleteFromArray(this.companytags, tag)
        //     Emitter.$emit('deleteFromCompanyTags', tag)
        //     break
        // }
        this.$refs.EditTagModal.hide()
      }).catch((err) => {
        this.$toasted.show('Something went wrong, please try again',
              {
                position: 'top-center',
                duration: 3000
              }
          )
      });
    },
  },
  props: ['selectedTab', 'selectedTagName', 'selectedId']
}
</script>

<style scoped>

</style>
