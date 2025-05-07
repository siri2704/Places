"use client";

import React, { useState } from "react";

export default function ConversationGenerator() {
  const [topic, setTopic] = useState("");
  const [backgroundInfo, setBackgroundInfo] = useState("");
  const [conversationType, setConversationType] = useState("dyadic");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate-conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, backgroundInfo, conversationType }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to generate conversation");
      } else {
        setResult(data.conversation);
      }
    } catch (err) {
      setError("An error occurred while generating conversation");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Generate Conversation</h2>

      <label className="block mb-2">
        Topic:
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border rounded px-2 py-1"
          placeholder="Enter topic"
        />
      </label>

      <label className="block mb-2">
        Background Info:
        <textarea
          value={backgroundInfo}
          onChange={(e) => setBackgroundInfo(e.target.value)}
          className="w-full border rounded px-2 py-1"
          placeholder="Enter background information"
          rows={4}
        />
      </label>

      <label className="block mb-4">
        Conversation Type:
        <select
          value={conversationType}
          onChange={(e) => setConversationType(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="dyadic">Dyadic</option>
          <option value="triadic">Triadic</option>
        </select>
      </label>

      <button
        onClick={handleGenerate}
        disabled={loading || !topic || !backgroundInfo}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Conversation"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="mt-4 p-4 border rounded whitespace-pre-wrap bg-gray-50">
          {result}
        </div>
      )}
    </div>
  );
}
