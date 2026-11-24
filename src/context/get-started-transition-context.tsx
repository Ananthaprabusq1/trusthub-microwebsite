"use client";

import { LayoutGroup } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TransitionOverlays } from "@/components/transitions/transition-overlays";

export type TransitionMode =
  | "vault-ripple"
  | "layout-morph"
  | "glass-sheet"
  | "security-shutters"
  | "pass-flip";

export type TransitionPhase = "idle" | "entering" | "revealing";

interface ClickOrigin {
  x: number;
  y: number;
}

interface GetStartedTransitionContextValue {
  mode: TransitionMode;
  setMode: (mode: TransitionMode) => void;
  activeOverlayMode: TransitionMode;
  phase: TransitionPhase;
  origin: ClickOrigin;
  triggerTransition: (
    event?: MouseEvent<HTMLElement>,
    targetHref?: string
  ) => void;
}

const STORAGE_KEY = "stakflo_ui_test_transition_mode";
const DEFAULT_REGISTER_URL = "https://trusthub.stakflo.io/register";

const GetStartedTransitionContext =
  createContext<GetStartedTransitionContextValue | null>(null);

export function GetStartedTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mode, setModeState] = useState<TransitionMode>("vault-ripple");
  const [activeOverlayMode, setActiveOverlayMode] =
    useState<TransitionMode>("vault-ripple");
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [origin, setOrigin] = useState<ClickOrigin>({ x: 0, y: 0 });
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(
      STORAGE_KEY
    ) as TransitionMode | null;
    const restoreTimer = saved
      ? window.setTimeout(() => {
          setModeState(saved);
          setActiveOverlayMode(saved);
        }, 0)
      : undefined;

    // Reset overlay if user returns via browser Back button (bfcache)
    const handlePageShow = () => setPhase("idle");
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      if (restoreTimer !== undefined) window.clearTimeout(restoreTimer);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const setMode = useCallback((nextMode: TransitionMode) => {
    setModeState(nextMode);
    setActiveOverlayMode(nextMode);
    window.localStorage.setItem(STORAGE_KEY, nextMode);
  }, []);

  const clearTimers = () => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const triggerTransition = useCallback(
    (
      event?: MouseEvent<HTMLElement>,
      targetHref = DEFAULT_REGISTER_URL
    ) => {
      if (event) {
        event.preventDefault();
        setOrigin({ x: event.clientX, y: event.clientY });
      } else {
        setOrigin({
          x: typeof window !== "undefined" ? window.innerWidth - 140 : 800,
          y: 40,
        });
      }

      clearTimers();

      const isExternal = /^https?:\/\//i.test(targetHref);

      // External domain hand-off (https://trusthub.stakflo.io/register)
      if (isExternal) {
        const externalCoverMode: TransitionMode =
          mode === "layout-morph" || mode === "glass-sheet"
            ? "vault-ripple"
            : mode;

        setActiveOverlayMode(externalCoverMode);
        setPhase("entering");

        const redirectTimer = window.setTimeout(() => {
          window.location.assign(targetHref);
        }, 520);

        timersRef.current.push(redirectTimer);
        return;
      }

      // Internal route fallback (if testing /ui-test)
      setActiveOverlayMode(mode);

      if (mode === "layout-morph") {
        setPhase("revealing");
        if (pathname !== targetHref) {
          router.push(targetHref);
        }
        const t = window.setTimeout(() => setPhase("idle"), 650);
        timersRef.current.push(t);
        return;
      }

      setPhase("entering");
      const midDelay = mode === "glass-sheet" ? 120 : 440;
      const endDelay = mode === "glass-sheet" ? 760 : 1020;

      const t1 = window.setTimeout(() => {
        if (pathname !== targetHref) {
          router.push(targetHref);
        }
        setPhase("revealing");
      }, midDelay);

      const t2 = window.setTimeout(() => {
        setPhase("idle");
      }, endDelay);

      timersRef.current.push(t1, t2);
    },
    [mode, pathname, router]
  );

  return (
    <GetStartedTransitionContext.Provider
      value={{
        mode,
        setMode,
        activeOverlayMode,
        phase,
        origin,
        triggerTransition,
      }}
    >
      <LayoutGroup id="stakflo-get-started-group">
        {children}
        <TransitionOverlays
          mode={activeOverlayMode}
          phase={phase}
          origin={origin}
        />
        {/* TransitionModeDock */}
      </LayoutGroup>
    </GetStartedTransitionContext.Provider>
  );
}

export function useGetStartedTransition() {
  const ctx = useContext(GetStartedTransitionContext);
  if (!ctx) {
    throw new Error(
      "useGetStartedTransition must be used inside GetStartedTransitionProvider"
    );
  }
  return ctx;
}
