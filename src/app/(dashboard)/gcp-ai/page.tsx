'use client';

import { useState } from 'react';

export default function GcpAiPage() {
  const [prompt, setPrompt] = useState('Write a vegetarian lasagna recipe for 4 people.');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/gcp-vertex-ai/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error('Failed to fetch AI response');

      const data = await res.json();
      setResponse(data.text || JSON.stringify(data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 Gemini Prompt Interface</h1>

      <textarea
        className="w-full p-3 border rounded-md mb-4"
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {response && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50 whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">AI Response:</h2>
          {response}
        </div>
      )}
    </main>
  );
}
