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
                  target="" v-b-modal.editTag @click.native="selectedTagName = tag.description; selectedId = tag.id"></AdminCard>
              </b-row>
            </b-tab>
            <b-tab title="Users">
              <b-row v-for="tag in usertags" class="user-list-item">
                <AdminCard
                  :firstcol="tag.description"
                  secondcol=""
                  target="" v-b-modal.editTag @click.native="selectedTagName = tag.description; selectedId = tag.id"></AdminCard>
              </b-row>
            </b-tab>
            <b-tab title="Companies">
              <b-row v-for="tag in companytags" class="user-list-item">
                <AdminCard
                  :firstcol="tag.description"
                  secondcol=""
                  target="" v-b-modal.editTag @click.native="selectedTagName = tag.description; selectedId = tag.id"></AdminCard>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
    <action-button color="red" :fixed="true" icon="plus" v-b-modal.newTag></action-button>
    <!-- Add tag modal Component -->
    <b-modal ref="newTagModal" hide-footer id="newTag" title="New tag">
        <b-row class="my-1">
            <b-col sm="12">
            <b-form-input v-model="newTagName" id="input-default" type="text" placeholder="Tag name"></b-form-input>
            </b-col>
        </b-row>
      <b-button class="float-right" v-on:click="newTag()">Save</b-button>
    </b-modal>

    <!-- Edit tag modal Component -->
    <b-modal ref="editTagModal" hide-footer id="editTag" title="Edit tag">
        <b-row class="my-1">
            <b-col sm="12">
            <b-form-input v-model="selectedTagName" id="input-default" type="text" placeholder="Tag name"></b-form-input>
            </b-col>
        </b-row>
      <b-row>
        <b-col>
           <b-button class="float-left" variant="danger" v-on:click="deleteTag()">Delete tag</b-button>
        </b-col>
        <b-col>
           <b-button class="float-right" v-on:click="editTag()">Save</b-button>
        </b-col>
      </b-row>
    </b-modal>


  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import ActionButton from '@/components/Core/Other/ActionButton'
import blogApi from '@/services/api/blogs.js'
import adminBlogApi from '@/services/api/admin/blogs.js'
import AdminCard from '@/components/Core/Other/AdminCard'
import adminTagsApi from '@/services/api/admin/tags.js'
import TagApi from '@/services/api/tags.js'

export default {
  name: "tags",
  components: {
    AdminMenu,
    ActionButton,
    AdminCard
  },
  data() {
    return {
      active: "Tags",
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
      newTag() {
          let data = {
              tag: { 
                  description: this.newTagName
              }
          }
          adminTagsApi.addTag(data, this.selectedTab).then((response) => {
              data.tag.id = response.data.data.insertId;
              switch(this.selectedTab){
                case 0:
                    this.blogtags.push(data.tag);
                    this.newTagName = '';
                  break;
                case 1:
                    this.usertags.push(data.tag);
                    this.newTagName = '';
                  break;
                case 2:
                    this.companytags.push(data.tag);
                    this.newTagName = '';
                  break;
              }
              this.$refs.newTagModal.hide();
          })
      },
      editTag(){
          let data = {
              tag: {
                  id: this.selectedId,  
                  description: this.selectedTagName 
              }
          }
          adminTagsApi.editTag(data, this.selectedTab).then((response) => {
              let tag;
              switch(this.selectedTab){
                case 0:
                    tag = this.blogtags.find(tag => tag.id == this.selectedId);
                    tag.description = this.selectedTagName;  
                  break;
                case 1:
                    tag = this.usertags.find(tag => tag.id == this.selectedId);
                    tag.description = this.selectedTagName;  
                  break;
                case 2:
                    tag = this.companytags.find(tag => tag.id == this.selectedId);
                    tag.description = this.selectedTagName;  
                  break;
              }
              this.$refs.editTagModal.hide();
          })
      },
      deleteTag() {
          let data = {
              tag: {
                  id: this.selectedId
              }
          }
          adminTagsApi.deleteTag(data, this.selectedTab).then((response) => {
              let tag;
              switch(this.selectedTab){
                case 0:
                    tag = this.blogtags.find(tag => tag.id == this.selectedId);
                    this.deleteFromArray(this.blogtags, tag);
                  break;
                case 1:
                    tag = this.usertags.find(tag => tag.id == this.selectedId);
                    this.deleteFromArray(this.usertags, tag);
                  break;
                case 2:
                    tag = this.companytags.find(tag => tag.id == this.selectedId);
                    this.deleteFromArray(this.companytags, tag);
                  break;
              }
              this.$refs.editTagModal.hide();
          })
      },
      deleteFromArray(array, tag){
          array.splice(array.indexOf(tag),1);
      }
  },
  mounted() {
    Emitter.$on('authorised', () => {
      this.authorised = true
      blogApi.getBlogsTags().then((response) => this.blogtags = response.data.data)
      TagApi.getUserTags().then(response => this.usertags = response.data)
      TagApi.getCompanyTags().then(response => this.companytags = response.data.data)
    })
  }
}
</script>
<style scoped>
</style>
