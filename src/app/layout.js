import AuthProvider from './components/providers/SessionProvider'
import { ThemeProvider } from './components/providers/ThemeProvider'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import '../styles/globals.css'

export const metadata = {
  title: 'Code Genius - Your Code Assistant',
  icons: {
    icon: '/code_logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sf-light bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text">
        <ThemeProvider>
          <AuthProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1">
                <Header />
                <main className="p-8">
                  {children}
                </main>
              </div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
