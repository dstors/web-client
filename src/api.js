import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://localhost:8080`,
    credentials: 'same-origin'
    // withCredentials: false,
    // headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json'
    // }
  })
}