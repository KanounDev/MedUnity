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

function ClientLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/PatientAuthentification' || pathname === '/DoctorAuthentification';

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider />
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayoutContent>{children}</ClientLayoutContent>;
}