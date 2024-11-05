// app/api/products/route.js

import prisma from "@/utils/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// GET: Fetch all products with their categories and reviews
export async function GET(req) {
  try {
    // Fetch all products including reviews
    const products = await prisma.product.findMany({
      include: {
        reviews: true,
      },
    });

    // Collect all unique category IDs from the products
    const categoryIdsSet = new Set();
    products.forEach((product) => {
      product.category_ids.forEach((id) => categoryIdsSet.add(id));
    });
    const categoryIds = Array.from(categoryIdsSet);

    // Fetch only the categories that are needed
    const categories = await prisma.category.findMany({
      where: {
        category_id: {
          in: categoryIds,
        },
      },
    });

    // Create a map for quick lookup
    const categoryMap = {};
    categories.forEach((category) => {
      categoryMap[category.category_id] = category;
    });

    // Map over products to attach categories
    const productsWithCategories = products.map((product) => {
      const productCategories = product.category_ids
        .map((id) => categoryMap[id])
        .filter(Boolean); // Filter out any undefined values
      return {
        ...product,
        categories: productCategories,
      };
    });

    return new Response(JSON.stringify(productsWithCategories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Error fetching products" }), {
      status: 500,
    });
  }
}

// POST: Create a new product
export async function POST(req) {
  try {
    const formData = await req.formData();

    // Get the image file
    const imageFile = formData.get("imageFile");

    // Convert the image file to a buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert the buffer to a base64-encoded string
    const base64Image = `data:${imageFile.type};base64,${buffer.toString(
      "base64"
    )}`;

    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "products",
    });

    // Extract other fields from formData
    const category_ids = formData.getAll("category_ids[]");
    const productData = {
      sku: formData.get("sku"),
      name: formData.get("name"),
      description: formData.get("description"),
      SEOtags: formData.get("SEOtags"),
      directions: formData.get("directions"),
      ingredients: formData.get("ingredients"),
      precautions: formData.get("precautions"),
      price: parseFloat(formData.get("price")),
      tax_rate: parseFloat(formData.get("tax_rate")),
      stock_quantity: parseInt(formData.get("stock_quantity")),
      is_active: formData.get("is_active") === "true",
      category_ids: category_ids,
    };

    // Save product with image URL in database
    const createdProduct = await prisma.product.create({
      data: {
        ...productData,
        image_url: uploadResult.secure_url,
      },
    });

    return new Response(JSON.stringify(createdProduct), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(
      JSON.stringify({ error: `Error creating product: ${error.message}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
