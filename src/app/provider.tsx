import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import { queryClient } from '@/lib/query-client';

export function AppProvider() {
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  );
}