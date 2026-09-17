import { useMemo, useState } from 'react';
import { NavLink } from 'react-router';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, PanelLeft, PanelLeftClose, PanelLeftOpen, User, LogOut, House, Users, Calculator, FileText, BookOpen } from 'lucide-react';
import { useUiStore } from '@/stores/use-ui-store';
import { useAuthStore } from '@/stores/use-auth-store';
import { api } from '@/lib/axios';
import { useNavigate } from 'react-router';
import { cn } from '@/lib/utils';

export function Sidebar() {
    const { isSidebarOpen, toggleSidebar } = useUiStore();
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [isMenuHovered, setIsMenuHovered] = useState(false);

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Server logout failed, proceeding with local cleanup', error);
        } finally {
            logout();
            navigate('/login', { replace: true });
        }
    };

    // Filter nav items based on user permissions
    const filteredNavItems = useMemo(() => {
        // Define all possible routes with their required permissions
        const allNavItems = [
            { name: 'Dashboard', path: '/', icon: LayoutDashboard }, // Accessible to all authenticated users
            { name: 'Booking Calendar', path: '/calendar', icon: Calendar, permissions: ['view:calendar', 'manage:calendar'] },
            { name: 'Booking Portal', path: '/booking', icon: BookOpen, permissions: ['manage:bookings'] },
            { name: 'Guest Management', path: '/guests', icon: User, permissions: ['manage:guests'] },
            { name: 'Unit Management', path: '/units', icon: House, permissions: ['manage:units'] },
            { name: 'Financial Ledger', path: '/ledger', icon: Calculator, permissions: ['view:financials', 'manage:financials'] },
            { name: 'Financial Reports', path: '/reports', icon: FileText, permissions: ['view:financials', 'manage:financials'] },
            { name: 'User Management', path: '/users', icon: Users, permissions: ['manage:users'] }
        ];

        if (!user) return [];

        const isSuperAdmin = user.roles.includes('Superadmin');

        return allNavItems.filter((item) => {
            console.log(user)
            if (isSuperAdmin) return true;
            
            if (!item.permissions || item.permissions.length === 0) return true;
            
            return item.permissions.some((permission) => user.permissions.includes(permission));
        });
    }, [user]);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isSidebarOpen ? 240 : 72 }}
            className="flex flex-col bg-neutral-800 border-r border-gray-200 h-screen sticky top-0"
        >
            <div className="flex pt-4 pl-4 pr-2 items-center">
                <button 
                    onClick={toggleSidebar}
                    disabled={isSidebarOpen}
                    onMouseEnter={() => setIsLogoHovered(true)}
                    onMouseLeave={() => setIsLogoHovered(false)}
                >
                    {isLogoHovered && !isSidebarOpen ? (
                        <div className={`center flex items-center justify-center size-8 min-w-8 object-cover rounded-lg mt-2 shrink-0 hover:bg-white/10 ${isSidebarOpen ? '' : 'ml-[2px]'}`}>
                            <PanelLeftOpen className='size-4.5 text-emerald-200/70'/>
                        </div>
                    ) : (
                        <img 
                            src="/km-logo.png" 
                            className={`size-8 min-w-8 object-cover mt-2 rounded-lg shrink-0 ${isSidebarOpen ? '' : 'ml-[2px]'}`}
                            alt="KatriuM Logo"
                        />
                    )}
                </button>
                {isSidebarOpen && 
                    <>
                        <div className="flex flex-col overflow-hidden whitespace-nowrap">
                            <span className="text-neutral-200 font-medium text-md ml-2">KM Staycations</span>
                            <span className="text-emerald-100/70 font-medium text-[10px] tracking-wider ml-2">K-ATRIUM</span>
                        </div>
                        
                        <button 
                            onClick={toggleSidebar}
                            onMouseEnter={() => setIsMenuHovered(true)}
                            onMouseLeave={() => setIsMenuHovered(false)}
                            className="ml-auto p-1.5 mr-0.5 rounded-md shrink-0 hover:bg-white/10" 
                        >
                        {isMenuHovered ? (
                            <PanelLeftClose className="size-4.5 text-emerald-200/70" />
                        ) : (
                            <PanelLeft className="size-4.5 text-emerald-200/70" />
                        )}
                        </button>
                    </>
                }
            </div>

            <nav className="flex-1 mt-3.5 px-3 py-4 space-y-1">
                {filteredNavItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium overflow-hidden",
                                isActive ? "bg-[#e36f3c] text-white" : "text-[#bfd6cd] hover:bg-white/10"
                            )
                        }
                    >
                        <div className="p-1"><item.icon className="size-3.5 shrink-0" /></div>
                        {isSidebarOpen && <span className="text-[13px] whitespace-nowrap">{item.name}</span>}
                    </NavLink> 
                ))}
            </nav>

            {isSidebarOpen ? (
                <div className="mx-3 my-4 pt-2 text-emerald-200/70 border-t border-gray-700 overflow-hidden">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-[#bfd6cd] whitespace-nowrap">
                        {user?.avatar ? (
                            <img 
                                src={user.avatar} 
                                alt="Profile" 
                                className="size-8 min-w-8 object-cover rounded-full shrink-0" 
                            />
                        ) : (
                            <div className="size-8 min-w-8 rounded-full bg-neutral-700 flex items-center justify-center shrink-0">
                                <User className="size-3.5 shrink-0" />
                            </div>
                        )}
                        <div className="flex flex-col gap-1 overflow-hidden">
                            <h2 className="text-xs font-medium text-white truncate">{user?.name}</h2>
                            <span className="text-[#bfd6cd] text-[10px] font-light truncate">{user?.email}</span>
                        </div>
                    </div>

                    <button onClick={handleLogout} className="flex w-full items-center mt-2 gap-3 px-3 py-2 rounded-md transition-colors font-medium text-[#bfd6cd] hover:bg-white/10 whitespace-nowrap">
                        <LogOut className="size-3.5 shrink-0" />
                        <span className="text-xs">Sign Out</span>
                    </button>
                </div>
                ) : (
                <div className="flex pl-4.5 pb-4 rounded-md transition-colors font-medium text-[#bfd6cd] whitespace-nowrap">
                    {user?.avatar ? (
                        <img 
                            src={user.avatar} 
                            alt="Profile" 
                            className="size-8 min-w-8 object-cover rounded-full shrink-0" 
                        />
                    ) : (
                        <div className="size-8 min-w-8 rounded-full bg-neutral-700 flex items-center justify-center shrink-0">
                            <User className="size-3.5 shrink-0" />
                        </div>
                    )}
                </div>
                )
            }
        </motion.aside>
    );
}