import axios from 'axios'
import {store} from '../../../main'

export default {
  getSettings() {
    return axios.get('/api/settings', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  toggleBlog(data) {
    return axios.put('/api/settings/toggleblog', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
