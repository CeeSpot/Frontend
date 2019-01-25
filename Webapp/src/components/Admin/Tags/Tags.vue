<template>
  <b-container style="margin-top: 150px;">
    <b-row>
      <admin-menu v-bind:active="active"></admin-menu>
      <b-col md="8" v-if="authorised">
        <b-card no-body class="no-scale">
          <b-tabs card v-model="selectedTab">
            <b-tab title="Blogs" active>
              <b-row v-for="tag in blogtags" class="user-list-item">
                <AdminCard
                  :firstcol="tag.description"
                  secondcol=""
                  target="" v-b-modal.EditTagModal
                  @click.native="selectedTagName = tag.description; selectedId = tag.id"></AdminCard>
              </b-row>
            </b-tab>
            <b-tab title="Users">
              <b-row v-for="tag in usertags" class="user-list-item">
                <AdminCard
                  :firstcol="tag.description"
                  secondcol=""
                  target="" v-b-modal.EditTagModal
                  @click.native="selectedTagName = tag.description; selectedId = tag.id"></AdminCard>
              </b-row>
            </b-tab>
            <b-tab title="Companies">
              <b-row v-for="tag in companytags" class="user-list-item">
                <AdminCard
                  :firstcol="tag.description"
                  secondcol=""
                  target="" v-b-modal.EditTagModal
                  @click.native="selectedTagName = tag.description; selectedId = tag.id"></AdminCard>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
    <action-button color="red" :fixed="true" icon="plus" v-b-modal.NewTagModal></action-button>

    <edit-tag-modal :selectedTab="selectedTab" :selectedTagName="selectedTagName" :selectedId="selectedId"></edit-tag-modal>
    <add-tag-modal :selectedTab="selectedTab"></add-tag-modal>
  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import EditTagModal from '@/components/Core/Modals/Admin/EditTagModal'
import AddTagModal from '@/components/Core/Modals/Admin/AddTagModal'
import ActionButton from '@/components/Core/Other/ActionButton'
import blogApi from '@/services/api/blogs.js'
import AdminCard from '@/components/Core/Other/AdminCard'
import TagApi from '@/services/api/tags.js'

export default {
  name: 'tags',
  components: {
    AdminMenu,
    ActionButton,
    AdminCard,
    EditTagModal,
    AddTagModal
  },
  data () {
    return {
      active: 'Tags',
      blogtags: [],
      usertags: [],
      companytags: [],
      authorised: true,
      newTagName: '',
      selectedTab: 0,
      selectedTagName: '',
      selectedId: 0
    }
  },
  methods: {
    addTag (selectedTab, tag) {
      switch (selectedTab) {
        case 0:
          this.blogtags.push(tag)
          this.newTagName = ''
          break
        case 1:
          this.usertags.push(tag)
          this.newTagName = ''
          break
        case 2:
          this.companytags.push(tag)
          this.newTagName = ''
          break
      }
    },
    editTag (selectedTab, selectedId, selectedTagName) {
      let tag
      switch (selectedTab) {
        case 0:
          tag = this.blogtags.find(tag => tag.id === selectedId)
          tag.description = selectedTagName
          break
        case 1:
          tag = this.usertags.find(tag => tag.id === selectedId)
          tag.description = selectedTagName
          break
        case 2:
          tag = this.companytags.find(tag => tag.id === selectedId)
          tag.description = selectedTagName
          break
      }
    },
    deleteTag (selectedId, selectedTab) {
      let tag
      switch (selectedTab) {
        case 0:
          tag = this.blogtags.find(tag => tag.id === selectedId)
          this.deleteFromArray(this.blogtags, tag)
          break
        case 1:
          tag = this.usertags.find(tag => tag.id === selectedId)
          this.deleteFromArray(this.usertags, tag)
          break
        case 2:
          tag = this.companytags.find(tag => tag.id === selectedId)
          this.deleteFromArray(this.companytags, tag)
          break
      }
    },
    deleteFromArray (array, tag) {
      array.splice(array.indexOf(tag), 1)
    }
  },
  mounted () {
    Emitter.$on('authorised', () => {
      this.authorised = true
      blogApi.getBlogsTags().then((response) => {
        if(!response.data.success){
          this.$toasted.show('Failed load blog tags try again later!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        }
        this.blogtags = response.data.data
        })
      TagApi.getUserTags().then(response => {
        if(!response.data.success){
          this.$toasted.show('Failed load user tags try again later!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        }
        this.usertags = response.data.data
        })
      TagApi.getCompanyTags().then(response => {
        if(!response.data.success){
          this.$toasted.show('Failed load company tags try again later!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        }
        this.companytags = response.data.data
        })
    })

    Emitter.$on('editTag', (data) => {
      this.editTag(data[0], data[1], data[2])
    })
    Emitter.$on('deleteTag', (data) => {
      this.deleteTag(data[0], data[1])
    })
    Emitter.$on('addTag', (data) => {
      this.addTag(data[0], data[1])
    })
  }
}
</script>
<style scoped>
</style>
