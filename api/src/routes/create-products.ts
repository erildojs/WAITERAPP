import { Router } from "express";
import { upload } from "../config/multer";
import { Product } from "../models/Product";
export const createProducts = Router();

createProducts.post(
  "/",
  upload.single("imagePath"),
  async (request, response) => {
    const imagePath = request.file?.filename;
    const { name, description, price, categoryId, ingredients } = request.body;
    const product = await Product.create({
      name,
      description,
      imagePath,
      price,
      categoryId,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });
    const productObject = product.toObject ? product.toObject() : product;
    const productWithFullImageUrl = {
      ...productObject,
      imagePath: imagePath
        ? `http://localhost:3333/uploads/${imagePath}`
        : undefined,
    };
    response.status(201).json(productWithFullImageUrl);
  }
);
