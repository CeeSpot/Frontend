/**
 * Created by thama on 30-11-2018.
 */
import axios from 'axios'
import {store} from '../../main'

export default {
  register(data) {
    return axios.post('/api/users/register', data)
    // return {success: true, message: "lalala"}
  },
  login(data) {
    return axios.post('/api/users/authenticate', data)
  },
  updateUser(data) {
    delete data.user.companies;
    delete data.user.iat;
    delete data.user.exp;
    return axios.put('/api/users/updateme', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  changePassword (data) {
    return axios.put('/api/users/changepassword', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
