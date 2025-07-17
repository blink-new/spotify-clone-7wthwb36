/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { User, simpleHash, generateId } from '../utils/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}



export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('spotify_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('spotify_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('spotify_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('spotify_user');
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Get stored users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('spotify_users') || '[]');
      const hashedPassword = await simpleHash(password);
      
      // Find user with matching email and password
      const foundUser = storedUsers.find((u: any) => 
        u.email === email && u.passwordHash === hashedPassword
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create user object without password hash
      const userObj: User = {
        id: foundUser.id,
        email: foundUser.email,
        displayName: foundUser.displayName,
        avatarUrl: foundUser.avatarUrl,
        createdAt: foundUser.createdAt
      };
      
      setUser(userObj);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    
    try {
      // Get stored users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('spotify_users') || '[]');
      
      // Check if user already exists
      const existingUser = storedUsers.find((u: any) => u.email === email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Hash password
      const hashedPassword = await simpleHash(password);
      
      // Create new user
      const newUser = {
        id: generateId(),
        email,
        displayName,
        passwordHash: hashedPassword,
        createdAt: new Date().toISOString(),
        avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face`
      };
      
      // Save to localStorage
      storedUsers.push(newUser);
      localStorage.setItem('spotify_users', JSON.stringify(storedUsers));
      
      // Create user object without password hash
      const userObj: User = {
        id: newUser.id,
        email: newUser.email,
        displayName: newUser.displayName,
        avatarUrl: newUser.avatarUrl,
        createdAt: newUser.createdAt
      };
      
      setUser(userObj);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!user) {
      throw new Error('No user logged in');
    }
    
    setIsLoading(true);
    
    try {
      // Update user in localStorage
      const storedUsers = JSON.parse(localStorage.getItem('spotify_users') || '[]');
      const userIndex = storedUsers.findIndex((u: any) => u.id === user.id);
      
      if (userIndex !== -1) {
        storedUsers[userIndex] = { ...storedUsers[userIndex], ...updates };
        localStorage.setItem('spotify_users', JSON.stringify(storedUsers));
      }
      
      // Update current user state
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signUp,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};