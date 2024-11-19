import React, { useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../context/Notificationcontext';

export const NotificationBell = () => {
  const { 
    notifications, 
    isDropdownOpen, 
    handleNotificationClick,
    setIsDropdownOpen 
  } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [setIsDropdownOpen]);

  return (
    <div className="relative notification-container">
      <button
        onClick={handleNotificationClick}
        className="p-2 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors duration-200 transform hover:scale-105 relative"
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {notifications.length > 0 ? (
            <ul className="p-2">
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="p-2 text-sm text-gray-700 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                >
                  {notification}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-500">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
};