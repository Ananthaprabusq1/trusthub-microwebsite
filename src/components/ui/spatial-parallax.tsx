"use client";

import {
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  createContext,
  type MouseEvent,
  type ReactNode,
  useContext,
  useRef,
} from "react";

interface SpatialContextValue {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

const SpatialContext = createContext<SpatialContextValue | null>(null);

interface SpatialStageProps {
  children: ReactNode;
  className?: string;
}

export function SpatialStage({
  children,
  className = "relative",
}: SpatialStageProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const pointerX = useSpring(rawX, { stiffness: 120, damping: 24, mass: 0.5 });
  const pointerY = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.5 });

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const normX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    rawX.set(normX);
    rawY.set(normY);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <SpatialContext.Provider value={{ pointerX, pointerY, scrollYProgress }}>
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </div>
    </SpatialContext.Provider>
  );
}

interface SpatialLayerProps {
  children: ReactNode;
  depth?: number;
  scrollRange?: number;
  className?: string;
}

export function SpatialLayer({
  children,
  depth = 0.6,
  scrollRange = 22,
  className = "",
}: SpatialLayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const context = useContext(SpatialContext);

  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const fallbackProgress = useMotionValue(0.5);

  const pointerX = context?.pointerX ?? fallbackX;
  const pointerY = context?.pointerY ?? fallbackY;
  const scrollYProgress = context?.scrollYProgress ?? fallbackProgress;

  const translateX = useTransform(pointerX, [-1, 1], [-14 * depth, 14 * depth]);
  const pointerOffsetY = useTransform(
    pointerY,
    [-1, 1],
    [-10 * depth, 10 * depth]
  );
  const scrollOffsetY = useTransform(
    scrollYProgress,
    [0, 1],
    [scrollRange * depth, -scrollRange * depth]
  );

  const combinedY = useTransform(
    [pointerOffsetY, scrollOffsetY],
    ([py, sy]: number[]) => (py ?? 0) + (sy ?? 0)
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      style={{ x: translateX, y: combinedY }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}