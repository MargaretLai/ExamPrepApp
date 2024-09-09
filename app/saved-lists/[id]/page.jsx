"use client";
import React, { useEffect, useState } from "react";

export default function FlashcardListDetail({ params }) {
  const id = params.id // The ID of the flashcard list
  const [flashcards, setFlashcards] = useState([]);
  const [listName, setListName] = useState("");

  useEffect(() => {
    const fetchFlashcardList = async () => {
      try {
        const response = await fetch(`/api/flashcardList/${id}`);
        const data = await response.json();
        setFlashcards(data.flashcards); // An array of objects
        setListName(data.listName);
      } catch (error) {
        console.error("Failed to fetch flashcard list:", error);
      }
    };

    if (id) {
      fetchFlashcardList();
    }
  }, [id]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">{listName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashcards.map((flashcard) => (
          <div key={flashcard.id} className="card bg-base-100 w-full shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{flashcard.flashcard_front}</h2>
              <p>{flashcard.flashcard_back}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
