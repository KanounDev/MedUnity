// src/app/ClientLayout.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToastProvider from '@/components/ToastProvider';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';

// Create QueryClient once
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar =
    pathname === '/PatientAuthentification' ||
    pathname === '/DoctorAuthentification' ||
    pathname === '/Administrator' ||
    pathname === '/DoctorSpace' ||
    pathname === '/PatientSpace' ||
    pathname === '/Administrator/ExamAssignment' ||
    pathname === '/DoctorProfile' ||
    pathname === '/PatientProfile' ||
    pathname === '/Administrator/ContactMessages';

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider />
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}