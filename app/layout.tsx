import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "A simple Next.js notes application",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <div className="layout">
            <Header />
            <main className="content">
              {children}
              {modal}
            </main>
            <Footer />
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
