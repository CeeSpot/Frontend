<template>
    <b-container style="margin-top: 150px;">
    <b-row>
      <b-col>
        <div style="width: 100%; font-size: 1.125em;" class="card shadow no-scale">
               <b-form-input v-model="blog.title" type="text" placeholder="Title"></b-form-input> 
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div style="width: 100%; font-size: 1.125em;" class="card shadow no-scale">
                   <b-form-textarea id="textarea1"
                     v-model="blog.description"
                     placeholder="Description"
                     :rows="3"
                     :max-rows="6"></b-form-textarea>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div style="width: 100%; font-size: 1.125em;" class="card shadow no-scale">
                <vue-editor v-model="blog.body"></vue-editor>
        </div>
      </b-col>
    </b-row>
     <action-button color="red" :fixed="true" icon="check" @click.native="editBlog()"></action-button>
    </b-container>
</template>

<script>
  import ActionButton from '@/components/Core/Other/ActionButton'
  import AdminBlogApi from '@/services/api/admin/blogs.js'
  import blogApi from '@/services/api/blogs.js'
  import { VueEditor } from "vue2-editor";

  export default {
    name: "editblog",
    components: {
      ActionButton,
      VueEditor
    },
    data() {
      return {
        blog: []
      }
    },
    created() {
      this.id = this.$route.params.id;
    },
    methods: {
      editBlog(){
          AdminBlogApi.updateBlog(this.blog).then(response => { location.href = '/admin/blogs/'; });
      }
    },
    mounted() {
         blogApi.getBlog(this.id).then(response => { this.blog = response.data.data[0] });
    }
  }
</script>

<style scoped>

</style>