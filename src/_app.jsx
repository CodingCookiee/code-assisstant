'use client';

import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { Toaster } from "react-hot-toast"
import Header from "./components/Layout/Header"
import Footer from "./components/Layout/Footer"
import Head from 'next/head'
import "./styles/globals.css"

function Auth({ children }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  
  if (status === "loading") return null
  
  if (!session && router.pathname.startsWith('/account')) {
    router.push('/auth/signin')
    return null
  }
  
  return children
}

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Code Assistant</title>
        <meta name="description" content="The Code Assistant for Developers" />
        <link rel="icon" href="/code_logo.png" type="image/png" />
      </Head>
      <div className="min-h-screen flex flex-col bg-light-primary">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </SessionProvider>
  )
}
