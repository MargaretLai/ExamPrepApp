import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/client.ts";

export async function GET(req) {
  try {
    const pets = await prisma.pet.findMany();
    return NextResponse.json(pets, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve pets" },
      { status: 500 }
    );
  }
}
