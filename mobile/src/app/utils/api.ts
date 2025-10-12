import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://172.30.232.76:8081'
})