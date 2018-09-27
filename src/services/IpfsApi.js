import axios from 'axios'

// ipfs middleware
export default () => {
    return axios.create({
        baseURL: `http://localhost:3000/api/v0/`
    })
}
  