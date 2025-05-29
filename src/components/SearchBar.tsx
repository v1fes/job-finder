'use client';
import { useState } from 'react';

export default function SearchBar({
  onSearch,
  onLocationFilter,
  locations = [],
}: {
  onSearch: (query: string) => void;
  onLocationFilter: (location: string) => void;
  locations?: string[];
}) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  return (
    <form
      className="flex flex-wrap gap-2 items-center justify-center mb-8"
      onSubmit={e => {
        e.preventDefault();
        onSearch(query.trim());
        onLocationFilter(location);
      }}
    >
      <input
        type="text"
        placeholder="Пошук вакансій..."
        className="border rounded px-4 py-2 w-64"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <select
        className="border rounded px-4 py-2"
        value={location}
        onChange={e => {
          setLocation(e.target.value);
          onLocationFilter(e.target.value);
        }}
      >
        <option value="">Всі локації</option>
        {locations.map(loc => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Знайти
      </button>
    </form>
  );
}
