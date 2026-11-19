"use client";

import Image from "next/image";
import { useState } from "react";
import { LuShieldCheck } from "react-icons/lu";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import type { WhyTrustHubAboutContent } from "@/types/why-trust-hub";

interface AboutTrustHubSectionProps {
  content: WhyTrustHubAboutContent;
}

export function AboutTrustHubSection({ content }: AboutTrustHubSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      aria-labelledby="about-trust-hub-heading"
      className="bg-[#F8FAFC] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Rounded 3D Verified Architecture Card */}
          <div className="mx-auto w-full max-w-[520px] lg:col-span-6 lg:max-w-none">
            <ScrollReveal preset="scale">
              <TiltCard maxTilt={1.8}>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-[linear-gradient(145deg,#FFFFFF_0%,#F1F7F4_100%)] shadow-[0_20px_50px_-15px_rgba(15,23,42,0.1)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[#28B446]/35 hover:shadow-[0_28px_64px_-16px_rgba(40,180,70,0.16)] sm:rounded-3xl">
                  {!imgError ? (
                    <Image
                      src={content.image.src}
                      alt={content.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 540px"
                      onError={() => setImgError(true)}
                      className="object-cover object-center"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_45%,#DCFCE7_0%,#F4F9F6_75%)]"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#28B446] text-white shadow-md">
                        <LuShieldCheck className="h-8 w-8" />
                      </div>
                    </div>
                  )}
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>

          {/* Right Column: Badge, Two-Line Headline & Two Narrative Paragraphs */}
          <div className="lg:col-span-6">
            <ScrollReveal preset="rise" delay={0.08}>
              <span className="inline-flex items-center rounded-full bg-[#E6F7EB] px-4 py-1 text-[11px] font-bold tracking-wider text-[#166534] uppercase">
                {content.badge}
              </span>

              <h2
                id="about-trust-hub-heading"
                className="mt-4 text-2xl leading-[1.16] font-extrabold tracking-tight text-[#111827] sm:text-4xl lg:text-[40px]"
              >
                <span className="block">{content.headline.lineOne}</span>
                <span className="block">{content.headline.lineTwo}</span>
              </h2>
            </ScrollReveal>

            <div className="mt-5 space-y-4">
              {content.paragraphs.map((paragraph, index) => (
                <ScrollReveal
                  key={paragraph.slice(0, 24)}
                  preset="rise"
                  delay={0.14 + index * 0.08}
                >
                  <p className="text-[15px] leading-[1.68] text-[#4B5563] sm:text-base">
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}