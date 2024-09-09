import { prisma } from "../../../../prisma/client.ts";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
}
