import axios from 'axios'

const api = axios.create({
  baseURL: 'https://kennedyrs-devradar.herokuapp.com'
})

export default api