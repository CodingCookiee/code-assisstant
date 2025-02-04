import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

export const metadata = {
  title: 'Code Genius',
  icons: {
    icon: '/code_logo.png',
    shortcut: '/code_logo.png',
    apple: '/code_logo.png',
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='font-sf-medium' suppressHydrationWarning={true}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

