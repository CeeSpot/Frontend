<template>
    <b-container style="margin-top: 150px;">
    <b-row>
      <b-col>
        <div style="width: 100%; font-size: 1.125em;" class="card shadow no-scale">
               <b-form-input v-model="title" type="text" placeholder="Title"></b-form-input> 
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div style="width: 100%; font-size: 1.125em;" class="card shadow no-scale">
                   <b-form-textarea id="textarea1"
                     v-model="description"
                     placeholder="Description"
                     :rows="3"
                     :max-rows="6"></b-form-textarea>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div style="width: 100%; font-size: 1.125em;" class="card shadow no-scale">
                <vue-editor v-model="content"></vue-editor>
        </div>
      </b-col>
    </b-row>
     <action-button color="red" icon="+" @click.native="addBlog()"></action-button>
    </b-container>
</template>

<script>
  import ActionButton from '@/components/Core/Other/ActionButton'
  import AdminBlogApi from '@/services/api/admin/blogs.js'
  import { VueEditor } from "vue2-editor";

  export default {
    name: "addblog",
    components: {
      ActionButton,
      VueEditor
    },
    data() {
      return {
        blogs: [],
        content: '',
        title: '',
        description: ''
      }
    },
    methods: {
      addBlog(){
          var blog = {title: this.title, description: this.description, body: this.content};
          if(this.title && this.description && this.content){
          AdminBlogApi.addBlog(blog).then(response => { 
              location.href = '/admin/blogs/';
           });
          } else {
            
          }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>