import axios from 'axios'

export default{
  getBlogs () {
    return axios.get('/api/blogs')
  },
  getBlogsTags () {
    return axios.get('/api/blogs/tags')
  },
  getBlog (id) {
    return axios.get('/api/blog/' + id)
  }
}
