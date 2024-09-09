import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client.ts";

export async function POST(req) {
  const body = await req.json();
  const newPet = await prisma.pet.create({
    data: {
      name: body.name,
      owner: body.owner,
    },
  });

  return NextResponse.json(newPet, { status: 201 });
}
