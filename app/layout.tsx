import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'I Understand It Now',
  description: 'Your intelligent assistant for understanding and managing information',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className = "light">
      <body suppressHydrationWarning={true} className={inter.className}>{children}</body>
    </html>
  )
}

