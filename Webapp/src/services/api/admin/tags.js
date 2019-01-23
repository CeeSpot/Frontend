import axios from 'axios'
import {store} from "../../../main";

export default{
  addTag (data, selectedTab) {
    return axios.post('/api/tags/add/' + selectedTab, data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  editTag (data, selectedTab) {
    return axios.put('/api/tags/edit/' + selectedTab, data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  deleteTag (data,selectedTab) {
    return axios.delete('/api/tags/delete/' + selectedTab, {
      headers: {
        'x-access-token': store.state.jwt
      },
      data: data
    })
  }
}