import axios from 'axios'

export default{
  getBlogs () {
    return axios.get('/api/blogs')
  }
}
