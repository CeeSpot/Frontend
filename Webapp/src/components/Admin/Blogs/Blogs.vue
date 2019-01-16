<template>
    <b-container style="margin-top: 150px;">
    <b-row>
            <admin-menu v-bind:active="active"></admin-menu>
            <b-col md="8">
                  <b-row v-for="blog in blogs" class="user-list-item">
                    <b-col md="12" class="shadow user-card" v-on:click="openDetailPage(blog.id)">
                        <b-row>
                            <b-col md="4">{{ blog.title }}</b-col>
                        </b-row>
                    </b-col>
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

  export default {
    name: "blogs",
    components: {
      AdminMenu,
      ActionButton
    },
    data() {
      return {
        active: "Blogs",
        blogs: []
      }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY')
      },
      openDetailPage(id) {
          this.$router.push('/admin/blogs/edit/' + id);
      },
      routeAddBlog(){
            location.href = '/admin/blogs/add';
      }
    },
    mounted() {
        blogApi.getBlogs().then(response => this.blogs = response.data.data);
    }
  }
</script>

<style scoped>
    .user-list-item {
        margin-top: 15px;
        cursor: pointer;
    }

    .user-list-item:first-of-type {
        margin-top: 0;
    }

    .user-card {
        border-radius: 4px;
        padding: 20px;
        background-color: white;
    }

    .user-card:hover {
        background-color: #E60000;
        color: white;
    }
</style>