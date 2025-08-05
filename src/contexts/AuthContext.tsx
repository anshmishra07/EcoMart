import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, BiometricProfile } from '../types';

interface AuthContextType {
  user: User | null;
  login: (biometricData: BiometricProfile) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const authStatus = localStorage.getItem('biometric_auth');
    
    if (savedUser && authStatus === 'authenticated') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (biometricData: BiometricProfile) => {
    // Simulate biometric verification
    const mockUser: User = {
      id: '1',
      name: 'Eco Warrior',
      email: 'eco@example.com',
      ecoScore: 85,
      totalCarbonSaved: 127.5,
      rewardPoints: 2350,
      biometricProfile: biometricData,
      preferences: {
        sustainabilityPriority: 'high',
        categories: ['electronics', 'clothing', 'home'],
        budgetRange: { min: 0, max: 1000 },
        ecoFeatures: ['recyclable', 'organic', 'renewable']
      }
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('biometric_auth', 'authenticated');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('biometric_auth');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateProfile,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;