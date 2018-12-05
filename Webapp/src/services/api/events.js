import axios from 'axios'

export default{
  getEvents () {
    return axios.get('http://localhost:3000/api/events')
  }
}