
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Zyqentra - Rust",
  description: "Learn Rust step by step",
  icons: {
    icon: "/favicon.png", // ✅ Path to your favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />

          <div className="app">
           {/* <header className="header">
              <h1>Zyqentra</h1>
              <p>Level up your coding skills step by step</p>
            </header>*/}

            {/* Page Content */}
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
