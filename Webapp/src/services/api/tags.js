import axios from 'axios'

export default{
  getUserTags () {
    return axios.get('/api/tags/users')
  },
  getCompanyTags () {
    return axios.get('/api/tags/companies')
  }
}
