<template>
  <b-container v-if="authorised" style="margin-top: 150px;">
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
    <div class="fab-buttons">
      <b-row class="mt-3">
        <b-col>
          <action-button color="red" :fixed="false" icon="save" @click.native="addBlog()"></action-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <action-button color="red" :fixed="false" icon="chevron-left" @click.native="back()"></action-button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import ActionButton from '@/components/Core/Other/ActionButton'
import AdminBlogApi from '@/services/api/admin/blogs.js'
import uploadFile from '@/services/api/uploadFile.js'
import {VueEditor} from 'vue2-editor'
import Multiselect from 'vue-multiselect'
import blogApi from '@/services/api/blogs.js'
import AuthorisationApi from '@/services/api/Authorisation.js'
//
// <<<<<<< HEAD
//   export default {
//     name: "addblog",
//     components: {
//       ActionButton,
//       VueEditor,
//       Multiselect
//     },
//     addBlog() {
//       let blog = {title: this.title, description: this.description, body: this.content, tags: this.values}
//       if (this.title && this.description && this.content) {
//         AdminBlogApi.addBlog(blog).then(response => {
//           if (response.data.success && response.data.authorised) {
//             uploadFile.uploadFile(response.data.data.insertId, 'blogs_header', this.file)
//             // location.href = '/admin/blogs/'
//           } else {
//             if (!response.data.authorised) {
//               this.$router.push({path: '/'})
//             }
//           }
//         }).catch((err) => {
//           if (!err.data.authorised) {
//             this.$router.push({path: '/'})
//           }
//         })
//       }
export default {
  name: 'addblog',
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
      values: null,
      file: null,
      authorised: false
    }
  },
  methods: {
    onFileChanged(event) {
      this.file = event.target.files[0]
    },
    addBlog() {
      let blog = {title: this.title, description: this.description, body: this.content, tags: this.values}
      if (this.title && this.description && this.content) {
        AdminBlogApi.addBlog(blog).then(response => {
          if (response.data.success && response.data.authorised) {
            uploadFile.uploadFile(response.data.data.insertId, 'blogs_header', this.file)
            location.href = '/admin/blogs/'
          } else {
            if (!response.data.authorised) {
              this.$router.push({path: '/'})
            }
          }
        }).catch((err) => {
          if (!err.data.authorised) {
            this.$router.push({path: '/'})
          }
        })
      }
    }
  },
  mounted() {
    AuthorisationApi.isAdmin().then((resp) => {
      if (resp.data.authorised) {
        this.authorised = true
        blogApi.getBlogsTags().then((response) => this.tags = response.data.data);
      } else {
        location.href = '/'
      }
    }).catch(() => {
      location.href = '/'
    })
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
