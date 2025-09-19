"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

export default function TagsMenu() {
  const tags = ["Work", "Personal", "Todo", "Shopping", "Meeting"];

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={() => setIsOpen(!isOpen)}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/all"
              className={css.menuLink}
              onClick={handleClose}
            >
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={handleClose}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
