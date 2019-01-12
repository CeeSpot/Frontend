import axios from 'axios'

export default{
  getBlogs () {
    return axios.get('/api/blogs')
  },
  getBlogsTags () {
    return axios.get('/api/blogs/tags')
  }
}
