import getJobs from './getJobs';

export default async function Home() {
  const jobs = await getJobs();

  return (
    <div>
      <h1>Список вакансій</h1>
      <ul>
        {jobs.length === 0 && <li>Немає вакансій</li>}
        {jobs.map((job: any) => (
          <li key={job.id}>
            {job.title} — {job.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
