'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function Header() {
  const { user, loading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="w-full px-4 py-3 bg-gray-900 text-white flex items-center justify-between shadow-md">
      <Link href="/" className="text-2xl font-bold hover:text-blue-300 transition">
        Job Finder
      </Link>
      <nav className="flex gap-4 items-center">
        <Link href="/" className="hover:text-blue-400 transition">Вакансії</Link>
        {!loading && !user && (
          <>
            <Link href="/login" className="hover:text-blue-400 transition">Увійти</Link>
            <Link href="/register" className="hover:text-blue-400 transition">Реєстрація</Link>
          </>
        )}
        {!loading && user && (
          <>
            <Link href="/profile" className="hover:text-blue-400 transition">Профіль</Link>
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1 bg-blue-700 hover:bg-blue-600 rounded transition"
            >
              Вийти
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
