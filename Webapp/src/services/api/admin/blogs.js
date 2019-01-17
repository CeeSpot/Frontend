import axios from 'axios'

export default{
  addBlog (data) {
    return axios.post('/api/blogs/add', data)
  },
  updateBlog (data) {
    return axios.put('/api/blogs/update', data)
  },
  deleteBlog(data) {
    return axios.delete('/api/blogs/delete', data)
  }
}