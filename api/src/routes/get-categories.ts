import { Router } from "express";
import { Category } from "../models/Category";

export const getCategories = Router();

getCategories.get("/", async (request, response) => {
  const categories = await Category.find();
  response.json(categories);
});
