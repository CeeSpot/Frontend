import axios from 'axios'
import {store} from '../../main'

export default {
  getUsers() {
    return axios.get('http://localhost:3000/api/users')
  },
  getUser(userID) {
    return axios.get('http://localhost:3000/api/users/profile/' + userID)
  },
  getCompanies() {
    return axios.get('http://localhost:3000/api/companies')
  },
  getProfile() {
    return axios.get('http://localhost:3000/api/users/me',{
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
