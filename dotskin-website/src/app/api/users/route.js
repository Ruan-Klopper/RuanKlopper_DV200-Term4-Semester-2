// scr/app/api/users/route.js

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// POST method to create a new user DO NOT MODIFY!!!!!!!!!!!!!!!
export async function POST(req) {
  try {
    const { name, email, password, subscribe } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        subscribed_newsletter: subscribe,
      },
    });

    return new Response(
      JSON.stringify({ message: "User created successfully", userId: user.id }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error creating user:", error);
    return new Response(
      JSON.stringify({ error: "Error creating user", details: error.message }),
      { status: 500 }
    );
  }
}

// GET method to fetch user data based on userId passed in query parameters
export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
        subscribed_newsletter: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ error: "Error fetching user" }), {
      status: 500,
    });
  }
}

// PUT method to update user information based on userId
export async function PUT(req) {
  try {
    const { userId, name, phone_number } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone_number,
      },
    });

    return new Response(
      JSON.stringify({
        message: "User information updated successfully",
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(
      JSON.stringify({ error: "Error updating user", details: error.message }),
      { status: 500 }
    );
  }
}
