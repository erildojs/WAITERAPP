import { Router } from "express";
import { Order } from "../models/Order";

export const getOrders = Router();

getOrders.get("/", async (request, response) => {
  //populate() é usado para trazer tbm as infos do relacionamento da outra table
  const orders = await Order.find()
    .populate("products.product")
    .sort({ created_at: 1 });
  response.json(orders);
});
