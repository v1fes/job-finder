'use client';
import { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import JobList from '../components/JobList';

export default function ClientJobSection({ jobs }: { jobs: any[] }) {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  // Автоматично формуємо унікальні локації з бази
  const locations = useMemo(
    () =>
      Array.from(
        new Set(jobs.map(job => job.location).filter(Boolean))
      ),
    [jobs]
  );

  const filtered = jobs.filter(job =>
    (job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.toLowerCase().includes(search.toLowerCase())) &&
    (!location || job.location === location)
  );

  return (
    <>
      <SearchBar
        onSearch={setSearch}
        onLocationFilter={setLocation}
        locations={locations}
      />
      <JobList jobs={filtered} />
    </>
  );
}
