import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  return (
    <div
      id="app-toast"
      className={`toast fixed bottom-6 right-6 z-[90] max-w-sm rounded-none border-2 border-on-surface bg-white p-4 shadow-black ${
        toast.visible ? 'show' : ''
      } ${toast.type === 'error' ? 'text-error' : 'text-primary'}`}
      role="status"
      aria-live="polite"
    >
      {toast.message}
    </div>
  );
};
