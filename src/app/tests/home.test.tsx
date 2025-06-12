import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import HomePage from '../page';


// Мокаємо supabase
vi.mock('../../lib/supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: vi.fn().mockResolvedValue({ data: [] }),
    }),
  },
}));

// Мокаємо next/navigation!
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

test('renders heading', async () => {
  const component = await HomePage();
  render(component);
  expect(
    screen.getByRole('heading', { name: /роботу/i })
  ).toBeInTheDocument();
});
