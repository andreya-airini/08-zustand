"use client";

import { useState, useEffect } from "react";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { useNoteStore } from "../../lib/store/noteStore";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function NoteForm() {
  const router = useRouter();
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState<(typeof tags)[number]>(
    draft.tag as (typeof tags)[number]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      setLoading(false);
      return;
    }

    try {
      await createNote({ title, content, tag });
      clearDraft();
      alert("Note created successfully!");
      router.back();
    } catch (err) {
      setError("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
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

      {error && <p className={css.error}>{error}</p>}

      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={loading}>
          {loading ? "Creating..." : "Create note"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
