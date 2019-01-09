import axios from 'axios'
import {store} from '../../main'

export default {
  addResourceSite(data) {
    return axios.post('http://localhost:3000/api/socialmedia/resource', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    });
  },
}
