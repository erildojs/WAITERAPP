import { Router } from "express";
import { Product } from "../models/Product";

export const getProductsByCategory = Router();

getProductsByCategory.get(
  "/:categoryId/products",
  async (request, response) => {
    const { categoryId } = request.params;
    // const category = await Category.findById(categoryId)
    // if (!category) {
    //   response.json({
    //     message: 'categoryId not found'
    //   })
    // }
    const products = await Product.find()
      .where("categoryId")
      .equals(categoryId);
    response.json(products);
  }
);
