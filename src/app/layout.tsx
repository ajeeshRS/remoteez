import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layouts/Navbar';
import { mulish, spaceMono } from './fonts/fonts';
import { Toaster } from 'sonner';
import SessionWrapper from '@/components/providers/session-provider';
import Footer from '@/components/layouts/Footer';
export const metadata: Metadata = {
  title: 'Remoteez',
  description: 'Your Remote Job Finder.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${mulish.className} ${spaceMono.className} bg-dark-bg h-full w-full bg-cover antialiased backdrop-blur-3xl`}
      >
        <SessionWrapper>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-center" />
        </SessionWrapper>
      </body>
    </html>
  );
}
