import './globals.css';
import Header from '@/components/Header';
import ToastProvider from '@/components/ToastProvider';

export const metadata = {
  title: 'MedUnity – Admin',
  description: 'Admin dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <ToastProvider />
        <Header />
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}