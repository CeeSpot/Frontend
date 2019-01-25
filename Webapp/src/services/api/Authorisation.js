import axios from 'axios'
import {store} from '../../main'

export default {
  isLoggedIn () {
    return axios.get('/api/auth/users/isLoggedIn', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  isAdmin () {
    return axios.get('/api/auth/users/isAdmin', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  profileManagement () {
    return axios.get('/api/auth/users/profilemanagement', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  allowSpaceBookingNoConfirm () {
    return axios.get('/api/auth/bookings/spaces/noconfirm', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  allowEventBookingNoConfirm () {
    return axios.get('/api/auth/bookings/events/noconfirm', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  allowCreateCompanyPage () {
    return axios.get('/api/auth/companies/cancreateaccount', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
}
