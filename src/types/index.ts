export type UserRole = 'admin' | 'support' | 'premium' | 'free';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  isAnonymous: boolean;
  createdAt: string;
  lastLogin: string;
  apiKeys: ApiKey[];
  plan: Plan;
  checkHistory: CheckHistory[];
}

export interface ApiKey {
  id: string;
  key: string;
  createdAt: string;
  expiresAt: string;
  active: boolean;
  usageCount: number;
  plan: 'test' | 'complete';
}

export interface Plan {
  id: string;
  name: 'free' | 'test' | 'complete';
  price: number;
  duration: number; // in hours
  startDate: string;
  endDate: string;
  active: boolean;
  features: string[];
}

export interface CheckHistory {
  id: string;
  checkerType: CheckerType;
  input: string;
  result: CheckResult;
  timestamp: string;
  ip: string;
}

export type CheckerType = 
  | 'amazon-1.0' 
  | 'amazon-2.0' 
  | 'vbv-1.0' 
  | 'vbv-2.0' 
  | 'returning' 
  | 'pre-auth' 
  | 'full-cc' 
  | 'adyen';

export interface CheckResult {
  status: 'success' | 'error' | 'pending';
  message: string;
  details?: Record<string, any>;
  responseTime?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
  forRoles: UserRole[];
}

export interface SystemStats {
  totalUsers: number;
  activeApiKeys: number;
  checksToday: number;
  successRate: number;
  recentChecks: CheckHistory[];
}