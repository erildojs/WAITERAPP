import { Router } from "express";
import { Product } from "../models/Product";
export const getProducts = Router();

getProducts.get("/", async (request, response) => {
  const products = await Product.find();
  response.json(products);
});
