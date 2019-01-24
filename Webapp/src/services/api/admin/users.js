import axios from 'axios'
import {store} from '../../../main'

export default{
  updateUser (data) {
    return axios.put('api/users/update', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
