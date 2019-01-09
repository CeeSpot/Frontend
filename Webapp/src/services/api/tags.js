import axios from 'axios'

export default{
  getTags () {
    return axios.get('/api/tags')
  }
}
