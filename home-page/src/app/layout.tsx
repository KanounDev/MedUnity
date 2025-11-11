import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'MedUnity – Our Activities, Team & Contact',
  description: 'Meet our expert pathologists and our activities',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
