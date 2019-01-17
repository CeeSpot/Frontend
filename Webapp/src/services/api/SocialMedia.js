import axios from 'axios'
import {store} from '../../main'

export default {
  addResourceSite(data) {
    return axios.post('/api/socialmedia/resource', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    });
  },
}
