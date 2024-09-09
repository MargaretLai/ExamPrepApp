import { prisma } from "../../../../prisma/client";

export async function GET(req, { params }) {
  const id = parseInt(params.id);
  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });
  }

  try {
    const flashcardList = await prisma.savedFlashcardList.findUnique({
      where: { id },
      include: {
        flashcards: true,
      },
    });

    if (!flashcardList) {
      return new Response(
        JSON.stringify({ error: "Flashcard list not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        listName: flashcardList.listName,
        flashcards: flashcardList.flashcards,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching flashcard list:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching flashcard list" }),
      { status: 500 }
    );
  }
}
