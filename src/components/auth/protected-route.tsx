import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/stores/use-auth-store';

export function ProtectedRoute({ requiredPermissions }: { requiredPermissions?: string[] }) {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    const isSuperAdmin = user.roles.includes('Superadmin');

    if (!isSuperAdmin && requiredPermissions && requiredPermissions.length > 0) {
        const hasRequiredPermission = requiredPermissions.some((permission) => 
            user.permissions.includes(permission)
        );
        
        if (!hasRequiredPermission) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <Outlet />;
}