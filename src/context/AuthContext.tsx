import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  signInAnonymously,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User, UserRole, CheckHistory } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInAnon: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserRole: (uid: string, role: UserRole) => Promise<void>;
  addCheckToHistory: (check: CheckHistory) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data for demo purposes
const createMockUser = (firebaseUser: FirebaseUser): User => {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || `User_${firebaseUser.uid.substring(0, 5)}`,
    role: firebaseUser.isAnonymous ? 'free' : 'premium',
    isAnonymous: firebaseUser.isAnonymous,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    apiKeys: [],
    plan: {
      id: uuidv4(),
      name: firebaseUser.isAnonymous ? 'free' : 'complete',
      price: firebaseUser.isAnonymous ? 0 : 105,
      duration: firebaseUser.isAnonymous ? 24 : 720, // 1 day for free, 30 days for premium
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + (firebaseUser.isAnonymous ? 24 : 720) * 60 * 60 * 1000).toISOString(),
      active: true,
      features: firebaseUser.isAnonymous 
        ? ['Limited access to checkers', 'Basic dashboard'] 
        : ['Full access to all checkers', 'API rental', 'Priority support', 'Advanced dashboard']
    },
    checkHistory: []
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to add a check to the user's history
  const addCheckToHistory = (check: CheckHistory) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        checkHistory: [check, ...currentUser.checkHistory]
      };
      setCurrentUser(updatedUser);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Create a mock user instead of trying to access Firestore
          const mockUser = createMockUser(firebaseUser);
          setCurrentUser(mockUser);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Auth state change error:', err);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      // The user will be created in the onAuthStateChanged listener
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      throw err;
    }
  };

  const signInAnon = async () => {
    try {
      setError(null);
      await signInAnonymously(auth);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in anonymously');
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log out');
      throw err;
    }
  };

  const updateUserRole = async (uid: string, role: UserRole) => {
    try {
      // For demo purposes, just update the local state
      if (currentUser && currentUser.uid === uid) {
        setCurrentUser({ ...currentUser, role });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user role');
      throw err;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    signUp,
    signIn,
    signInAnon,
    logout,
    updateUserRole,
    addCheckToHistory
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};