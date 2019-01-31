<template>
  <b-container v-if="authorised" style="margin-top: 170px;">
  <admin-back-button target="events" @click.native="back()"></admin-back-button>
    <b-row>
      <b-col>
        <label class="font-weight-bold" for="inputTitle">Title</label>
        <div style="width: 100%; font-size: 1.125em;" class="card shadow no-scale">
          <b-form-input id="inputTitle" v-model="blog.title" type="text" placeholder="Title"></b-form-input>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <label class="font-weight-bold" for="inputDescription">Description</label>
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
        <label class="font-weight-bold" for="inputTags">Tags</label>
        <multiselect v-model="values" :options="tags" :multiple="true" :close-on-select="false" :clear-on-select="false"
                     :preserve-search="true" placeholder="Pick some" label="description" track-by="description"
                     :preselect-first="false">
          <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single"
                                                                                   v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
          </template>
        </multiselect>
        <label class="mt-3 font-weight-bold" for="blogText">Text</label>
        <vue-editor class="card shadow no-scale" id="blogText" v-model="blog.body"></vue-editor>
      </b-col>
    </b-row>
    <div class="fab-buttons">
      <b-row>
        <b-col>
          <action-button color="red" :fixed="false" icon="trash" @click.native="deleteBlog()"></action-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <action-button color="red" :fixed="false" icon="save" @click.native="editBlog()"></action-button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import ActionButton from '@/components/Core/Other/ActionButton'
import AdminBlogApi from '@/services/api/admin/blogs.js'
import blogApi from '@/services/api/blogs.js'
import {VueEditor} from 'vue2-editor'
import Multiselect from 'vue-multiselect'
import AuthorisationApi from '@/services/api/Authorisation.js'
import AdminBackButton from '@/components/Core/Other/AdminBackButton'

export default {
  name: 'editblog',
  components: {
    ActionButton,
    VueEditor,
    Multiselect,
    AdminBackButton
  },
  data() {
    return {
      blog: [],
      tags: [],
      values: null,
      authorised: false
    }
  },
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    editBlog() {
      this.blog.tags = this.values;
      AdminBlogApi.updateBlog(this.blog).then(response => {
        if (response.data.success && response.data.authorised) {
          this.$toasted.show('Successfully edited blog!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        } else {
          this.$toasted.show('Something went wrong try again later!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
          if (!response.data.authorised) {
            this.$router.push({path: '/'})
          }
        }
      }).catch((err) => {
        this.$toasted.show('Something went wrong, please try again',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        if (!err.data.authorised) {
          this.$router.push({path: '/'})
        }
      })
    },
    back() {
      location.href = '/admin/blogs/'
    },
    deleteBlog() {
      let data = {
        data: {
          blog_id: this.id
        }
      }
       AdminBlogApi.deleteBlog(data).then(response => {
        if(response.data.success){
          this.$toasted.show('Successfully deleted blog!',
                  {
                    position: 'top-center',
                    duration: 3000
                  }
          )
          location.href = '/admin/blogs/'
        } else {
           this.$toasted.show('Something went wrong try again later!',
                  {
                    position: 'top-center',
                    duration: 3000
                  }
          )
        }
      })
    }
  },
  mounted() {
    AuthorisationApi.isAdmin().then((resp) => {
      if (resp.data.authorised) {
        this.authorised = true
        blogApi.getBlogsTags().then((response) => this.tags = response.data.data)
        blogApi.getBlog(this.id).then((response) => {
          this.blog = response.data.data[0]
          this.values = this.blog.tags
        })
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
