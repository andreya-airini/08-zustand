import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create Note – NoteHub",
  description: "Create a new personal note in NoteHub.",
  metadataBase: new URL("https://08-zustand-indol-phi.vercel.app/"),
  openGraph: {
    title: "Create Note – NoteHub",
    description: "Create a new personal note in NoteHub.",
    url: "https://08-zustand-indol-phi.vercel.app/notes/action/create",
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

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
