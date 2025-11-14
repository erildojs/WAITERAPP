import { Router } from "express";
import { getOrders } from "./get-orders";
import { getCategories } from "./get-categories";
import { getProducts } from "./get-products";
import { createOrders } from "./create-orders";
import { createCategories } from "./create-categories";
import { createProducts } from "./create-products";
import { getProductsByCategory } from "./get-products-by-category";
import { deleteOrder } from "./delete-order";
import { changeOrderStatus } from "./change-order.status";

const router = Router();

router.use("/orders", getOrders);
router.use("/orders", createOrders);
router.use("/orders", deleteOrder);
router.use("/orders", changeOrderStatus);
router.use("/categories", getCategories);
router.use("/categories", createCategories);
router.use("/categories", getProductsByCategory);
router.use("/products", getProducts);
router.use("/products", createProducts);

export { router };
