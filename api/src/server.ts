import express from 'express'
import mongoose from 'mongoose';
import { router } from './routes.ts';
import path from 'node:path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(express.json())
app.use(router)


mongoose.connect('mongodb://localhost:27017')
  .then(() => console.log('conectado no mongo'))
  .catch(() => console.log('nao conectado no mongo'))

app.listen(3333, () => {
  console.log('server is run');
})