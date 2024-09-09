import React from "react";
import { useState } from "react";

export default function UserInput({ onGenerateFlashcards }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onGenerateFlashcards(inputValue);
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <>
      <div role="alert" className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>
          Please allow up to 10s to load the flashcards. Do not refresh page or
          hit the button repeatedly.
        </span>
      </div>

      <label className="form-control w-full max-w-xs user-input">
        <div className="label">
          <span className="label-text">Enter subject/topic</span>
        </div>
        <input
          value={inputValue}
          onChange={handleChange}
          type="text"
          placeholder="Calculus/Integral/Series"
          className="input input-bordered input-accent w-full max-w-xs"
        />
        <button
          onClick={handleSubmit}
          className="btn btn-outline btn-accent user-input-button"
        >
          Generate Flashcards
        </button>
      </label>
    </>
  );
}
