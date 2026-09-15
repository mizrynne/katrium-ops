import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/stores/use-auth-store';

export function ProtectedRoute({ allowedRoles }: { allowedRoles?: string[] }) {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const hasRequiredRole = allowedRoles.some((role) => user.roles.includes(role));
        if (!hasRequiredRole) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <Outlet />;
}