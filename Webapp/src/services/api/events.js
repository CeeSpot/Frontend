import axios from 'axios'
import { JSON_TOKEN } from '../../constants'

let config = {
  headers: {
    'x-access-token' : JSON.parse(localStorage.getItem(JSON_TOKEN))
  }
};
export default{
  getEvents () {
    return axios.get('http://localhost:3000/api/events',config)
  },
  addUserEvent (data) {
    console.log(config);
    return axios.post('http://localhost:3000/api/events/userevent',data, config)
  },
  removeUserEvent (data) {
    // console.log(config);
    data.headers = config.headers;
    return axios.delete('http://localhost:3000/api/events/userevent',data)
  }
}
