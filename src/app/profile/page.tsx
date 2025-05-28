'use client';

import { useUser } from '../../hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) return null;
  if (!user) return null;

  return (
    <div>
      <h1>Профіль</h1>
      <p><b>Email:</b> {user.email}</p>
      <button onClick={handleLogout}>Вийти</button>
    </div>
  );
}
