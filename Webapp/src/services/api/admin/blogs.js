import axios from 'axios'
import {store} from "../../../main";

export default{
  addBlog (data) {
    return axios.post('/api/blogs/add', data)
  },
  updateBlog (data) {
    return axios.put('/api/blogs/update', data)
  },
  deleteBlog(data) {
    return axios.delete('/api/blogs/delete', data)
  },
  getBlogsTags () {
    return axios.get('/api/blogs/tags')
  },
  addBlogTag (data) {
    return axios.post('/api/blogs/tags/add', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}