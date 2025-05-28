'use client';

import { useState, useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage('Помилка: ' + error.message);
    } else {
      setMessage('Вхід успішний!');
    }
  };

  if (loading) return null;

  return (
    <div>
      <h1>Вхід</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Введіть email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Увійти</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
