"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, type ReactNode, useContext, useState } from "react";
import { LuEye, LuScanSearch } from "react-icons/lu";

interface AuditXRayContextValue {
  xrayEnabled: boolean;
  toggleXray: () => void;
}

const AuditXRayContext = createContext<AuditXRayContextValue>({
  xrayEnabled: false,
  toggleXray: () => {},
});

export function AuditXRayProvider({ children }: { children: ReactNode }) {
  const [xrayEnabled, setXrayEnabled] = useState(false);

  return (
    <AuditXRayContext.Provider
      value={{
        xrayEnabled,
        toggleXray: () => setXrayEnabled((prev) => !prev),
      }}
    >
      {children}
    </AuditXRayContext.Provider>
  );
}

export function useAuditXRay() {
  return useContext(AuditXRayContext);
}

export function AuditXRaySwitch() {
  const { xrayEnabled, toggleXray } = useAuditXRay();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={xrayEnabled}
      onClick={toggleXray}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all ${
        xrayEnabled
          ? "border-[#37C650] bg-[#18181B] text-white shadow-[0_8px_24px_-6px_rgba(55,198,80,0.45)]"
          : "border-slate-200 bg-white text-[#111827] hover:border-[#37C650]/50"
      }`}
    >
      {xrayEnabled ? (
        <LuScanSearch className="h-4 w-4 text-[#37C650]" />
      ) : (
        <LuEye className="h-4 w-4 text-[#64748B]" />
      )}
      <span>{xrayEnabled ? "Audit X-Ray: ACTIVE" : "Inspect Audit X-Ray"}</span>
    </button>
  );
}

interface AuditXRayOverlayProps {
  children: ReactNode;
  telemetryTag: string;
  hashCode?: string;
}

export function AuditXRayOverlay({
  children,
  telemetryTag,
  hashCode = "SHA-256 · TLS 1.3",
}: AuditXRayOverlayProps) {
  const { xrayEnabled } = useAuditXRay();

  return (
    <div className="relative">
      {children}

      <AnimatePresence>
        {xrayEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between rounded-2xl border-2 border-dashed border-[#37C650] bg-[#134E2B]/5 p-3 backdrop-blur-[1px] sm:rounded-3xl"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-md bg-[#18181B] px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-[#37C650] uppercase">
                {telemetryTag}
              </span>
              <span className="rounded-md bg-white/95 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#111827] shadow-2xs">
                {hashCode}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}