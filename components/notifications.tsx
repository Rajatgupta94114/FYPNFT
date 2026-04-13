'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

const notificationIcons = {
  success: <CheckCircle className="w-5 h-5 text-green-400" />,
  error: <XCircle className="w-5 h-5 text-red-400" />,
  warning: <AlertCircle className="w-5 h-5 text-yellow-400" />,
  info: <Info className="w-5 h-5 text-blue-400" />,
};

export function Notifications() {
  const { notifications, removeNotification } = useStore();

  useEffect(() => {
    const timers = notifications.map((notification) => {
      return setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
    });

    return () => timers.forEach(clearTimeout);
  }, [notifications, removeNotification]);

  return (
    <div className="fixed top-6 right-6 z-50 space-y-3 max-w-md">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`glass rounded-lg p-4 flex items-start space-x-3 ${
              notification.type === 'success' && 'border-l-4 border-green-400'
            } ${notification.type === 'error' && 'border-l-4 border-red-400'} ${
              notification.type === 'warning' && 'border-l-4 border-yellow-400'
            } ${notification.type === 'info' && 'border-l-4 border-blue-400'}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {notificationIcons[notification.type]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
