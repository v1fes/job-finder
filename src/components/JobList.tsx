import JobCard from './JobCard';

type Job = {
  id: string;
  title: string;
  location?: string;
  company?: string;
  
};

export default function JobList({ jobs }: { jobs: Job[] }) {
  if (!jobs || jobs.length === 0) {
    return <p className="text-gray-400 mt-4">Наразі немає вакансій</p>;
  }

  return (
    <div className="grid gap-4 mt-6 md:grid-cols-2">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
