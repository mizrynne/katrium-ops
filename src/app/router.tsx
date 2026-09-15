import { createBrowserRouter, Outlet } from 'react-router';
import { ProtectedRoute } from '@/components/auth/protected-route';
import Login from './routes/login';
import AuthCallback from './routes/auth-callback';
import Dashboard from './routes/dashboard';
import BookingCalendar from './routes/booking-calendar';

const RootLayout = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 p-6"><Outlet /></main>
    </div>
);

export const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/auth/callback', element: <AuthCallback /> },
    {   
        path: '/',
        element: <ProtectedRoute />, 
        children: [
            {
                element: <RootLayout />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { 
                        path: 'calendar', 
                        element: <ProtectedRoute allowedRoles={['Superadmin', 'Admin', 'Manager']} />,
                        children: [{ index: true, element: <BookingCalendar /> }]
                    }
                ]
            }
        ]
    }
]);