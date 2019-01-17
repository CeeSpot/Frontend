import axios from 'axios'
import {store} from '../../../main'

export default{
  getSpaceRequests (data) {
    return axios.get('/api/requests/spaces/getrequests')
  },
  appDecReservation(reservation, approved) {
    reservation.approved = approved;
    let data = {data: reservation};
    return axios.put('/api/requests/spaces/appdec', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
