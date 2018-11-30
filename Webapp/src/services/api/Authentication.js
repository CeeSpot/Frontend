/**
 * Created by thama on 30-11-2018.
 */
import axios from 'axios'

export default{
    register () {
        // return axios.get('http://localhost:3000/api/users')
        return {success: true, message: "lalala"}
    },
    login (data) {
        return axios.post('http://localhost:3000/api/users/authenticate',data)
    }
}
