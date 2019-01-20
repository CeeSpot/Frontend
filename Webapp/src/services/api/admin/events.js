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
    return axios.delete('/api/events/delete', {
      headers: {
        'x-access-token': store.state.jwt
      },
      data: data
    })
  },
  updateEvent (data) {
    return axios.put('/api/events/update', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  getParticipants (eventId) {
    return axios.get('/api/events/participants/' + eventId)
  }
}
