"use client";

import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Loading from "@/components/Loading/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
// import Modal from "@/components/Modal/Modal";
// import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./Notes.module.css";
import Link from "next/link";

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 1000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, debouncedSearch, tag),
    placeholderData: (prev) => prev,
  });

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage />;

  return (
    <div>
      <div className={css.toolbar}>
        <div>
          <SearchBox onSearch={handleSearch} />
          <Link href="/notes/action/create" className={css.button}>
            Create note+
          </Link>
        </div>
        {data && data.totalPages > 1 && (
          <Pagination
            forcePage={page - 1}
            pageCount={data.totalPages}
            onPageChange={({ selected }) => setPage(selected + 1)}
          />
        )}
      </div>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
