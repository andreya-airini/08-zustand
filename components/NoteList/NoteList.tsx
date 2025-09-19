import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api";
import type { Note } from "../../types/note";
import Link from "next/link";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.tittle}>{title}</h2>
          <p className={css.content}>{content}</p>
          <span className={css.tag}>{tag}</span>

          <div className={css.btn_s}>
            {/* Посилання на сторінку деталей нотатки */}
            <Link href={`/notes/${id}`} className={css.viewDetails}>
              View details
            </Link>
            {/* Кнопка видалення */}
            <button className={css.button} onClick={() => mutation.mutate(id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
