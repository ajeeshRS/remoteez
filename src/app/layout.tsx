import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layouts/Navbar';
import { mulish, spaceMono } from './fonts/fonts';
import { Toaster } from 'sonner';
import SessionWrapper from '@/components/providers/session-provider';
import Footer from '@/components/layouts/Footer';
import ReduxProvider from '@/components/providers/redux-provider';
import Script from 'next/script';
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
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${mulish.className} ${spaceMono.className} h-full w-full bg-dark-bg bg-cover antialiased backdrop-blur-3xl`}
      >
        <ReduxProvider>
          <SessionWrapper>
          <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.TRACKING_ID}");
          `}
            </Script>
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
