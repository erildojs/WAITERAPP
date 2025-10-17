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
  const origin = process.env['FRONT-END_URL'] ?? '*'
  response.header('Access-Control-Allow-Origin', origin)
  response.header('Access-Control-Allow-Methods', '*')
  response.header('Access-Control-Allow-Headers', '*')
  next()
})
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(express.json())
app.use(router)

mongoose.connect(process.env.MONGO_URL!)
  .then(() => {
    console.log('conectado no mongo')
    server.listen(process.env.API_PORT || 3333, () => console.log('server started'))
  })
  .catch(() => console.log('não conectado no mongo'))
