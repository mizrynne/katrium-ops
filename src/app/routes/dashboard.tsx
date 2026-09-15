import { useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/stores/use-auth-store';

export default function Home() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Server logout failed, proceeding with local cleanup', error);
        } finally {
            logout();
            navigate('/login', { replace: true });
        }
    };

    return (
        <div className="mx-auto max-w-3xl p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, {user?.name}</p>
                </div>
                <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 disabled:opacity-50"
                >
                    {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    {user?.avatar && (
                        <img src={user.avatar} alt="Profile" className="h-16 w-16 rounded-full" />
                    )}
                        <h2 className="text-lg font-semibold text-gray-900">{user?.email}</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 text-sm">
                    <div>
                        <span className="block font-medium text-gray-500 mb-1">Role</span>
                        <p className="text-gray-900">{user?.roles.join(', ') || 'None'}</p>
                    </div>
                    <div>
                        <span className="block font-medium text-gray-500 mb-1">Permissions</span>
                        <p className="text-gray-900">{user?.permissions.join(', ') || 'None'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}