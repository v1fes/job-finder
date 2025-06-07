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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md border border-blue-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Вхід до Job Finder</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Введіть email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition"
          >
            Увійти
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )}
        <div className="mt-6 text-center">
          <span className="text-gray-500">Немає акаунта?</span>
          <button
            onClick={() => router.push('/register')}
            className="ml-2 text-blue-600 hover:underline font-medium"
            type="button"
          >
            Зареєструватися
          </button>
        </div>
      </div>
    </div>
  );
}
