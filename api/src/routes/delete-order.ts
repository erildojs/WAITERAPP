import { Router } from "express";
import { Order } from "../models/Order";

export const deleteOrder = Router();

deleteOrder.delete("/:orderId", async (request, response) => {
  const { orderId } = request.params;
  const order = await Order.findByIdAndDelete(orderId);
  response.sendStatus(204);
});
