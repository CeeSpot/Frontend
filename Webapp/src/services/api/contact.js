import axios from 'axios'
export default {
  sendMail(data) {
    axios.post('/api/contact', data);
  }
}