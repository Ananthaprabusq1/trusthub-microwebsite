"use client";

import { useEffect, useRef } from "react";
import { LuX } from "react-icons/lu";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
}

export function VideoModal({ open, onClose, src }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeButtonRef.current?.focus();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-label="See how Stakflo Trust Hub works"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-0 grid h-dvh w-screen max-h-none max-w-none place-items-center border-0 bg-black/75 p-3 backdrop:bg-black/75 sm:p-6"
    >
      <div className="relative h-[90dvh] max-h-[calc(100dvh-1.5rem)] w-full max-w-[1650px] overflow-hidden rounded-2xl bg-[var(--color-surface-dark)] shadow-2xl sm:rounded-3xl sm:max-h-[calc(100dvh-3rem)]">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3 right-3 z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[var(--color-surface-dark)] shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
        >
          <LuX aria-hidden="true" className="h-5 w-5" />
        </button>
        <video
          src={src}
          autoPlay
          controls
          playsInline
          aria-label="Stakflo Trust Hub overview video"
          className="h-full w-full object-contain"
        />
      </div>
    </dialog>
  );
}
