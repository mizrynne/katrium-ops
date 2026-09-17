import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { AppLayout } from './layout';
import Login from './routes/login';
import AuthCallback from './routes/auth-callback';
import Dashboard from './routes/dashboard';
import BookingCalendar from './routes/booking-calendar';
import UnitManagement from './routes/unit-management';
import GuestManagement from './routes/guest-management';
import BookingPortal from './routes/booking-portal';
import FinancialLedger from './routes/financial-ledger';
import FinancialReports from './routes/financial-reports';
import UserManagement from './routes/user-management';
import { NotFound } from '@/components/feedback/not-found';
import { Unauthorized } from '@/components/feedback/unauthorized';

export const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/auth/callback', element: <AuthCallback /> },
    { path: '/unauthorized', element: <Unauthorized /> },
    { path: '*', element: <NotFound /> },
    {   
        path: '/',
        element: <ProtectedRoute />, 
        children: [
            {
                element: <AppLayout />,
                children: [
                    {
                        index: true, 
                        element: <Dashboard />,
                        handle: { title: "Dashboard" }
                    },
                    { 
                        path: 'calendar', 
                        element: <ProtectedRoute requiredPermissions={['view:calendar', 'manage:calendar']} />,
                        handle: { title: "Centralized Calendar" },
                        children: [{ index: true, element: <BookingCalendar /> }]
                    },
                    { 
                        path: 'units', 
                        element: <ProtectedRoute requiredPermissions={['manage:units']} />,
                        handle: { title: "Unit Management" },
                        children: [{ index: true, element: <UnitManagement /> }]
                    },
                    { 
                        path: 'guests', 
                        element: <ProtectedRoute requiredPermissions={['manage:guests']} />,
                        handle: { title: "Guest Management" },
                        children: [{ index: true, element: <GuestManagement /> }]
                    },
                    { 
                        path: 'booking', 
                        element: <ProtectedRoute requiredPermissions={['manage:bookings']} />,
                        handle: { title: "Booking Portal" },
                        children: [{ index: true, element: <BookingPortal /> }]
                    },
                    { 
                        path: 'ledger', 
                        element: <ProtectedRoute requiredPermissions={['view:financials', 'manage:financials']} />,
                        handle: { title: "Financial Ledger" },
                        children: [{ index: true, element: <FinancialLedger /> }]
                    },
                    { 
                        path: 'reports', 
                        element: <ProtectedRoute requiredPermissions={['view:financials', 'manage:financials']} />,
                        handle: { title: "Financial Reports" },
                        children: [{ index: true, element: <FinancialReports /> }]
                    },
                    { 
                        path: 'users', 
                        element: <ProtectedRoute requiredPermissions={['manage:users']} />,
                        handle: { title: "User Management" },
                        children: [{ index: true, element: <UserManagement /> }]
                    },
                ]
            }
        ]
    }
]);