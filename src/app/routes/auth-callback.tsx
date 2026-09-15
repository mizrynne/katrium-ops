import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuthStore } from '@/stores/use-auth-store';
import { api } from '@/lib/axios';

export default function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchToken = async () => {
            try {
                const response = await api.get(`/auth/google/callback?${searchParams.toString()}`);
                const { user, token } = response.data;
                
                login(user, token);
                navigate('/', { replace: true });
            } catch (error: any) {
                console.error('OAuth Callback Error:', error.response?.data || error);
                navigate('/login?error=unauthorized', { replace: true });
            }
        };

        fetchToken();
    }, [searchParams, navigate, login]);

    return (
        <div />
    );
}