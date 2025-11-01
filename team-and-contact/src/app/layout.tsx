import './globals.css';
import Navbar from '@/components/Navbar';
import ToastProvider from '@/components/ToastProvider';

export const metadata = {
  title: 'MedUnity – Our Team & Contact',
  description: 'Meet our expert pathologists',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}