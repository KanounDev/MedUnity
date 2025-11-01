'use client';
import toast, { Toaster } from 'react-hot-toast';

export const notify = (msg: string, type: 'success' | 'error' = 'success') => {
  toast[type](msg, { duration: 3000 });
};

export default function ToastProvider() {
  return <Toaster position="top-right" />;
}