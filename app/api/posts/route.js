import { prisma } from "../../../prisma/client.ts";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve posts" },
      { status: 500 }
    );
  }
}
