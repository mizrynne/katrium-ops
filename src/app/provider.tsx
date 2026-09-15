import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import { queryClient } from '@/lib/query-client';
import { AuthInitializer } from '@/components/auth/auth-initializer';

export function AppProvider() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthInitializer>
                <RouterProvider router={router} />
            </AuthInitializer>
        </QueryClientProvider>
    );
}