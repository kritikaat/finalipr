import React, { createContext, useState, useContext } from 'react';

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const addNotification = (message) => {
    setNotifications((prev) => [...prev, message]);
  };

  const handleNotificationClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const value = {
    notifications,
    addNotification,
    isDropdownOpen,
    handleNotificationClick,
    setIsDropdownOpen
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined || context === null) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};