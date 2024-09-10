"use client";
import React, { useState } from "react";

export default function QuizGenerator() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  const generateQuestions = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/generateQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      setQuestions(data.questions);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateQuestions();
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">AI Quiz Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter a topic or text"
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Generating..." : "Generate Quiz Questions"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {questions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Generated Questions:</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <ul className="space-y-4">
              {questions.map((question, index) => (
                <li key={index} className="border-b pb-2 last:border-b-0">
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
