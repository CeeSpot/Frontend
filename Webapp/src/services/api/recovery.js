import axios from 'axios'

export default{
  sendRecoveryMailUser (data) {
    return axios.post('/api/user/recovery', data);
  },
  editPasswordUser (data) {
    return axios.put('/api/user/recovery', data);
  },
  sendRecoveryMailCompany (data) {
    return axios.post('/api/company/recovery', data);
  },
  editPasswordCompany (data) {
    return axios.put('/api/company/recovery', data);
  },
}