import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://172.21.22.52:8081'
})