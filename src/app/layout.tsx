import { Outlet, useMatches } from 'react-router';
import { Sidebar } from '@/components/sidebar';

interface RouteHandle {
    title?: string;
}

export function AppLayout() {
    const matches = useMatches();
    const matchWithTitle = matches
        .filter((match) => (match.handle as RouteHandle)?.title)
        .pop();
        
    const pageTitle = (matchWithTitle?.handle as RouteHandle)?.title || 'Executive Workspace';

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-slate-900">
            <Sidebar />
            <main className="flex flex-1 flex-col relative min-w-0">
                <header className="flex shrink-0 w-full h-17 bg-[#fbf8f2] items-center px-6 shadow-sm">
                    <h2 className="font-semibold text-[1.3rem]">{pageTitle}</h2>
                </header>
                <div className="flex-1 bg-neutral-100 p-6 overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}