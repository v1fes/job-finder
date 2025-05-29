import React from 'react';

export default function Hero() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-white text-center rounded-xl shadow-sm mb-8">
      <h1 className="text-4xl font-extrabold mb-2 text-blue-900">
        Шукаєш <span className="text-blue-600">роботу</span> мрії?
      </h1>
      <p className="mb-6 text-lg text-gray-600">Ми допоможемо тобі це зробити!</p>
      <a href="#jobs" className="px-8 py-3 bg-blue-700 text-white text-lg rounded-full shadow hover:bg-blue-800 transition">
        Знайти роботу
      </a>
    </section>
  );
}
