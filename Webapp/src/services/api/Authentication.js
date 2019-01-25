/**
 * Created by thama on 30-11-2018.
 */
import axios from 'axios'
import {store} from '../../main'


export default {
  register(data) {
    return axios.post('/api/users/register', data)
    // return {success: true, message: "lalala"}
  },
  registerCompany (data) {
    return axios.post('/api/companies/register', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  login(data) {
    return axios.post('/api/users/authenticate', data)
  },
  updateUser(data) {
    delete data.user.companies;
    delete data.user.iat;
    delete data.user.exp;
    return axios.put('/api/users/update', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  updateCompany (data) {
    delete data.company.iat
    delete data.company.exp
    return axios.put('/api/companies/update', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  deleteUser (data) {
    return axios.delete('/api/users/delete', {
      headers: {
        'x-access-token': store.state.jwt
      },
      data: data
    })
  },
  changePassword (data, type) {
    console.log('type: ' + type)
    return axios.put('/api/auth/changepassword/' + type, data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
