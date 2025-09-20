import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tagParam = slug?.[0];
  const tag = tagParam === "all" ? undefined : tagParam;

  let title = "All Notes | NoteHub";
  let description = "Browse all notes in NoteHub";

  if (tag) {
    title = `${tag} Notes | NoteHub`;
    description = `Browse ${tag} notes in NoteHub`;
  }

  const url = tag
    ? `https://yourdomain.com/notes/filter/${tag}`
    : `https://yourdomain.com/notes/filter/all`; // alege care
  const ogImage = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "NoteHub",
      images: [ogImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tagParam = slug?.[0];
  const tag = tagParam === "all" ? undefined : tagParam;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
