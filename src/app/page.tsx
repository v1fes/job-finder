import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

export default async function HomePage() {
  const { data: jobs } = await supabase.from('jobs').select('*');

  return (
    <div>
      <header>
        <h1>Job Finder</h1>
        <nav>
          <Link href="/login">Увійти</Link>{" "}
          <Link href="/register">Реєстрація</Link>{" "}
          <Link href="/profile">Профіль</Link>
        </nav>
      </header>

      <section style={{ marginTop: 20 }}>
        <h2>Про сайт</h2>
        <p>
          Job Finder — це демо-портал для пошуку роботи в Україні. Тут ви можете переглядати вакансії, а також увійти чи зареєструватись для доступу до персонального кабінету.
        </p>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Всі вакансії</h2>
        {!jobs || jobs.length === 0 ? (
          <p>Наразі немає вакансій</p>
        ) : (
          <ul>
            {jobs.map((job: any) => (
              <li key={job.id}>
                <Link href={`/job/${job.id}`}>{job.title}</Link>
                {job.company ? ` (${job.company})` : ''}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
