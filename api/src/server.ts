import "dotenv/config"
import express from 'express'
import mongoose from 'mongoose';
import { router } from './routes.js';
import http from 'node:http'
import { Server } from 'socket.io';
import path from 'node:path';
import swaggerUi from "swagger-ui-express"
import swaggerFile from "../swagger.json"
import { runSeed } from "./database/seed.js";

const app = express()
const server = http.createServer(app)
export const io = new Server(server)

app.use((request, response, next) => {//isso está aqui pk o cors não esta funcionando na web
  response.header('Access-Control-Allow-Origin', ' http://localhost:5173')
  response.header('Access-Control-Allow-Methods', '*')
  response.header('Access-Control-Allow-Headers', '*')
  next()
})
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(router)

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('conectado no mongo')
    server.listen(process.env.API_PORT || 3333, () => {
      console.log('server is running 🚀');
      console.log('Documentação no endereço: http://localhost:3333/docs');
    })
    runSeed()
  })
  .catch(() => console.log('não conectado no mongo'))