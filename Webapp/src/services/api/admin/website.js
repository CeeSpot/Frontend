import axios from 'axios'
import {store} from "../../../main";

export default{
  updateText (data) {
    return axios.put('/api/text/edit', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  }
}
