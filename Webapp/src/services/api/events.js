import axios from 'axios'
import {JSON_TOKEN} from '../../constants'
import {store} from '../../main'

let config = {
  headers: {
    'x-access-token': JSON.parse(localStorage.getItem(JSON_TOKEN))
  }
};
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
  getEvent(event_id) {
    return axios.get('/api/event/' + event_id)
  }
}
