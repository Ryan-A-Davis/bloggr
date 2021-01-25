import Axios from 'axios'

const baseURL = window.location.origin.includes('localhost') ? 'http://localhost:3000' : ''
export const api = Axios.create({
  baseURL,
  timeout: 8000
})
export const sandboxApi = Axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/',
  timeout: 8000
})

export const setBearer = function(bearer) {
  sandboxApi.defaults.headers.authorization = bearer
}

export const resetBearer = function() {
  sandboxApi.defaults.headers.authorization = ''
}
