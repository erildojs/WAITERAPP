import { Router } from "express";
import { Order } from "../models/Order";
import { io } from "../server";
export const createOrders = Router();

createOrders.post("/", async (request, response) => {
  const { table, products } = request.body;
  const order = await Order.create({ table, products });
  const orderDetails = await order.populate("products.product");
  io.emit("orders@new", orderDetails);
  response.json(order);
});
