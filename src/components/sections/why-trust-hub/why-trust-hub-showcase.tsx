"use client";

import Image from "next/image";
import { useState } from "react";
import { LuBadgeCheck, LuLockOpen } from "react-icons/lu";
import { FloatingCard } from "@/components/ui/floating-card";
import { HeroStage } from "@/components/ui/hero-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import type {
  WhyHeroToastIcon,
  WhyTrustHubHeroContent,
} from "@/types/why-trust-hub";

interface WhyTrustHubShowcaseProps {
  showcaseImage: WhyTrustHubHeroContent["showcaseImage"];
  accentWaveImage?: WhyTrustHubHeroContent["accentBackgroundImage"];
  floatingBadges: WhyTrustHubHeroContent["floatingBadges"];
}

function ToastIcon({ type }: { type: WhyHeroToastIcon }) {
  const iconClass = "h-5 w-5 text-white";
  if (type === "sharing") {
    return <LuLockOpen aria-hidden="true" className={iconClass} />;
  }
  return <LuBadgeCheck aria-hidden="true" className={iconClass} />;
}

export function WhyTrustHubShowcase({
  showcaseImage,
  accentWaveImage,
  floatingBadges,
}: WhyTrustHubShowcaseProps) {
  const [imgError, setImgError] = useState(false);
  const [waveError, setWaveError] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[540px] lg:pb-10">
      {/* Stage 4: Main Isometric Showcase Card with Inner Organic Wave & 3D Tilt */}
      <HeroStage stage={4} preset="scale">
        <TiltCard maxTilt={2}>
          <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-[linear-gradient(155deg,#F8FCF9_0%,#EAF7EE_55%,#D7F1DF_100%)] p-5 shadow-[0_24px_60px_-16px_rgba(15,23,42,0.14)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-white hover:shadow-[0_32px_72px_-16px_rgba(22,101,52,0.22)] sm:p-8">
            {/* Inner Bottom-Left Curved Emerald Wave (Matches Figma Card Backdrop) */}
            {accentWaveImage && !waveError && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[54%]"
              >
                <Image
                  src={accentWaveImage.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 540px"
                  onError={() => setWaveError(true)}
                  className="object-cover object-left-top opacity-75"
                />
              </div>
            )}

            {/* Soft Top-Right Specular Highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-12 h-44 w-64 rounded-full bg-white/75 blur-2xl"
            />

            {!imgError && (
              <div className="relative z-10 flex items-center justify-center">
                <Image
                  src={showcaseImage.src}
                  alt={showcaseImage.alt}
                  width={540}
                  height={405}
                  priority
                  onError={() => setImgError(true)}
                  className="h-auto w-full max-w-[430px] object-contain"
                />
              </div>
            )}
          </div>
        </TiltCard>
      </HeroStage>

      {/* Stages 5 & 6: One-by-One Floating Status Toast Pills */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-0 sm:block">
        {floatingBadges.map((badge, index) => {
          const isLeft = badge.position === "bottom-left";
          const positionClasses = isLeft
            ? "sm:absolute sm:bottom-14 sm:-left-6 lg:bottom-16 lg:-left-9"
            : "sm:absolute sm:right-3 sm:-bottom-4 lg:right-2 lg:bottom-0";

          return (
            <HeroStage
              key={badge.id}
              stage={isLeft ? 5 : 6}
              preset="pop"
              delayOverride={0.72 + index * 0.16}
              className={positionClasses}
            >
              <FloatingCard
                amplitude={isLeft ? 5.5 : 6.5}
                duration={isLeft ? 4.7 : 5.3}
                delay={1.35 + index * 0.2}
              >
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_14px_34px_-10px_rgba(15,23,42,0.14)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[var(--color-brand-primary)]/40 hover:shadow-[0_22px_44px_-10px_rgba(55,198,80,0.22)]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-primary)]">
                    <ToastIcon type={badge.icon} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-surface-dark)] sm:text-[13px]">
                      {badge.title}
                    </p>
                    <p className="text-[11px] text-[var(--color-palette-64748b)]">
                      {badge.subtitle}
                    </p>
                  </div>
                </div>
              </FloatingCard>
            </HeroStage>
          );
        })}
      </div>
    </div>
  );
}