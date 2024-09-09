"use client";
import React from "react";

export default function Flashcard({
  id,
  title,
  definition,
  isFlipped,
  onFlip,
}) {
  return (
    <div
      className={`card bg-base-100 w-96 shadow-xl ${
        isFlipped ? "flipped" : ""
      }`}
    >
      <div className="card-body">
        {isFlipped ? (
          <div>
            <h1 className="card-title">Definition</h1>
            <p>{definition}</p>
          </div>
        ) : (
          <h1 className="card-title">{title}</h1>
        )}
        <div className="card-actions justify-end">
          <button className="btn btn-accent" onClick={() => onFlip(id)}>
            Flip
          </button>
        </div>
      </div>
    </div>
  );
}
