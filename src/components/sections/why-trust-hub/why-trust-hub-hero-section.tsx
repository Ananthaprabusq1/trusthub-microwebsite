"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeroReveal, HeroStage } from "@/components/ui/hero-reveal";
import type { WhyTrustHubHeroContent } from "@/types/why-trust-hub";
import { WhyTrustHubShowcase } from "./why-trust-hub-showcase";

interface WhyTrustHubHeroSectionProps {
  content: WhyTrustHubHeroContent;
}

export function WhyTrustHubHeroSection({
  content,
}: WhyTrustHubHeroSectionProps) {
  const [bgImgError, setBgImgError] = useState(false);

  return (
    <section
      aria-labelledby="why-trust-hub-hero-heading"
      className="relative overflow-hidden bg-[var(--color-palette-f7fbf8)] py-12 sm:py-16 lg:py-40"
    >
      <HeroReveal>
        {/* Stage 1: Single Combined Green Wave Background */}
        <HeroStage
          stage={1}
          preset="fade"
          durationOverride={1.0}
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="relative h-full w-full bg-[var(--color-brand-tint-soft)]"
          >
            {!bgImgError && (
              <Image
                src={content.backgroundImage.src}
                alt={content.backgroundImage.alt}
                fill
                priority
                sizes="100vw"
                onError={() => setBgImgError(true)}
                className="object-cover object-right-top opacity-75"
              />
            )}

            {/* Left Top Soft Wash so Headline Contrast Stays Crisp */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_32%,rgba(249,252,250,0.88)_0%,rgba(249,252,250,0.45)_48%,transparent_78%)]" />

          </div>
        </HeroStage>

        {/* Foreground Two-Column Split Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
            {/* Left Column: Badge, 3-Line Headline, Description & CTAs */}
            <div className="lg:col-span-6">
              {/* Stage 2: Pill Badge + Two-Tone Three-Line Headline */}
              <HeroStage stage={2} preset="rise">
                <span className="inline-flex items-center rounded-full bg-[var(--color-brand-primary)] px-3.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-2xs sm:text-[11px]">
                  {content.badge}
                </span>

                <h1
                  id="why-trust-hub-hero-heading"
                  className="mt-4 text-3xl leading-[1.11] font-extrabold tracking-[-0.025em] text-[var(--color-surface-dark)] sm:text-[44px] lg:text-[50px]"
                >
                  <span className="block">{content.headline.lineOne}</span>
                  <span className="block text-[var(--color-brand-primary)]">
                    {content.headline.highlightLineOne}
                  </span>
                  <span className="block text-[var(--color-brand-primary)]">
                    {content.headline.highlightLineTwo}
                  </span>
                </h1>
              </HeroStage>

              {/* Stage 3: Description + CTA Buttons */}
              <HeroStage stage={3} preset="rise">
                <p className="mt-4 max-w-[470px] text-[15px] leading-[1.6] text-[var(--color-text-secondary)] sm:text-base">
                  {content.description}
                </p>

                <div className="mt-7 flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center sm:gap-4">
                  <Button
                    href={content.primaryCta.href}
                    variant="primary"
                    size="md"
                    showArrow={content.primaryCta.showArrow ?? true}
                    className="w-full sm:w-auto"
                  >
                    {content.primaryCta.label}
                  </Button>

                  <Button
                    href={content.secondaryCta.href}
                    variant="custom"
                    size="md"
                    showArrow={content.secondaryCta.showArrow ?? false}
                    className="w-full border border-[var(--color-surface-dark)]/65 bg-white/30 text-[var(--color-surface-dark)] backdrop-blur-[2px] hover:bg-white/80 sm:w-auto"
                  >
                    {content.secondaryCta.label}
                  </Button>
                </div>
              </HeroStage>
            </div>

            {/* Right Column: Showcase Card + Floating Status Pills */}
            <div className="lg:col-span-6">
              <WhyTrustHubShowcase
                showcaseImage={content.showcaseImage}
                accentWaveImage={content.showcaseAccentImage}
                floatingBadges={content.floatingBadges}
              />
            </div>
          </div>
        </div>
      </HeroReveal>
    </section>
  );
}
