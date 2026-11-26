"use client";

import { motion, useReducedMotion } from "motion/react";
import type { DocumentationTopic } from "@/types/documentation";

export function DocsTopicCard({ topic, index }: { topic: DocumentationTopic; index: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -4, transition: { type: "spring", stiffness: 360, damping: 26 } }}
      className="group relative overflow-hidden rounded-[var(--radius-card,1.5rem)] border border-[var(--color-palette-e2e8f0)] bg-[var(--color-surface-base)] p-5 shadow-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-[var(--color-brand-primary)]/55 hover:shadow-lg focus-within:border-[var(--color-brand-primary)]/55 focus-within:shadow-lg sm:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{ background: "radial-gradient(240px circle at 0% 0%, var(--color-brand-tint), transparent 70%)" }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center justify-center rounded-lg bg-[var(--color-brand-tint)] px-2.5 py-1 text-xs font-bold tabular-nums text-[var(--color-palette-134e2b)] transition-colors duration-200 group-hover:bg-[var(--color-brand-primary)] group-hover:text-white group-focus-within:bg-[var(--color-brand-primary)] group-focus-within:text-white">
            {topic.number}
          </span>
          <span className="text-xs font-medium tabular-nums text-[var(--color-text-muted)]">{topic.guideCountLabel}</span>
        </div>
        <h3 className="mt-3 mb-3 text-lg font-bold tracking-tight text-[var(--color-text-primary)] transition-colors duration-200 group-hover:text-[var(--color-brand-primary-dark)] sm:mt-4 sm:mb-4">
          {topic.title}
        </h3>
        <ul className="space-y-0.5">
          {topic.guides.map((guide, index) => (
            <li key={`${topic.number}-${index}-${guide}`} className="group/item -mx-2.5 flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-sm text-[var(--color-text-muted)] transition-all duration-200 hover:bg-[var(--color-brand-tint)]/65 hover:text-[var(--color-text-primary)]">
              <span className="flex min-w-0 items-center gap-2">
                <span aria-hidden="true" className="text-[var(--color-brand-primary)] transition-transform duration-200 group-hover/item:translate-x-1 group-hover/item:text-[var(--color-brand-primary-dark)]">&gt;</span>
                <span className="font-normal text-[var(--color-text-muted)] group-hover/item:font-medium group-hover/item:text-[var(--color-text-primary)]">{guide}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
