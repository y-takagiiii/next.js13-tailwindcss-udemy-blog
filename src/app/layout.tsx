import type { Metadata } from 'next'
import './globals.css'
import Header from './Header'
import Footer from './Footer'

export const metadata: Metadata = {
  title: 'Next.js13 Blog',
  description: 'Next.js13で作ったブログアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className='container mx-auto bg-slate-700 text-slate-50'>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
