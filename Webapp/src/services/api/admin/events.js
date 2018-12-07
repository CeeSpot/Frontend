import axios from 'axios'

export default{
  addEvent (data) {
    return axios.post('http://localhost:3000/api/events/add',data)
  },
  deleteEvent (data) {
    return axios.delete('http://localhost:3000/api/events/delete',data)
  }
}
