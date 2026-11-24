"use client";

import { AnimatePresence, motion } from "motion/react";
import { LuLock, LuShieldCheck } from "react-icons/lu";
import type {
  TransitionMode,
  TransitionPhase,
} from "@/context/get-started-transition-context";

interface TransitionOverlaysProps {
  mode: TransitionMode;
  phase: TransitionPhase;
  origin: { x: number; y: number };
}

const SHUTTER_COLUMNS = [0, 1, 2, 3];

export function TransitionOverlays({
  mode,
  phase,
  origin,
}: TransitionOverlaysProps) {
  const isActive = phase !== "idle";

  return (
    <AnimatePresence>
      {/* 1. Click-Origin #37C650 Vault Ripple */}
      {isActive && mode === "vault-ripple" && (
        <motion.div
          key="vault-ripple-overlay"
          initial={{
            clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
            opacity: 1,
          }}
          animate={{
            clipPath: `circle(160vmax at ${origin.x}px ${origin.y}px)`,
            opacity: phase === "revealing" ? 0 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            clipPath: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.42, ease: "easeOut" },
          }}
          className="pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#37C650] text-white"
        >
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.25 }}
            className="flex flex-col items-center gap-3 px-4 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xs">
              <LuShieldCheck className="h-9 w-9 text-white" />
            </div>
            <p className="text-sm font-bold tracking-wider uppercase">
              Connecting to Stakflo Trust Hub...
            </p>
            <span className="rounded-full bg-white/15 px-3 py-0.5 font-mono text-xs">
              trusthub.stakflo.io
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* 4. Staggered Security Shutters */}
      {isActive && mode === "security-shutters" && (
        <div
          key="shutters-overlay"
          className="pointer-events-none fixed inset-0 z-50 grid grid-cols-4"
        >
          {SHUTTER_COLUMNS.map((col) => (
            <motion.div
              key={col}
              initial={{ y: "-100%" }}
              animate={{ y: phase === "entering" ? "0%" : "-100%" }}
              transition={{
                duration: 0.38,
                delay: col * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative h-full border-r border-white/10 bg-[#111827]"
            >
              {col === 1 && phase === "entering" && (
                <div className="absolute right-0 bottom-8 left-0 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#37C650] px-3 py-1 text-[11px] font-bold text-white">
                    <LuLock className="h-3 w-3" />
                    <span>trusthub.stakflo.io</span>
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* 5. 3D Security Pass Flip */}
      {isActive && mode === "pass-flip" && (
        <motion.div
          key="pass-flip-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "entering" ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ perspective: 1200 }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-xs"
        >
          <motion.div
            initial={{ rotateY: -90, scale: 0.85 }}
            animate={{
              rotateY: phase === "entering" ? 0 : 90,
              scale: phase === "entering" ? 1 : 0.92,
            }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-80 flex-col items-center rounded-3xl border-2 border-[#37C650] bg-[#111827] p-7 text-center text-white shadow-[0_24px_60px_-12px_rgba(55,198,80,0.5)]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#37C650] text-white">
              <LuShieldCheck className="h-8 w-8" />
            </div>
            <span className="mt-4 rounded-full bg-[#37C650]/20 px-3 py-0.5 text-[10.5px] font-bold tracking-wider text-[#8CE09E] uppercase">
              Product Workspace
            </span>
            <h3 className="mt-2 text-lg font-extrabold">Stakflo Trust Hub</h3>
            <p className="mt-1 font-mono text-xs text-slate-400">
              trusthub.stakflo.io/register
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}