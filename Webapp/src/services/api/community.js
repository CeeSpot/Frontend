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
  },getProfile() {
    return axios.get('/api/users/me',{
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
