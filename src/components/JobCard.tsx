import Link from 'next/link';

type Job = {
  id: string;
  title: string;
  location?: string;
  company?: string;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">
        <Link href={`/job/${job.id}`}>
          {job.title}
        </Link>
      </h3>
      {job.company && (
        <div className="text-blue-800 font-medium">{job.company}</div>
      )}
      {job.location && (
        <div className="text-gray-500">{job.location}</div>
      )}
    </div>
  );
}
