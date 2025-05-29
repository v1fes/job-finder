import { supabase } from '../../../../lib/supabaseClient';

type Job = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  company?: string;
  salary?: number;
  logo_url?: string; // Якщо є у твоїй БД
};

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    return <div className="p-8 text-center text-red-500">Вакансію не знайдено</div>;
  }

  const job: Job = data;

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-md">
      {/* Логотип компанії */}
      <div className="flex items-center gap-4 mb-6">
        {job.logo_url ? (
          <img
            src={job.logo_url}
            alt={job.company || 'Логотип компанії'}
            className="w-16 h-16 rounded-full border bg-white object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-500">
            {job.company ? job.company[0] : '🏢'}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold mb-1">{job.title}</h1>
          {job.company && <div className="text-blue-800 font-medium">{job.company}</div>}
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-4">
        {job.location && (
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
            {job.location}
          </span>
        )}
        {job.salary && (
          <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
            {job.salary} ₴
          </span>
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Опис вакансії</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {job.description || 'Опис відсутній'}
        </p>
      </div>
      <button className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition">
        Відгукнутись на вакансію
      </button>
    </div>
  );
}
