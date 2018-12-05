import axios from 'axios'

export default{
  getEvents () {
    return axios.get('http://localhost:3000/api/events')
  },
  addUserEvent (data) {
    return axios.post('http://localhost:3000/api/events/userevent',data)
  },
  removeUserEvent (data) {
    return axios.post('http://localhost:3000/api/events/userevent/remove',data)
  }
}