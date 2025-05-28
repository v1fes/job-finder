'use client';
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import getJobs from './getJobs';

export default function HomePage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getJobs().then(data => {
        setJobs(data || []);
        setJobsLoading(false);
      });
    }
  }, [user]);

  if (loading || (!user && !loading)) return null;
  if (jobsLoading) return <div>Завантаження...</div>;

  return (
    <div>
      <h1>Список вакансій</h1>
      <ul>
        {jobs.length === 0 && <li>Немає вакансій</li>}
        {jobs.map((job: any) => (
          <li key={job.id}>{job.title} — {job.location}</li>
        ))}
      </ul>
    </div>
  );
}
