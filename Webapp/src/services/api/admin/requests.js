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
  }
}
