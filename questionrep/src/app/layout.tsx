

import Link from "next/link";
import "./globals.css";
import React from "react";

export const metadata = {
  title: "MedUnity",
  description: "Institut de pathologie entre Paris et Lille",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <header className="navbar">
          <div className="logo">
            <img src="/logo4.png" alt="MedUnity logo" />
            <span>MedUnity</span>
          </div>
          <nav>
            <Link href="/Home">Home</Link>
            <Link href="/Our Activities" >Our Activities</Link>
            <Link href="/news">News</Link>
            <Link href="/stuff">Our Stuff</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/"className="active">Q/R</Link>
          </nav>
        </header>

        {children}

        <footer>
          © 2025 MedUnity — Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}