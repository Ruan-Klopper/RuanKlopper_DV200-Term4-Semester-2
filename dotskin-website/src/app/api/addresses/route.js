// src/app/api/addresses/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { userId, ...addressData } = await req.json();
  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID required" }), {
      status: 400,
    });
  }

  try {
    const address = await prisma.address.create({
      data: {
        ...addressData,
        user_id: userId,
      },
    });
    return new Response(JSON.stringify({ address }), { status: 201 });
  } catch (error) {
    console.error("Error creating address:", error);
    return new Response(JSON.stringify({ error: "Error creating address" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  const { userId, ...addressData } = await req.json();
  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID required" }), {
      status: 400,
    });
  }

  try {
    const existingAddress = await prisma.address.findFirst({
      where: { user_id: userId },
    });

    let address;
    if (existingAddress) {
      address = await prisma.address.update({
        where: { address_id: existingAddress.address_id },
        data: addressData,
      });
    } else {
      address = await prisma.address.create({
        data: {
          ...addressData,
          user_id: userId,
        },
      });
    }

    return new Response(JSON.stringify({ address }), { status: 200 });
  } catch (error) {
    console.error("Error updating or creating address:", error);
    return new Response(
      JSON.stringify({ error: "Error updating or creating address" }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID required" }), {
      status: 400,
    });
  }

  try {
    const address = await prisma.address.findFirst({
      where: { user_id: userId },
    });
    return new Response(JSON.stringify({ address }), { status: 200 });
  } catch (error) {
    console.error("Error fetching address:", error);
    return new Response(JSON.stringify({ error: "Error fetching address" }), {
      status: 500,
    });
  }
}
