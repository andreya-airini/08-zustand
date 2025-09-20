"use client";

import { useState, useEffect } from "react";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { useNoteStore } from "../../lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState<(typeof tags)[number]>(
    draft.tag as (typeof tags)[number]
  );
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  const { mutate, isPending, error } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutate({ title, content, tag });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={css.input}
            placeholder="Enter note title"
            required
          />
        </label>

        <label>
          Content
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={css.textarea}
            placeholder="Enter note content"
          />
        </label>

        <label>
          Tag
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value as (typeof tags)[number])}
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
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>
        <button
          type="button"
          onClick={() => {
            router.back();
          }}
          className={css.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
