import styles from "./Home.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub – Manage Your Notes Easily",
  description:
    "NoteHub is a simple and efficient app for managing personal notes. Write, edit, and browse notes with ease – anytime, anywhere.",
  openGraph: {
    title: "NoteHub – Manage Your Notes Easily",
    description: "Keep your thoughts organized and accessible in one place.",
    url: "https://yourdomain.com", // заміни на свій домен
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
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <div className={styles.container}>
          <h1 className={styles.title}>Welcome to NoteHub</h1>
          <p className={styles.description}>
            NoteHub is a simple and efficient application designed for managing
            personal notes. It helps keep your thoughts organized and accessible
            in one place, whether you are at home or on the go.
          </p>
          <p className={styles.description}>
            The app provides a clean interface for writing, editing, and
            browsing notes. With support for keyword search and structured
            organization, NoteHub offers a streamlined experience for anyone who
            values clarity and productivity.
          </p>
        </div>
      </main>
    </div>
  );
}
