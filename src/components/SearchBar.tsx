'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

type Props = {
  onSearch: (query: string) => void;
  onLocationFilter: (location: string) => void;
  locations?: string[];
};

export default function SearchBar({
  onSearch,
  onLocationFilter,
  locations = [],
}: Props) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  // Скидання пошуку та фільтра
  const handleReset = () => {
    setQuery('');
    setLocation('');
    onSearch('');
    onLocationFilter('');
  };

  return (
    <form
      className="flex flex-wrap gap-3 items-center justify-center mb-8 p-4 bg-white/80 rounded-xl shadow"
      onSubmit={e => {
        e.preventDefault();
        onSearch(query.trim());
        onLocationFilter(location);
      }}
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Пошук вакансій..."
          className="border rounded-full px-5 py-2 pl-10 w-64 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {/* Іконка лупи */}
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
      </div>
      <select
        className="border rounded-full px-4 py-2 min-w-[150px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
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
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-semibold shadow"
      >
        Знайти
      </button>
      {(query || location) && (
        <button
          type="button"
          className="ml-2 text-gray-500 hover:text-blue-600 underline text-sm"
          onClick={handleReset}
        >
          Скинути
        </button>
      )}
    </form>
  );
}
