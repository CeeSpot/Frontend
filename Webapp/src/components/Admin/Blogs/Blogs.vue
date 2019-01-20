<template>
  <b-container style="margin-top: 150px;">
    <b-row>
      <admin-menu v-bind:active="active"></admin-menu>
      <b-col md="8" v-if="authorised">
        <b-row v-for="blog in blogs" class="user-list-item">
          <AdminCard
            :firstcol="blog.title"
            secondcol=""
            :target="'/admin/blogs/edit/' + blog.id"></AdminCard>
        </b-row>
      </b-col>
    </b-row>
    <action-button color="red" :fixed="true" icon="plus" @click.native="routeAddBlog()"></action-button>
  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import ActionButton from '@/components/Core/Other/ActionButton'
import blogApi from '@/services/api/blogs.js'
import AdminCard from '@/components/Core/Other/AdminCard'

export default {
  name: "blogs",
  components: {
    AdminMenu,
    ActionButton,
    AdminCard
  },
  data() {
    return {
      active: 'Blogs',
      blogs: [],
      authorised: false
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY')
    },
    routeAddBlog() {
      location.href = '/admin/blogs/add';
    }
  },
  mounted() {
    Emitter.$on('authorised', () => {
      this.authorised = true
      blogApi.getBlogs().then((response) => this.blogs = response.data.data)
    })
  }
}
</script>

<style scoped>
</style>
