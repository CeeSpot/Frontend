import axios from 'axios'
import {store} from '../../../main'

export default{
  getSpaceRequests () {
    return axios.get('/api/requests/spaces/requests', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  updateReservationState(reservation, approved) {
    reservation.approved = approved;
    let data = {reservation: reservation};
    return axios.put('/api/requests/spaces/state', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  getEventRequests () {
    return axios.get('/api/events/requests', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  approveEvent(id) {
    let data = null;
    return axios.put('/api/events/requests/state/' + id, data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
