import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'JH Crypto Analytics // Institutional Cryptocurrency Intelligence',
  description: 'JH Crypto Analytics - Real-time institutional cryptocurrency execution platform, algorithmic signals, and AI forecasting in Indian Rupee (INR ₹).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/jh-logo.png" />
      </head>
      <body className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased cyber-grid flex flex-col justify-between selection:bg-emerald-500/20 selection:text-emerald-900">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
