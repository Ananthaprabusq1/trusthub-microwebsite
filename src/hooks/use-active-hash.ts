"use client";

import { useSyncExternalStore } from "react";

const HASH_CHANGE_EVENT = "trusthub:hashchange";

function subscribeToHash(callback: () => void): () => void {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  window.addEventListener(HASH_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
    window.removeEventListener(HASH_CHANGE_EVENT, callback);
  };
}

function getHashSnapshot(): string {
  return typeof window !== "undefined" ? window.location.hash : "";
}

function getServerHashSnapshot(): string {
  return "";
}

export function useActiveHash(): string {
  return useSyncExternalStore(
    subscribeToHash,
    getHashSnapshot,
    getServerHashSnapshot
  );
}

export function notifyHashChange(): void {
  if (typeof window !== "undefined") {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event(HASH_CHANGE_EVENT));
    });
  }
}