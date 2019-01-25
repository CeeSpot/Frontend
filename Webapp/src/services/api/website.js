import axios from 'axios'

export default{
  getText () {
    return axios.get('/api/text')
  },
  getOneText (id) {
    return axios.get('/api/text/' + id)
  }
}
