import Header from '../components/Header';
import Hero from '../components/Hero';
import ClientJobSection from './ClientJobSection';
import { supabase } from '../../lib/supabaseClient';


export default async function HomePage() {
  // SSR: отримуємо вакансії на сервері
  const { data: jobs } = await supabase.from('jobs').select('*');

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4">
        <Hero />
        <ClientJobSection jobs={jobs || []} />
      </main>
    </>
  );
}
