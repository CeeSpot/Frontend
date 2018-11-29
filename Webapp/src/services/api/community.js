import axios from 'axios'

export default{
    getUsers() {
        return axios.get('http://localhost:3000/api/users')
    },
    getCompanies() {
        return axios.get('http://localhost:3000/api/companies')
    }
}