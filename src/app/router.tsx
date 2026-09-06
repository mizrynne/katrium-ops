import { createBrowserRouter, Outlet } from 'react-router';
import Login from './routes/login';

const RootLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: 'login',
                element: <Login />,
            }
        ]
    }
]);