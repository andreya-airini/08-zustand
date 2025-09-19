import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug?: string[] }>; // params приходить як проміс
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params; // чекаємо на params
  const tagParam = slug?.[0];
  const tag = tagParam === "all" ? undefined : tagParam;

  // Серверний prefetch
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
