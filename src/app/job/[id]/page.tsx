import Link from 'next/link';
import { supabase } from '../../../../lib/supabaseClient';

// Можна підключити іконки з Lucide, Heroicons, або використовувати Emoji

type Job = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  company?: string;
  salary?: number;
  logo_url?: string;
  recruiter_email?: string;
  recruiter_phone?: string;
  company_description?: string;
  created_at?: string;
  requirements?: string;
  benefits?: string;
  conditions?: string;
};

export const dynamic = "force-dynamic";

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
  const published = job.created_at
    ? new Date(job.created_at).toLocaleDateString('uk-UA')
    : null;

  // Додаємо розбивку для списків (розбиває по рядках, ігнорить порожні)
  const toList = (txt?: string) =>
    txt
      ? txt
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  return (
    <div className="max-w-2xl mx-auto my-12">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/80 border-b border-gray-100 backdrop-blur flex items-center gap-4 px-6 py-3 rounded-t-2xl shadow-sm">
        {job.logo_url ? (
          <img
            src={job.logo_url}
            alt={job.company || 'Логотип компанії'}
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 bg-white"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl text-blue-600 font-bold">
            {job.company ? job.company[0] : '🏢'}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-extrabold truncate">{job.title}</h1>
          {job.company && (
            <span className="text-blue-700 font-medium truncate">{job.company}</span>
          )}
        </div>
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          ← До списку
        </Link>
      </div>

      {/* Контент сторінки */}
      <div className="p-8 bg-white rounded-b-2xl shadow-md border border-gray-100">
        {/* Бейджі */}
        <div className="mb-6 flex flex-wrap gap-3 items-center">
          {published && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
              🗓 <span>Дата: {published}</span>
            </span>
          )}
          {job.location && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
              📍 <span>{job.location}</span>
            </span>
          )}
          {job.salary && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
              💸 <span>{job.salary} ₴</span>
            </span>
          )}
        </div>

        {/* Опис вакансії */}
        <div className="mb-7">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Опис вакансії</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description || 'Опис відсутній'}</p>
        </div>

        {/* Вимоги */}
        {toList(job.requirements).length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">Вимоги</h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              {toList(job.requirements).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Переваги */}
        {toList(job.benefits).length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-green-700">Переваги</h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              {toList(job.benefits).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">★</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Умови */}
        {toList(job.conditions).length > 0 && (
          <div className="mb-7">
            <h3 className="text-lg font-semibold mb-2 text-purple-700">Умови</h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              {toList(job.conditions).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Контакти рекрутера */}
        {(job.recruiter_email || job.recruiter_phone) && (
          <div className="mb-7 bg-blue-50 rounded-lg p-4 flex flex-col gap-1">
            <h3 className="text-lg font-semibold mb-2 text-blue-700">Контакти рекрутера</h3>
            {job.recruiter_email && (
              <div className="flex gap-2 items-center">
                <span className="font-bold">📧 Email:</span>
                <a href={`mailto:${job.recruiter_email}`} className="text-blue-600 underline break-all">
                  {job.recruiter_email}
                </a>
              </div>
            )}
            {job.recruiter_phone && (
              <div className="flex gap-2 items-center">
                <span className="font-bold">📞 Телефон:</span>
                <a href={`tel:${job.recruiter_phone}`} className="text-blue-600 underline break-all">
                  {job.recruiter_phone}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Про компанію */}
        {job.company_description && (
          <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Про компанію</h3>
            <p className="text-gray-700 whitespace-pre-line">{job.company_description}</p>
          </div>
        )}

        {/* Відгукнутись */}
        <button className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-2">
          <span>Відгукнутись на вакансію</span>
          <span>🚀</span>
        </button>
      </div>
    </div>
  );
}
