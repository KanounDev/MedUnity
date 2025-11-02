"use client"; // Cette ligne marque ce fichier comme un Client Component

import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        

        {/* En-tête principal */}
        <div className="container">
          <header className="header">
            <h1>MedUnity - Doctor Space</h1>
          </header>
          <main>{children}</main>
        </div>
        
        <footer>
          © 2025 MedUnity — Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}

