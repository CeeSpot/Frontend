import axios from 'axios'
import {store} from '../../main'

export default {
  getSpaces() {
    return axios.get('/api/spaces', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  getSpace(space_id) {
    return axios.get('/api/spaces/' + space_id, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  deleteSpace(data) {
    return axios.delete('/api/spaces/delete', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  updateSpace(space) {
    let data = {data: space}
    return axios.put('/api/spaces/update', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
