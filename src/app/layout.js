import AuthProvider from './components/providers/SessionProvider'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import '../styles/globals.css'

export const metadata = {
  title: 'Code Genius - Your Code Assistant ', 
  icons: {
    icon: '/code_logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='font-sf-light'>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
