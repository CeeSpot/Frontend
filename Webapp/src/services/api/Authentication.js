/**
 * Created by thama on 30-11-2018.
 */
import axios from 'axios'

export default{
    register (data) {
        return axios.post('http://localhost:3000/api/users/register',data)
        // return {success: true, message: "lalala"}
    },
    login (data) {
        return axios.post('http://localhost:3000/api/users/authenticate',data)
    }
}
