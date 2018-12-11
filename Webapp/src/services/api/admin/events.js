import axios from 'axios'

export default{
  addEvent (data) {
    return axios.post('http://localhost:3000/api/events/add', data)
  },
  deleteEvent (data) {
    return axios.delete('http://localhost:3000/api/events/delete', data)
  },
  updateEvent (data) {
    return axios.put('http://localhost:3000/api/events/update', data)
  },
  getParticipants (event_id) {
    return axios.get('http://localhost:3000/api/events/participants/' + event_id)
  }
}
