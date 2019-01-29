import axios from 'axios'
import {store} from '../../../main'

export default{
  updateUser (data) {
    return axios.put('/api/users/update', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  getRoles () {
    return axios.get('/api/auth/users/roles', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  updateUserRole(data) {
    return axios.put('/api/auth/users/roles', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
