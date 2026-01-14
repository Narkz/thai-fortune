// Haptic feedback utilities using the Vibration API
// Falls back gracefully on devices that don't support it

export type HapticStyle = "light" | "medium" | "heavy" | "success" | "error";

const HAPTIC_PATTERNS: Record<HapticStyle, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 30], // Quick tap, pause, longer tap
  error: [50, 30, 50, 30, 50], // Three quick buzzes
};

export function triggerHaptic(style: HapticStyle = "light"): void {
  if (typeof window === "undefined") return;

  // Check for Vibration API support
  if ("vibrate" in navigator) {
    try {
      navigator.vibrate(HAPTIC_PATTERNS[style]);
    } catch {
      // Silently fail if vibration not supported
    }
  }
}

// Convenience functions
export const hapticLight = () => triggerHaptic("light");
export const hapticMedium = () => triggerHaptic("medium");
export const hapticHeavy = () => triggerHaptic("heavy");
export const hapticSuccess = () => triggerHaptic("success");
export const hapticError = () => triggerHaptic("error");
