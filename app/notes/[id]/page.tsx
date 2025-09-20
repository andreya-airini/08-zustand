import { QueryClient, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { HydrationBoundary } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import { Metadata } from "next";

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const url = `https://yourdomain.com/notes/${id}`;
  const ogImage = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

  return {
    title: `${note.title} | NoteHub`,
    description: note.content.slice(0, 50),
    openGraph: {
      title: `${note.title} | NoteHub`,
      description: note.content.slice(0, 50),
      url,
      siteName: "NoteHub",
      images: [ogImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.title} | NoteHub`,
      description: note.content.slice(0, 50),
      images: [ogImage],
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  if (!id) notFound();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const note = queryClient.getQueryData(["note", id]);
  if (!note) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
