import { Router } from "express";
import { upload } from "../config/multer";
import { Category } from "../models/Category";

export const createCategories = Router();

createCategories.post(
  "/",
  upload.single("imagePath"),
  async (request, response) => {
    const { icon, name } = request.body;
    const categories = await Category.create({ icon, name });
    response.status(201).json(categories);
  }
);
