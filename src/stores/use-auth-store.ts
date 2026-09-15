import { create } from 'zustand';

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    roles: string[];
    permissions: string[];
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('katrium_token'),
    isAuthenticated: !!localStorage.getItem('katrium_token'),

    login: (user, token) => {
        localStorage.setItem('katrium_token', token);
        set({ user, token, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('katrium_token');
        set({ user: null, token: null, isAuthenticated: false });
    },

    setUser: (user) => set({ user }),
}));