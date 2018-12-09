/**
 * Created by thama on 30-11-2018.
 */
import axios from 'axios'
import {store} from '../../main'

export default {
  register(data) {
    return axios.post('http://localhost:3000/api/users/register', data)
    // return {success: true, message: "lalala"}
  },
  login(data) {
    return axios.post('http://localhost:3000/api/users/authenticate', data)
  },
  updateUser(data) {
    delete data.user.companies;
    delete data.user.iat;
    delete data.user.exp;
    return axios.put('http://localhost:3000/api/users/updateme', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    });
  }
}
