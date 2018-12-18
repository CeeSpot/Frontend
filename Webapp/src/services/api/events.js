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
  }
}
