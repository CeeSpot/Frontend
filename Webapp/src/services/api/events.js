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
    return axios.get('http://localhost:3000/api/events', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  addUserEvent(data) {
    return axios.post('http://localhost:3000/api/events/userevent', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    });
  },
  removeUserEvent(data) {
    // console.log(config);
    data.headers = {'x-access-token': store.state.jwt};
    return axios.delete('http://localhost:3000/api/events/userevent', data)
  },
  getEvent(event_id) {
    return axios.get('http://localhost:3000/api/event/' + event_id)
  },
}
