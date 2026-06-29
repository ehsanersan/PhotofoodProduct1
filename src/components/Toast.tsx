import React, { useEffect, useState } from 'react';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  messages: ToastMessage[];
  onRemove: (id: string) => void;
}

const iconMap = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
};

const bgMap = {
  success: 'rgba(52, 199, 89, 0.12)',
  error: 'rgba(255, 59, 48, 0.12)',
  info: 'rgba(175, 82, 222, 0.12)',
};

const ToastItem: React.FC<{ msg: ToastMessage; onRemove: () => void }> = ({ msg, onRemove }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onRemove, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div
      className={`
        glass-card px-4 py-3 flex items-center gap-3 shadow-xl
        ${exiting ? 'toast-exit' : 'toast-enter'}
      `}
      style={{ background: bgMap[msg.type] }}
    >
      <span className="text-lg">{iconMap[msg.type]}</span>
      <p className="text-sm text-gray-800 font-medium">{msg.text}</p>
    </div>
  );
};

export const Toast: React.FC<ToastProps> = ({ messages, onRemove }) => {
  if (messages.length === 0) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[90%] max-w-sm">
      {messages.map((msg) => (
        <ToastItem key={msg.id} msg={msg} onRemove={() => onRemove(msg.id)} />
      ))}
    </div>
  );
};
