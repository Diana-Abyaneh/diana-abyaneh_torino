import ReactQueryProvider from "../lib/ReactQueryProvider";
import { AuthProvider } from "@/context/authContext";
import { ToastContainer } from "react-toastify";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <ReactQueryProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
