"use client";
import React from 'react';
import { useToast } from './ToastContext';
import Toast from './Toast';

const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast toast-end z-50 fixed top-4 right-4 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="animate-slide-in"
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          <Toast toast={toast} />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer; 