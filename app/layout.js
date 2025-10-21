import ReactQueryProvider from "../lib/ReactQueryProvider";
import { AuthProvider } from "@/context/authContext";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="fa" dir="rtl">
        <body>
          <ReactQueryProvider>
            <Header />
            {children}
            <Footer />
          </ReactQueryProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
