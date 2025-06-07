'use client';

import { useState, useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    setMessage('');
    setError('');
    setSuccess(false);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }
    setSuccess(true);
    setMessage(
      'Якщо цей email ще не зареєстровано — вам надіслано лист для підтвердження. Якщо акаунт вже існує та підтверджений — спробуйте увійти або скористайтесь відновленням пароля.'
    );
  };

  if (loading) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-blue-900 text-center">Реєстрація</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Введіть email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-400 focus:outline-none transition"
            disabled={success}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-400 focus:outline-none transition"
            disabled={success}
          />
          <button
            type="submit"
            className={`bg-blue-600 text-white py-2 rounded-xl font-semibold transition hover:bg-blue-700 disabled:opacity-50`}
            disabled={success}
          >
            Зареєструватись
          </button>
        </form>
        {error && (
          <div className="mt-4 text-center text-red-600 font-medium">{error}</div>
        )}
        {message && (
          <div className="mt-4 text-center text-green-700 font-medium">{message}</div>
        )}
        {success && (
          <button
            className="mt-6 w-full bg-green-600 text-white py-2 rounded-xl font-semibold transition hover:bg-green-700"
            onClick={() => router.push('/login')}
          >
            Перейти до входу
          </button>
        )}
      </div>
    </div>
  );
}
