<template>
    <b-container style="margin-top: 150px;">
        <b-row>
            <b-col>
                <label for="inputTitle">Title:</label>
                <div style="width: 100%; font-size: 1.125em;" class="card shadow no-scale">
                    <b-form-input id="inputTitle" v-model="title" type="text" placeholder="Title"></b-form-input>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <label for="inputDescription">Description:</label>
                <div style="width: 100%; font-size: 1.125em;" class="card shadow no-scale">
                    <b-form-textarea id="inputDescription"
                                     v-model="description"
                                     placeholder="Description"
                                     :rows="3"
                                     :max-rows="6"></b-form-textarea>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <label for="file">Upload file: </label>
                <!--<input type="file" name="file" id="file" @change="onFileChanged">-->

                <b-form-file @change="onFileChanged" v-model="file" :state="Boolean(file)"
                             placeholder="Choose a file..."></b-form-file>
                <div class="mt-3">Selected file: {{file && file.name}}</div>

            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <label for="inputTags">Tags:</label>
                <multiselect v-model="values" :options="tags" :multiple="true" :close-on-select="false"
                             :clear-on-select="false" :preserve-search="true" placeholder="Pick some"
                             label="description" track-by="description" :preselect-first="false">
                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single"
                                                                                             v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                    </template>
                </multiselect>
                <label class="mt-3" for="blogText">Text:</label>
                <vue-editor class="card shadow no-scale" id="blogText" v-model="content"></vue-editor>
            </b-col>
        </b-row>
        <action-button color="red" :fixed="true" icon="plus" @click.native="addBlog()"></action-button>
    </b-container>
</template>

<script>
  import ActionButton from '@/components/Core/Other/ActionButton'
  import AdminBlogApi from '@/services/api/admin/blogs.js'
  import uploadFile from '@/services/api/uploadFile.js'
  import {VueEditor} from "vue2-editor";
  import Multiselect from 'vue-multiselect';
  import blogApi from '@/services/api/blogs.js';

  export default {
    name: "addblog",
    components: {
      ActionButton,
      VueEditor,
      Multiselect
    },
    data() {
      return {
        blogs: [],
        content: '',
        title: '',
        description: '',
        tags: [],
        options: [
          {name: 'Vue.js', language: 'JavaScript'},
          {name: 'Adonis', language: 'JavaScript'},
          {name: 'Rails', language: 'Ruby'},
          {name: 'Sinatra', language: 'Ruby'},
          {name: 'Laravel', language: 'PHP'},
          {name: 'Phoenix', language: 'Elixir'}
        ],
        values: null,
        file: null
      }
    },
    methods: {
      onFileChanged(event) {
        this.file = event.target.files[0];
      },
      addBlog() {
        var blog = {title: this.title, description: this.description, body: this.content, tags: this.options};
        if (this.title && this.description && this.content) {
          AdminBlogApi.addBlog(blog).then(response => {
            console.log(response.data.data.insertId);
            uploadFile.uploadFile(response.data.data.insertId, 'blogs_header', this.file);
            // location.href = '/admin/blogs/';
          });
        }
      }
    },
    mounted() {
      blogApi.getBlogsTags().then(response => this.tags = response.data.data);
    }
  }

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>