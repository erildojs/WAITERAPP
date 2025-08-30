// seed.js
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";

// Caminhos das pastas
const assetsDir = path.join(process.cwd(), "src/images"); // onde estão as imagens originais
const uploadsDir = path.join(process.cwd(), "uploads"); // onde a API espera as imagens

// Lista de imagens por categoria
const categoryImages = {
  pizza: ["marguerita.png", "quatro-queijos.png", "frango-catupiry.png"],
  bebidas: ["cerveja.png", "coca-cola.png", "suco-de-laranja.png"],
  hamburgueres: ["burger-molho-especial.png", "chicken.png", "egg.png"],
  promoçoes: [
    "burger-molho-especial.png",
    "cerveja.png",
    "chicken.png",
    "coca-cola.png",
    "egg.png",
    "frango-catupiry.png",
    "marguerita.png",
    "quatro-queijos.png",
    "suco-de-laranja.png"
  ]
};

// Garante que a pasta uploads exista
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Função para copiar uma imagem do assets para uploads
function copyImageFromAssets(fileName, destName) {
  const srcPath = path.join(assetsDir, fileName);
  const destPath = path.join(uploadsDir, destName);
  fs.copyFileSync(srcPath, destPath);
  return destName;
}

export async function runSeed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/waiterapp");

    // Limpar dados antigos
    await Category.deleteMany();
    await Product.deleteMany();

    console.log("📦 Banco limpo!");

    // Criar categorias
    const categoriesData = [
      { icon: "🍕", name: "pizza" },
      { icon: "🍺", name: "bebidas" },
      { icon: "🍔", name: "hamburgueres" },
      { icon: "📋", name: "promoçoes" }
    ];

    const categories = await Category.insertMany(categoriesData);
    console.log(`✅ ${categories.length} categorias criadas.`);

    // Função para gerar produtos fictícios com imagens relacionadas
    function generateProducts(category) {
      const products = [];
      const images = categoryImages[category.name];

      for (let i = 1; i <= 20; i++) {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const newImageName = `${category.name}-${i}${path.extname(randomImage)}`;

        copyImageFromAssets(randomImage, newImageName);

        products.push({
          name: `${category.name} ${i}`,
          description: `Descrição deliciosa do produto ${i} da categoria ${category.name}.`,
          imagePath: `/uploads/${newImageName}`,
          price: Math.floor(Math.random() * 50) + 10,
          ingredients: [
            { name: "Ingrediente A", icon: "🧀" },
            { name: "Ingrediente B", icon: "🥓" },
            { name: "Ingrediente C", icon: "🍅" }
          ],
          category_Id: category._id
        });
      }

      return products;
    }

    // Criar produtos para cada categoria
    let allProducts = [];
    categories.forEach(category => {
      const products = generateProducts(category);
      allProducts = allProducts.concat(products);
    });

    const createdProducts = await Product.insertMany(allProducts);
    console.log(`✅ ${createdProducts.length} produtos criados com imagens relacionadas.`);

    console.log("🎉 Seed finalizado com sucesso!");
    process.exit();
  } catch (err) {
    console.error("❌ Erro no seed:", err);
    process.exit(1);
  }
}

runSeed();
