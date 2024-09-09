import { prisma } from "../../../prisma/client";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { userId } = getAuth(req);

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const savedLists = await prisma.savedFlashcardList.findMany({
      where: { userID: userId },
      include: {
        flashcards: true, 
      },
    });

    return new Response(JSON.stringify(savedLists), { status: 200 });
  } catch (error) {
    console.error("Error fetching saved flashcard lists:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching saved flashcard lists" }),
      { status: 500 }
    );
  }
}
