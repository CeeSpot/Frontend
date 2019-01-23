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
  getSpace(spaceId) {
    return axios.get('/api/spaces/' + spaceId, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  deleteSpace (data) {
    data.headers = {
      'x-access-token': store.state.jwt
    }
    return axios.delete('/api/spaces/delete', data)
  },
  updateSpace(space) {
    let data = {space: space}
    return axios.put('/api/spaces/update', data, {
      headers: {
        'x-access-tokeappn': store.state.jwt
      }
    })
  },
  addSpace(space) {
    let data = {space: space};
    return axios.post('/api/spaces/add', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  checkAvailability(booking) {
    let data = {reservation: booking};
    return axios.post('/api/spaces/book', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
