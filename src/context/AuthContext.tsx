'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string; userId?: string }>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('kidkraze-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('kidkraze-user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const usersStr = localStorage.getItem('kidkraze-users') || '{}';
    const users: Record<string, { user: User; password: string }> = JSON.parse(usersStr);

    const found = Object.values(users).find(u => u.user.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, error: 'No account found with this email' };
    }

    if (found.password !== password) {
      return { success: false, error: 'Incorrect password' };
    }

    setUser(found.user);
    localStorage.setItem('kidkraze-user', JSON.stringify(found.user));
    return { success: true };
  }, []);

  const signUp = useCallback(async (name: string, email: string, phone: string, password: string) => {
    const usersStr = localStorage.getItem('kidkraze-users') || '{}';
    const users: Record<string, { user: User; password: string }> = JSON.parse(usersStr);

    const existing = Object.values(users).find(u => u.user.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: 'An account with this email already exists' };
    }

    const newUser: User = {
      id: `U${Date.now()}`,
      name,
      email,
      phone,
    };

    users[newUser.id] = { user: newUser, password };
    localStorage.setItem('kidkraze-users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('kidkraze-user', JSON.stringify(newUser));
    return { success: true, userId: newUser.id };
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('kidkraze-user');
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('kidkraze-user', JSON.stringify(updated));

    const usersStr = localStorage.getItem('kidkraze-users') || '{}';
    const users: Record<string, { user: User; password: string }> = JSON.parse(usersStr);
    if (users[user.id]) {
      users[user.id].user = updated;
      localStorage.setItem('kidkraze-users', JSON.stringify(users));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
