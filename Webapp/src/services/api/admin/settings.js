import axios from 'axios'

export default{
    getSettings () {
        return axios.get('/api/settings')
    },
    toggleBlog (data) {
        return axios.put('/api/settings/toggleblog', data)
    }
}