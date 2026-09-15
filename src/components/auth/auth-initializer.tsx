import { useEffect, useState, type ReactNode } from 'react';
import { api } from '@/lib/axios';
import { useAuthStore, type User } from '@/stores/use-auth-store';

export function AuthInitializer({ children }: { children: ReactNode }) {
    const { token, setUser, logout } = useAuthStore();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            if (!token) {
                setIsInitializing(false);
                return;
            }

            try {
                const response = await api.get<User>('/auth/me');
                setUser(response.data);
            } catch {
                logout();
            } finally {
                setIsInitializing(false);
            }
        };

        restoreSession();
    }, [token, setUser, logout]);

    if (isInitializing) {
        return (
            <div />
        );
    }

    return <>{children}</>;
}