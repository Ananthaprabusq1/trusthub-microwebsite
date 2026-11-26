import { Button } from "@/components/ui/button";
import type { DocumentationContent } from "@/types/documentation";
import { DocsIllustration } from "./docs-illustration";

export function DocsCtaBannerSection({
  content,
}: {
  content: DocumentationContent["ctaBanner"];
}) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[var(--radius-modal,24px)] bg-[var(--color-brand-deep,#135730)] p-8 md:p-12"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 85% 20%, rgba(47, 200, 88, 0.28), transparent 48%)",
          }}
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                {content.heading}
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-white/85">
                {content.subtitle}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  href={content.primaryCta.href}
                  variant="brand"
                  size="lg"
                  showArrow={content.primaryCta.showArrow}
                >
                  {content.primaryCta.label}
                </Button>
                <Button
                  href={content.secondaryCta.href}
                  variant="inverse"
                  size="lg"
                  showArrow={content.secondaryCta.showArrow}
                >
                  {content.secondaryCta.label}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <DocsIllustration image={content.illustration} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}