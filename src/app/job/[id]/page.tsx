import { supabase } from '../../../../lib/supabaseClient';

type Job = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  company?: string;
  salary?: number;
};

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  // Отримуємо вакансію по id
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    return <div>Вакансію не знайдено</div>;
  }

  const job: Job = data;

  return (
    <div>
      <h1>{job.title}</h1>
      {job.company && <p><b>Компанія:</b> {job.company}</p>}
      {job.location && <p><b>Локація:</b> {job.location}</p>}
      {job.salary && <p><b>Зарплата:</b> {job.salary}</p>}
      {job.description && <p><b>Опис:</b> {job.description}</p>}
    </div>
  );
}
