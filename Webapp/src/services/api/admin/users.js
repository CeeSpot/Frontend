import axios from 'axios'

export default{
  deleteUser (data) {
    return axios.delete('/api/users/delete', data)
  },
  updateUser(data){
      return axios.put('api/users/update', data)
  }
}
