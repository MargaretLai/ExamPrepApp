import { prisma } from "../../../prisma/client.ts";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { listName, flashcards } = await req.json();
    const { userId } = getAuth(req);

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Save flashcards individually
    const createdFlashcards = [];
    for (const card of flashcards) {
      const createdFlashcard = await prisma.flashcard.create({
        data: {
          flashcard_front: card.flashcard_front,
          flashcard_back: card.flashcard_back,
        },
      });
      createdFlashcards.push(createdFlashcard);
    }

    // Save the list with the associated flashcards
    const savedList = await prisma.savedFlashcardList.create({
      data: {
        userID: userId,
        listName: listName,
        flashcards: {
          connect: createdFlashcards.map((flashcard) => ({
            id: flashcard.id,
          })),
        },
      },
    });

    return new Response(JSON.stringify(savedList), { status: 200 });
  } catch (error) {
    console.error("Error saving flashcards", error);
    return new Response(JSON.stringify({ error: "Error saving flashcards" }), {
      status: 500,
    });
  }
}
