import axios from 'axios'
import {store} from "../../../main";

export default{
  addEvent (data) {
    return axios.post('/api/events/add', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  deleteEvent (data) {
    const headers = {
      'x-access-token': store.state.jwt
    }
    console.log(data.event_id)
    return axios.delete('/api/events/delete/' + data.event_id, {headers})
  },
  updateEvent (data) {
    return axios.put('/api/events/update', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
