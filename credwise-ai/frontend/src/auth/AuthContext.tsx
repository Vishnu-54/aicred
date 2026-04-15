import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { api } from '../api';
import { AuthUser, LoginRequest, RegisterRequest } from '../types';

interface AuthContextValue {
  user: AuthUser | null;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'credwise:user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });

  const value = useMemo<AuthContextValue>(() => ({
    user,
    async login(payload) {
      const nextUser = await api.login(payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    },
    async register(payload) {
      const nextUser = await api.register(payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    },
    logout() {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    }
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
