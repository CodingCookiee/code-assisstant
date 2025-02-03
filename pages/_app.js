import { SessionProvider } from "next-auth/react";
import Header from "../src/components/Layout/Header";
import Footer from "../src/components/Layout/Footer";
import { Toaster } from "react-hot-toast";
import "../src/styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </SessionProvider>
  );
}
