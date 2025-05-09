'use client';

import { useState, useEffect } from 'react';
import { searchItems } from '@/lib/search';

interface Suggestion {
  exercise_id?: number;
  exercise_name?: string;
  body_part?: string;
  // Add fields for 'food' as needed
}

interface SearchBarProps {
  type: 'exercise' | 'food';
}

export default function SearchBar({ type }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 1) {
        setLoading(true);
        searchItems(query, type)
          .then(setResults)
          .catch(err => setError(err.message))
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, type]);

  const handleSuggestionClick = (name: string) => {
    setQuery(name);
    setResults([]);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4 relative">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Search ${type}s...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <div className="text-sm text-gray-500 mt-1">Loading...</div>}
      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
      {results.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded-md shadow-md mt-1 w-full max-h-60 overflow-y-auto">
          {results.map((item) => (
            <li
              key={item.exercise_id || item.exercise_name}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSuggestionClick(item.exercise_name || '')}
            >
              {item.exercise_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
