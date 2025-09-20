import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub – Your Personal Notes App",
  description:
    "NoteHub is a simple and efficient Next.js application for managing personal notes.",
  keywords: ["notes", "productivity", "note taking", "Next.js", "NoteHub"],
  authors: [{ name: "Andreya Airini" }],
  creator: "Andreya Airini",
  openGraph: {
    title: "NoteHub – Your Personal Notes App",
    description: "Organize and manage your personal notes easily with NoteHub.",
    url: "https://yourdomain.com", // звмінити на ріл
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub – Your Personal Notes App",
    description: "Simple and efficient note-taking app built with Next.js.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
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
    <html lang="en" className={roboto.variable}>
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
