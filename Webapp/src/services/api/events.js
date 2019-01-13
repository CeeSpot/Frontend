import axios from 'axios'
import {store} from '../../main'

export default {
  getEvents() {
    return axios.get('/api/events', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  getEvent(id) {
    return axios.get('/api/event/' + id, {
      headers: {
        'x-access-token': store.state.jwt
      }
    });
  },
  addUserEvent(data) {
    return axios.post('/api/events/userevent', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    });
  },
  removeUserEvent(data) {
    data.headers = {'x-access-token': store.state.jwt};
    return axios.delete('/api/events/userevent', data)
  },
}
