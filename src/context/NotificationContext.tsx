import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Notification, UserRole } from '../types';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Mock notifications for demo
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome to Headers Center 2.0',
    message: 'Thank you for joining our platform. Explore our checkers and API features.',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    forRoles: ['admin', 'premium', 'free']
  },
  {
    id: '2',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on June 25th from 2:00 AM to 4:00 AM UTC.',
    type: 'warning',
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    forRoles: ['admin', 'premium', 'free']
  },
  {
    id: '3',
    title: 'New Checker Added',
    message: 'Adyen Checker is now available for premium users.',
    type: 'info',
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    forRoles: ['premium']
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    // In a real app with proper permissions, you would query Firestore
    // const q = query(
    //   collection(db, 'notifications'),
    //   where('forRoles', 'array-contains-any', [currentUser.role, 'all']),
    //   orderBy('createdAt', 'desc')
    // );
    //
    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   const notificationList: Notification[] = [];
    //   snapshot.forEach((doc) => {
    //     notificationList.push({ id: doc.id, ...doc.data() } as Notification);
    //   });
    //   setNotifications(notificationList);
    // });
    //
    // return () => unsubscribe();

    // For demo purposes, filter mock notifications based on user role
    const filteredNotifications = mockNotifications.filter(
      notification => notification.forRoles.includes(currentUser.role)
    );
    setNotifications(filteredNotifications);
  }, [currentUser]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
    // In a real app, you would also update Firestore
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    // In a real app, you would also update Firestore
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};