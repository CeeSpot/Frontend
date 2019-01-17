import axios from 'axios'
import {store} from '../../../main'

export default{
  getSpaceRequests (data) {
    return axios.get('/api/requests/spaces/getrequests')
  },
  appDecReservation(reservation_id, approved) {
    let data = {data: {id: reservation_id, approved: approved}};
    return axios.put('/api/requests/spaces/appdec', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
