"use client";
import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";

export default function FlashcardList({ query }) {
  const [flippedCards, setFlippedCards] = useState({});
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [listName, setListName] = useState("");

  function handleSaveFlashcards() {
    setIsPromptVisible(true);
  }

  const handleSave = async () => {
    if (listName.trim()) {
      try {
        const response = await fetch("/api/saveFlashcards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ listName, flashcards }),
        });
        if (response.ok) {
          console.log("Flashcards saved successfully");
          setIsPromptVisible(false);
          setListName("");
        } else {
          console.error("Error saving flashcards");
        }
      } catch (error) {
        console.error("Error saving flashcards", error);
      }
    } else {
      alert("List name cannot be empty");
    }
  };

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!query) {
        return;
      }
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(
          `/api/flashcardContent?query=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        const parsedContent = JSON.parse(data.content);
        setFlashcards(parsedContent);
      } catch (error) {
        console.error("Failed to fetch flashcards:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchFlashcards();
  }, [query]);

  const handleFlip = (id) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      {isLoading ? (
        <div className="mt-4 text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p>Loading flashcards, please wait...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center flex-wrap gap-8">
            {flashcards.map((flashcard) => (
              <Flashcard
                key={flashcard.id}
                id={flashcard.id}
                title={flashcard.flashcard_front}
                definition={flashcard.flashcard_back}
                isFlipped={flippedCards[flashcard.id]}
                onFlip={handleFlip}
              />
            ))}
          </div>
          {flashcards.length !== 0 && (
            <button
              onClick={handleSaveFlashcards}
              className="btn btn-active btn-neutral save-flashcards-btn"
            >
              Save Flashcards
            </button>
          )}
        </>
      )}

      {isPromptVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>{" "}
          {/* Modal backdrop */}
          <div className="modal-box relative bg-white p-4 rounded shadow-lg z-10">
            <h3 className="font-bold text-lg">Enter List Name</h3>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="List Name"
              className="input input-bordered w-full mt-2"
            />
            <div className="modal-action">
              <button onClick={handleSave} className="btn btn-primary">
                Save
              </button>
              <button
                onClick={() => setIsPromptVisible(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
