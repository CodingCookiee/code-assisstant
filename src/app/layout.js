import AuthProvider from "./components/providers/SessionProvider";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import "../styles/globals.css";

export const metadata = {
  title: "DeepCode - Your Code Assistant",
  icons: {
    icon: "/favicon.png",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sf-light bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text">
        <ThemeProvider>
          <AuthProvider>
            <Toaster position="top-center" reverseOrder={true} />
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1">
                <Header />
                <main className="p-8">{children}</main>
              </div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
