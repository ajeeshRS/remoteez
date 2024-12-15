import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layouts/Navbar';
import { mulish, spaceMono } from './fonts/fonts';
import { Toaster } from 'sonner';
import SessionWrapper from '@/components/providers/session-provider';
import Footer from '@/components/layouts/Footer';
import ReduxProvider from '@/components/providers/redux-provider';
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
        className={`${mulish.className} ${spaceMono.className} h-full w-full bg-dark-bg bg-cover antialiased backdrop-blur-3xl`}
      >
        <ReduxProvider>
          <SessionWrapper>
            <Navbar />
            {children}
            <Footer />
            <Toaster position="top-center" />
          </SessionWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
