import axios from 'axios'
import {store} from '../../main'

export default {
  getEvents() {
    return axios.get('http://localhost:3000/api/events', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  getEvent(id) {
    return axios.get('http://localhost:3000/api/event/' + id, {
      headers: {
        'x-access-token': store.state.jwt
      }
    });
  },
  addUserEvent(data) {
    return axios.post('http://localhost:3000/api/events/userevent', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    });
  },
  removeUserEvent(data) {
    data.headers = {'x-access-token': store.state.jwt};
    return axios.delete('http://localhost:3000/api/events/userevent', data)
  },
  getEvent(event_id) {
    return axios.get('http://localhost:3000/api/event/' + event_id)
  }
}
