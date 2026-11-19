export type HeroStageOrder = 1 | 2 | 3 | 4 | 5 | 6;

export type RevealPreset = "rise" | "scale" | "fade" | "pop";

export interface HeroTimingConfig {
  /** Initial delay before Stage 1 starts (seconds) */
  initialDelay?: number;
  /** Time gap between each stage (seconds) */
  stageInterval?: number;
  /** Duration of each stage animation (seconds) */
  duration?: number;
}