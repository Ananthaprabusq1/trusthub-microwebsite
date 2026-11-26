"use client";

import Image from "next/image";
import { useState } from "react";
import type { DocumentationImage } from "@/types/documentation";

export function DocsIllustrationImage({ image }: { image: DocumentationImage }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-label={image.alt}
        role="img"
        className="flex min-h-56 w-full flex-col items-center justify-center gap-3 rounded-xl bg-[var(--color-brand-tint-soft)] text-center text-[var(--color-brand-primary-dark)]"
      >
        <span aria-hidden="true" className="text-5xl">✓</span>
        <span className="max-w-xs px-4 text-sm font-semibold">
          Trust Hub documentation, verified and secure
        </span>
      </div>
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={640}
      height={440}
      className="h-auto max-h-80 w-full rounded-xl object-contain"
      onError={() => setFailed(true)}
    />
  );
}
