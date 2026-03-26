/**
 * mathUtils.ts
 * Shared math helpers for 3D camera, animation, and scene logic.
 */

/** Linear interpolation */
export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;

/** Clamp a value between min and max */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/** Smooth damp — frame-rate independent lerp, factor in (0,1) */
export const damp = (a: number, b: number, lambda: number, dt: number): number =>
  lerp(a, b, 1 - Math.exp(-lambda * dt));

/** Ease-in-out cubic — maps t in [0,1] to smooth curve */
export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Ease-out quad */
export const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t);

/** Map a value from one range to another */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number => ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

/** Round to n decimal places */
export const round = (value: number, decimals = 4): number =>
  Math.round(value * 10 ** decimals) / 10 ** decimals;
