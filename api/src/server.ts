import express from 'express'
import mongoose from 'mongoose';
import { router } from './routes.ts';
import path from 'node:path'
import { fileURLToPath } from 'url';
import http from 'node:http'
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const server = http.createServer(app)
export const io = new Server(server)

app.use((request, response, next) => {//isso está aqui pk o cors não esta funcionando na web
  response.header('Access-Control-Allow-Origin', ' http://localhost:5173')
  response.header('Access-Control-Allow-Methods', '*')
  response.header('Access-Control-Allow-Headers', '*')
  next()
})
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(express.json())
app.use(router)

mongoose.connect('mongodb://db_waiterapp:27017/waiterappdb')
  .then(() => console.log('conectado no mongo'))
  .catch(() => console.log('não conectado no mongo'))

server.listen(3333, () => {
  console.log('server is running 🚀');
})