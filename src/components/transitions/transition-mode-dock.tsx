"use client";

import { LuPlay, LuSparkles } from "react-icons/lu";
import {
  type TransitionMode,
  useGetStartedTransition,
} from "@/context/get-started-transition-context";

const MODES: { id: TransitionMode; label: string }[] = [
  { id: "vault-ripple", label: "1. Vault Ripple" },
  { id: "layout-morph", label: "2. Layout Morph" },
  { id: "glass-sheet", label: "3. Glass Sheet" },
  { id: "security-shutters", label: "4. Shutters" },
  { id: "pass-flip", label: "5. 3D Pass" },
];

export function TransitionModeDock() {
  const { mode, setMode, triggerTransition } = useGetStartedTransition();

  return (
    <div
      aria-label="Transition Prototype Switcher"
      className="fixed right-4 bottom-4 z-40 flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-[0_18px_45px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md"
    >
      <span className="hidden items-center gap-1 px-2 text-[11px] font-bold text-[#15803D] sm:inline-flex">
        <LuSparkles className="h-3.5 w-3.5 text-[#37C650]" />
        <span>Mode:</span>
      </span>

      {MODES.map((item) => {
        const active = mode === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
            className={`cursor-pointer rounded-xl px-2.5 py-1 text-[11px] font-semibold transition-colors ${
              active
                ? "bg-[#37C650] text-white shadow-2xs"
                : "text-[#4B5563] hover:bg-slate-100 hover:text-[#111827]"
            }`}
          >
            {item.label}
          </button>
        );
      })}

      <button
        type="button"
        onClick={(e) => triggerTransition(e, "/ui-test")}
        className="ml-1 inline-flex cursor-pointer items-center gap-1 rounded-xl bg-[#111827] px-3 py-1 text-[11px] font-bold text-white transition-colors hover:bg-[#1f2937]"
      >
        <LuPlay className="h-3 w-3 text-[#37C650]" />
        <span>Test</span>
      </button>
    </div>
  );
}