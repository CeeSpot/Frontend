import axios from 'axios'

export default{
  sendRecoveryMail (data) {
    return axios.post('/api/user/recovery', data);
  },
  editPassword (data) {
    return axios.put('/api/user/recovery', data);
  }
}