// pages/api/reviews/route.js

const prisma = require("@/utils/prisma");

export async function POST(request) {
  try {
    const data = await request.json();

    const newReview = await prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        review_title: data.review_title,
        is_verified_purchase: data.is_verified_purchase,
        user: {
          connect: { user_id: data.user_id },
        },
        product: {
          connect: { product_id: data.product_id },
        },
      },
    });

    return new Response(JSON.stringify(newReview), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return new Response(JSON.stringify({ error: "Error creating review" }), {
      status: 500,
    });
  }
}
