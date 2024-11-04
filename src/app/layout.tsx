import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layouts/Navbar'
import { mulish, spaceMono } from './fonts/fonts'
import { ThemeProvider } from '@/components/providers/theme-provider'

export const metadata: Metadata = {
  title: 'Remoteez',
  description: 'Your Remote Job Finder.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${mulish.className} ${spaceMono.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
