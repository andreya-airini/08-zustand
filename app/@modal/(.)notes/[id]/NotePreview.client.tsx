"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import Loading from "@/app/loading";
import ModalNote from "@/components/ModalNote/ModalNote";

type NotePreviewProps = {
  noteId?: string;
};

const NotePreviewClient = ({ noteId }: NotePreviewProps) => {
  const params = useParams<{ id: string }>();
  const id = noteId ?? params.id;

  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading note</p>;
  if (!note) return <p>Note not found</p>;

  const dateFormat: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const isValidDate = (value: string): boolean => {
    const d = new Date(value);
    return !isNaN(d.getTime());
  };

  const formatDateSafe = (value: string): string => {
    return isValidDate(value)
      ? new Date(value).toLocaleDateString("en-US", dateFormat)
      : value;
  };

  const createdAt = formatDateSafe(note.createdAt);
  const updatedAt = formatDateSafe(note.updatedAt);

  const formattedDate = note.updatedAt
    ? `Updated at: ${updatedAt}`
    : `Created at: ${createdAt}`;

  return (
    <ModalNote onClose={handleClose} backPage={from ? from : "All notes"}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.description}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
          <p className={css.tag}>{note.tag}</p>
        </div>
      </div>
    </ModalNote>
  );
};

export default NotePreviewClient;
