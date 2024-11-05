// app/api/categories/route.js

import prisma from "@/utils/prisma";

// GET: Fetch all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching categories" }),
      {
        status: 500,
      }
    );
  }
}

// POST: Create a new category
export async function POST(req) {
  try {
    const data = await req.json();
    const newCategory = await prisma.category.create({
      data,
    });
    return new Response(JSON.stringify(newCategory), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return new Response(JSON.stringify({ error: "Error creating category" }), {
      status: 500,
    });
  }
}
