import axios from 'axios'

export default{
  addEvent (data) {
    return axios.post('/api/events/add', data)
  },
  deleteEvent (data) {
    return axios.delete('/api/events/delete', data)
  },
  updateEvent (data) {
    return axios.put('/api/events/update', data)
  },
  getParticipants (event_id) {
    return axios.get('/api/events/participants/' + event_id)
  }
}
