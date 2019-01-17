import axios from 'axios'

export default{
    getSettings () {
        return axios.get('/api/settings')
    }
}