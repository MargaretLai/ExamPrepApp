"use client";
import React, { useState } from "react";
import UserInput from "../components/UserInput";
import FlashcardList from "../components/FlashcardList";

export default function Page() {
  const [query, setQuery] = useState("");

  const handleGenerateFlashcards = (input) => {
    setQuery(input);
  };

  return (
    <>
      <UserInput onGenerateFlashcards={handleGenerateFlashcards} />
      <FlashcardList query={query}/>
    </>
  );
}
