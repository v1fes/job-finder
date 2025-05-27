import { supabase } from '../../lib/supabaseClient';

export default async function getJobs() {
  const { data, error } = await supabase.from('jobs').select('*');
  if (error) {
    // Можна кинути помилку або повернути пустий масив
    console.error('Помилка отримання jobs:', error.message);
    return [];
  }
  return data || [];
}
