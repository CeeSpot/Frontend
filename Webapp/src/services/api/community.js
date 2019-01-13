import axios from 'axios'
import {store} from '../../main'

export default {
  getUsers() {
    return axios.get('/api/users')
  },
  getUser(userID) {
    return axios.get('/api/users/profile/' + userID)
  },
  getCompanies() {
    return axios.get('/api/companies')
  },
  getCompany(id) {
    return axios.get('/api/companies/' + id)
  },
  getProfile () {
    return axios.get('/api/users/me',{
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  addCompanies (data, deleted) {
    for (let i = 0; i < data.length; i++) {
      delete data[i].companies
    }
    return axios.post('/api/users/companies', {companies: data, deleted: deleted}, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  addTags (data, deleted) {
    return axios.post('/api/users/tags', {user_tags: data, deleted: deleted}, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
