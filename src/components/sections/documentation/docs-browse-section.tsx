import type { DocumentationContent } from "@/types/documentation";

export function DocsBrowseSection({ content }: { content: DocumentationContent["browse"] }) {
  return (
    <section id={content.id} aria-labelledby="browse-heading" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <h2 id="browse-heading" className="text-2xl font-bold text-[var(--color-text-primary)]">{content.heading}</h2>
          <p className="text-sm text-[var(--color-text-muted)]">{content.meta}</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {content.topics.map((topic) => (
            <article
              key={topic.number}
              className={`rounded-[var(--radius-card,1.5rem)] border p-6 transition-all duration-200 hover:border-[var(--color-brand-primary)]/40 hover:bg-[var(--color-brand-tint-soft)] hover:shadow-lg ${topic.featured ? "border-[var(--color-brand-primary)]/40 bg-[var(--color-brand-tint-soft)]" : "border-slate-200 bg-[var(--color-surface-base)]"}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--color-brand-primary-dark)]">{topic.number}</span>
                <span className="text-xs text-[var(--color-text-muted)]">{topic.guideCountLabel}</span>
              </div>
              <h3 className="mt-3 mb-4 text-lg font-bold text-[var(--color-text-primary)]">{topic.title}</h3>
              <ul className="space-y-2.5">
                {topic.guides.map((guide) => (
                  <li key={guide} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]">
                    <span aria-hidden="true" className="font-semibold text-[var(--color-brand-primary)]">&gt;</span>
                    <span>{guide}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
