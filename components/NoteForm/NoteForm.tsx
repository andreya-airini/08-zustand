"use client";
import { useNoteStore } from "../../lib/store/noteStore";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, resetDraft } = useNoteStore();

  const { mutate, isPending, error } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      resetDraft();
      router.back();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value } as typeof draft);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    mutate(draft);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={draft.title}
            onChange={handleChange}
            className={css.input}
            placeholder="Enter note title"
            required
          />
        </label>

        <label>
          Content
          <textarea
            name="content"
            value={draft.content}
            onChange={handleChange}
            className={css.textarea}
            placeholder="Enter note content"
          />
        </label>

        <label>
          Tag
          <select
            name="tag"
            value={draft.tag}
            onChange={handleChange}
            className={css.select}
          >
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className={css.error}>Failed to create note</p>}

      <div className={css.actions}>
        <button type="submit" disabled={isPending} className={css.submitButton}>
          {isPending ? "Creating..." : "Create note"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
