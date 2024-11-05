// app/api/products/[id]/route.js
import prisma from "@/utils/prisma";

// GET: Fetch a product by ID
export async function GET(req, { params }) {
  const { id: product_id } = params;

  try {
    // Fetch the product including reviews
    const product = await prisma.product.findUnique({
      where: { product_id },
      include: {
        reviews: true,
      },
    });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    // Fetch categories associated with the product
    const categories = await prisma.category.findMany({
      where: {
        category_id: {
          in: product.category_ids,
        },
      },
    });

    // Attach categories to the product
    const productWithCategories = {
      ...product,
      categories,
    };

    return new Response(JSON.stringify(productWithCategories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ error: "Error fetching product" }), {
      status: 500,
    });
  }
}

// PUT: Update a product by ID
export async function PUT(req, { params }) {
  const { id: product_id } = params;

  try {
    const formData = await req.formData();
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

    const updatedProduct = await prisma.product.update({
      where: { product_id },
      data: productData,
    });

    return new Response(JSON.stringify(updatedProduct), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(
      JSON.stringify({ error: `Error updating product: ${error.message}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// DELETE: Delete a product by ID
export async function DELETE(req, { params }) {
  const { id: product_id } = params;

  try {
    await prisma.product.delete({
      where: { product_id },
    });

    return new Response(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ error: "Error deleting product" }), {
      status: 500,
    });
  }
}
