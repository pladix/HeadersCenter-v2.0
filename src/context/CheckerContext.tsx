import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CheckerType, CheckHistory, CheckResult } from '../types';
import { useAuth } from './AuthContext';

interface CheckerContextType {
  performCheck: (type: CheckerType, input: string) => Promise<CheckResult>;
  isChecking: boolean;
  lastResult: CheckResult | null;
}

const CheckerContext = createContext<CheckerContextType | undefined>(undefined);

export const useChecker = () => {
  const context = useContext(CheckerContext);
  if (context === undefined) {
    throw new Error('useChecker must be used within a CheckerProvider');
  }
  return context;
};

// Mock function to simulate checker API calls
const mockCheckerApi = async (type: CheckerType, input: string): Promise<CheckResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Randomly determine success or failure (70% success rate for demo)
  const isSuccess = Math.random() > 0.3;
  
  if (isSuccess) {
    return {
      status: 'success',
      message: '✅ Card verified successfully!',
      details: {
        cardType: 'Visa',
        bank: 'Example Bank',
        country: 'US',
        isLive: true
      },
      responseTime: Math.floor(Math.random() * 1000) + 500
    };
  } else {
    return {
      status: 'error',
      message: '❌ Verification failed',
      details: {
        reason: 'Insufficient funds',
        attemptCount: 1
      },
      responseTime: Math.floor(Math.random() * 1000) + 500
    };
  }
};

export const CheckerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [lastResult, setLastResult] = useState<CheckResult | null>(null);
  const { currentUser, addCheckToHistory } = useAuth();

  const performCheck = async (type: CheckerType, input: string): Promise<CheckResult> => {
    if (!currentUser) {
      return {
        status: 'error',
        message: 'You must be logged in to use checkers'
      };
    }

    try {
      setIsChecking(true);
      
      // Call the checker API (mock for now)
      const result = await mockCheckerApi(type, input);
      setLastResult(result);
      
      // Record the check in history
      if (currentUser) {
        const checkRecord: CheckHistory = {
          id: uuidv4(),
          checkerType: type,
          input,
          result,
          timestamp: new Date().toISOString(),
          ip: '127.0.0.1' // In a real app, this would be the actual IP
        };
        
        // Add to local state instead of Firestore
        addCheckToHistory(checkRecord);
      }
      
      return result;
    } catch (error) {
      console.error('Checker error:', error);
      const errorResult: CheckResult = {
        status: 'error',
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      };
      setLastResult(errorResult);
      return errorResult;
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <CheckerContext.Provider value={{ performCheck, isChecking, lastResult }}>
      {children}
    </CheckerContext.Provider>
  );
};