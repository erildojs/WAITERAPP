import { Router } from "express";
import { Category } from "./models/Category.ts";
import { Product } from "./models/Product.ts";
import multer from 'multer';
import path from 'node:path'
import { fileURLToPath } from "node:url";
import { Order } from "./models/Order.ts";
import { io } from "./server.ts";

export const router = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
})

router.get('/categories', async (request, response) => {
  const categories = await Category.find()
  response.json(categories)
})

router.post('/categories', upload.single('imagePath'), async (request, response) => {
  const { icon, name } = request.body
  const categories = await Category.create({ icon, name })
  response.status(201).json(categories)
})

router.post('/products', upload.single('imagePath'), async (request, response) => {
  const imagePath = request.file?.filename
  const { name, description, price, category, ingredients } = request.body
  const product = await Product.create({ name, description, imagePath, price, category, ingredients: ingredients ? JSON.parse(ingredients) : [] })
  response.status(201).json(product)
})

router.get('/products', async (request, response) => {
  const products = await Product.find()
  response.json(products)
})

router.get('/categories/:categoryId/products', async (request, response) => {
  const { categoryId } = request.params
  // const category = await Category.findById(categoryId)
  // if (!category) {
  //   response.json({
  //     message: 'categoryId not found'
  //   })
  // }
  const products = await Product.find().where('category').equals(categoryId)
  response.json(products)
})

router.get('/orders', async (request, response) => {
  //populate() é usado para trazer tbm as infos do relacionamento da outra table
  const orders = await Order.find().populate('products.product').sort({ created_at: 1 })
  response.json(orders)
})

router.post('/orders', async (request, response) => {
  const { table, products } = request.body
  const order = await Order.create({ table, products })
  const orderDetails = await order.populate('products.product')
  io.emit('orders@new', orderDetails)
  response.json(order)
})

router.patch('/orders/:orderId', async (request, response) => {
  const { orderId } = request.params
  const { status } = request.body
  if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
    response.status(400).json({
      error: 'status should be one of theses, WAITING, IN_PRODUCTION, DONE'
    })
  }
  const order = await Order.findByIdAndUpdate(orderId, {
    status
  })
  response.sendStatus(204)
})

router.delete('/orders/:orderId', async (request, response) => {
  const { orderId } = request.params
  const order = await Order.findByIdAndDelete(orderId)
  response.sendStatus(204)
})