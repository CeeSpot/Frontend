<template>
  <b-container style="margin-top: 150px;">
    <b-row>
      <admin-menu v-bind:active="active"></admin-menu>
        <b-col md="8" v-if="authorised">
        <b-row v-for="tag in blogtags" class="user-list-item">
          <AdminCard
            :firstcol="tag.description"
            secondcol=""
            target="/admin/events/"></AdminCard>
        </b-row>
      </b-col>
    </b-row>
    <action-button color="red" :fixed="true" icon="plus" v-b-modal.newblogtag></action-button>
        <!-- Modal Component -->
    <b-modal ref="newBlogTagModal" hide-footer id="newblogtag" title="Nieuwe blog tag">
        <b-row class="my-1">
            <b-col sm="12">
            <b-form-input v-model="newBlogTitle" id="input-default" type="text" placeholder="Tag name"></b-form-input>
            </b-col>
        </b-row>
      <b-button class="float-right" v-on:click="newBlogTag()">Opslaan</b-button>
    </b-modal>
  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import ActionButton from '@/components/Core/Other/ActionButton'
import blogApi from '@/services/api/blogs.js'
import adminBlogApi from '@/services/api/admin/blogs.js'
import AdminCard from '@/components/Core/Other/AdminCard'

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
      authorised: true,
      newBlogTitle: ''
    }
  },
  methods: {
      newBlogTag() {
          let data = {
              blog_tag: { 
                  descrption: this.newBlogTitle 
                  }
          }
          adminBlogApi.addBlogTag(data).then((response) =>{
              alert('test');
          })
      }
  },
  mounted() {
    Emitter.$on('authorised', () => {
      this.authorised = true
      blogApi.getBlogsTags().then((response) => this.blogtags = response.data.data)
    })
  }
}
</script>
<style scoped>
</style>
