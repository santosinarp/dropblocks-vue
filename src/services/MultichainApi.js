import axios from 'axios'

// multichain middleware
export default () => {
    return axios.create({
      baseURL: `http://localhost:3005/api/v0/`
    })
  }
 