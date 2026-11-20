"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeroReveal, HeroStage } from "@/components/ui/hero-reveal";
import type { HomeHeroContent } from "@/types/home";
import { HeroDashboardMockup } from "./hero-dashboard-mockup";

interface HomeHeroSectionProps {
  content: HomeHeroContent;
}

export function HomeHeroSection({ content }: HomeHeroSectionProps) {
  const [bgImgError, setBgImgError] = useState(false);
  const [accentImgError, setAccentImgError] = useState(false);

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative overflow-hidden bg-white pt-10 pb-16 sm:pt-14 sm:pb-24"
    >
      <HeroReveal>
        {/* Stage 1: Dual-Layer Green Wavy Background */}
        <HeroStage
          stage={1}
          preset="fade"
          durationOverride={1.0}
          className="pointer-events-none absolute inset-x-0 top-0 h-[76%] overflow-hidden sm:h-[80%]"
        >
          <div
            aria-hidden="true"
            className="relative h-full w-full bg-[linear-gradient(180deg,#F5FBF7_0%,#E4F6EA_65%,#D3F0DC_100%)]"
          >
            {/* Base Layer: Full Pastel Mint Wave (heroback.png) */}
            {!bgImgError && (
              <Image
                src={content.backgroundImage.src}
                alt={content.backgroundImage.alt}
                fill
                priority
                sizes="100vw"
                onError={() => setBgImgError(true)}
                className="object-cover object-bottom"
              />
            )}

            {/* Bottom-Left Accent Layer: Rich Emerald Wave (green-bg-1.png) */}
            {content.accentBackgroundImage && !accentImgError && (
              <div className="absolute bottom-0 left-0 w-[72%] max-w-3xl sm:w-[58%] lg:w-[50%]">
                <Image
                  src={content.accentBackgroundImage.src}
                  alt={content.accentBackgroundImage.alt}
                  width={900}
                  height={360}
                  priority
                  onError={() => setAccentImgError(true)}
                  className="h-auto w-full object-contain object-bottom-left opacity-90"
                />
              </div>
            )}
          </div>
        </HeroStage>

        {/* Foreground Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Stage 2: Pill Badge + Two-Tone Main Headline */}
            <HeroStage stage={2} preset="rise">
              <span className="inline-flex items-center rounded-full bg-[#37C650] px-4 py-1 text-[11px] font-bold tracking-wider text-white uppercase shadow-2xs">
                {content.badge}
              </span>

              <h1
                id="home-hero-heading"
                className="mt-5 text-3xl leading-[1.13] font-extrabold tracking-tight text-[#111827] sm:text-5xl lg:text-[56px]"
              >
                <span>{content.headline.prefix}</span>
                <span className="block text-[#37C650]">
                  {content.headline.highlight}
                  <span className="text-[#111827]">
                    {content.headline.suffix}
                  </span>
                </span>
              </h1>
            </HeroStage>

            {/* Stage 3: Subtitle + Primary & Secondary CTA Buttons */}
            <HeroStage stage={3} preset="rise">
              <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#4B5563] sm:text-lg">
                {content.description}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4">
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
                  className="w-full border border-[#111827]/65 bg-white/40 text-[#111827] hover:bg-white/80 sm:w-auto"
                >
                  {content.secondaryCta.label}
                </Button>
              </div>
            </HeroStage>
          </div>

          {/* Stages 4, 5 & 6: Management Dashboard + One-by-One Floating Cards */}
          <HeroDashboardMockup
            dashboard={content.dashboard}
            isometricCard={content.isometricCard}
            floatingBadges={content.floatingBadges}
          />
        </div>
      </HeroReveal>
    </section>
  );
}