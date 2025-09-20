import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found – NoteHub",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "Page Not Found – NoteHub",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://yourdomain.com/not-found", // звмінити на ріл
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 - Notehub",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found – NoteHub",
    description: "Sorry, the page you are looking for does not exist.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 - Notehub",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
