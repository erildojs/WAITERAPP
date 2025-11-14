import { Router } from "express";
import { Order } from "../models/Order";
export const changeOrderStatus = Router();

changeOrderStatus.patch("/:orderId", async (request, response) => {
  const { orderId } = request.params;
  const { status } = request.body;
  if (!["WAITING", "IN_PRODUCTION", "DONE"].includes(status)) {
    response.status(400).json({
      error: "status should be one of theses, WAITING, IN_PRODUCTION, DONE",
    });
  }
  const order = await Order.findByIdAndUpdate(orderId, {
    status,
  });
  response.sendStatus(204);
});
