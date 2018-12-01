import axios from 'axios'

export default{
    getUsers () {
        return axios.get('http://localhost:3000/api/users')
    },
    getUser (userID) {
        return axios.get('http://localhost:3000/api/users/profile/' + userID)
    },
    getCompanies () {
        return axios.get('http://localhost:3000/api/companies')
    }
}
