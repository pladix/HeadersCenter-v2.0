import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ApiKey } from '../types';
import { useAuth } from './AuthContext';

interface ApiKeyContextType {
  generateApiKey: (plan: 'test' | 'complete', durationHours: number) => Promise<ApiKey>;
  revokeApiKey: (keyId: string) => Promise<void>;
  isGenerating: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { currentUser, updateUserRole } = useAuth();

  const generateApiKey = async (plan: 'test' | 'complete', durationHours: number): Promise<ApiKey> => {
    if (!currentUser) {
      throw new Error('You must be logged in to generate an API key');
    }

    try {
      setIsGenerating(true);
      
      // Generate a new API key
      const newKey: ApiKey = {
        id: uuidv4(),
        key: `hc2_${uuidv4().replace(/-/g, '')}`,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + durationHours * 60 * 60 * 1000).toISOString(),
        active: true,
        usageCount: 0,
        plan
      };
      
      // For demo purposes, we'll just return the key without storing it
      // In a real app, this would be stored in Firestore
      
      return newKey;
    } catch (error) {
      console.error('API key generation error:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const revokeApiKey = async (keyId: string): Promise<void> => {
    if (!currentUser) {
      throw new Error('You must be logged in to revoke an API key');
    }

    try {
      // For demo purposes, just log the action
      console.log(`Revoking API key: ${keyId}`);
    } catch (error) {
      console.error('API key revocation error:', error);
      throw error;
    }
  };

  return (
    <ApiKeyContext.Provider value={{ generateApiKey, revokeApiKey, isGenerating }}>
      {children}
    </ApiKeyContext.Provider>
  );
};