"use client";
import { createPortal } from "react-dom";
import css from "./ModalNote.module.css";

export type ModalProps = {
  children: React.ReactNode;
  backPage?: string;
  onClose: () => void;
};

export default function ModalNote({ children, backPage, onClose }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button className={css.backBtn} onClick={onClose}>{`< Go back to ${
          backPage === "All" ? "All notes" : backPage
        }`}</button>
        {children}
      </div>
    </div>,
    document.body
  );
}
