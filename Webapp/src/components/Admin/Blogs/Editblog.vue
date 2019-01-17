<template>
    <b-container style="margin-top: 150px;">
    <b-row>
      <b-col>
        <label for="inputTitle">Title:</label>
        <div style="width: 100%; font-size: 1.125em;" class="card shadow no-scale">
               <b-form-input id="inputTitle" v-model="blog.title" type="text" placeholder="Title"></b-form-input> 
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <label for="inputDescription">Description:</label>
        <div style="width: 100%; font-size: 1.125em;" class="card shadow no-scale">
                   <b-form-textarea id="inputDescription"
                     v-model="blog.description"
                     placeholder="Description"
                     :rows="3"
                     :max-rows="6"></b-form-textarea>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <label for="inputTags">Tags:</label>
          <multiselect v-model="values" :options="tags" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="description" track-by="description" :preselect-first="false">
            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
          </multiselect>
        <label class="mt-3" for="blogText">Text:</label>
        <vue-editor class="card shadow no-scale" id="blogText" v-model="blog.body"></vue-editor>
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
  import Multiselect from 'vue-multiselect'

  export default {
    name: "editblog",
    components: {
      ActionButton,
      VueEditor,
      Multiselect
    },
    data() {
      return {
        blog: [],
        tags: [],
        values: null
      }
    },
    created() {
      this.id = this.$route.params.id;
    },
    methods: {
      editBlog(){
          this.blog.tags = this.values;
          AdminBlogApi.updateBlog(this.blog).then(response => { location.href = '/admin/blogs/'; });
      }
    },
    mounted() {
         blogApi.getBlogsTags().then(response => this.tags = response.data.data);
         blogApi.getBlog(this.id).then(response => { 
           this.blog = response.data.data[0] 
           this.values = this.blog.tags;
           });
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>