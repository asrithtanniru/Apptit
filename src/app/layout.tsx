// app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import { Poppins } from 'next/font/google';
import { Quicksand } from 'next/font/google';
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
});


export const metadata = {
  title: 'Job Scraper',
  description: 'Find the best jobs across multiple platforms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className={`${quicksand.className} flex-grow`}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}