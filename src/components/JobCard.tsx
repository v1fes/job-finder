import Link from 'next/link';

type Job = {
  id: string;
  title: string;
  location?: string;
  company?: string;
  logo_url?: string;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3 hover:scale-[1.03] hover:shadow-xl transition duration-200 border border-transparent hover:border-blue-200">
      <div className="flex items-center gap-3 mb-2">
        {/* Stub для логотипу */}
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl text-blue-600 font-bold">
          {job.company ? job.company[0] : "🏢"}
        </div>
        <div>
          <div className="text-blue-800 font-medium">{job.company}</div>
          {job.location && (
            <div className="text-gray-400 text-sm">{job.location}</div>
          )}
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">
        <Link href={`/job/${job.id}`} className="hover:underline">{job.title}</Link>
      </h3>
      <div className="mt-auto flex justify-end">
        <Link
          href={`/job/${job.id}`}
          className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          Детальніше
        </Link>
      </div>
    </div>
  );
}
