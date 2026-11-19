"use client";

import Image from "next/image";
import { useState } from "react";
import { LuShieldCheck } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import type { FeaturesCtaBannerContent } from "@/types/features";

interface FeaturesCtaBannerSectionProps {
  content: FeaturesCtaBannerContent;
}

export function FeaturesCtaBannerSection({
  content,
}: FeaturesCtaBannerSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      aria-labelledby="features-cta-banner-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal preset="scale">
          <div className="relative overflow-hidden rounded-3xl bg-[#134E2B] px-6 py-10 shadow-[0_24px_60px_-15px_rgba(19,78,43,0.32)] sm:rounded-[32px] sm:px-12 sm:py-14 lg:px-16 lg:py-16">
            {/* Soft Ambient Emerald Spotlights */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 right-4 h-80 w-80 rounded-full bg-[#28B446]/35 blur-3xl sm:right-16 sm:h-96 sm:w-96"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-72 rounded-full bg-[#1E6F3E]/50 blur-3xl"
            />

            <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Headline, Description & Dual CTAs */}
              <div className="lg:col-span-6">
                <h2
                  id="features-cta-banner-heading"
                  className="text-3xl leading-[1.12] font-extrabold tracking-tight text-white sm:text-4xl lg:text-[42px]"
                >
                  <span className="block">{content.headline.lineOne}</span>
                  <span className="block">{content.headline.lineTwo}</span>
                </h2>

                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#D1E7D8] sm:text-base">
                  {content.description}
                </p>

                <div className="mt-8 flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center sm:gap-4">
                  <Button
                    href={content.primaryCta.href}
                    variant="primary"
                    size="md"
                    showArrow={content.primaryCta.showArrow ?? true}
                    className="w-full shadow-[0_10px_24px_-6px_rgba(40,180,70,0.5)] sm:w-auto"
                  >
                    {content.primaryCta.label}
                  </Button>

                  <Button
                    href={content.secondaryCta.href}
                    variant="custom"
                    size="md"
                    showArrow={content.secondaryCta.showArrow ?? false}
                    className="w-full border border-white/45 bg-white/5 text-white hover:border-white/75 hover:bg-white/15 sm:w-auto"
                  >
                    {content.secondaryCta.label}
                  </Button>
                </div>
              </div>

              {/* Right Column: Rounded 3D Verified Architecture Card */}
              <div className="mx-auto w-full max-w-[440px] lg:col-span-6 lg:max-w-none">
                <TiltCard maxTilt={2}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/25 bg-[linear-gradient(145deg,#FFFFFF_0%,#F1F7F4_100%)] shadow-[0_22px_50px_-12px_rgba(6,32,16,0.45)] sm:rounded-3xl">
                    {!imgError ? (
                      <Image
                        src={content.image.src}
                        alt={content.image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 460px"
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
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}