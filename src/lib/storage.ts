import type { BridgeProfile } from "./demo-profile";

const STORAGE_KEY = "bridge-profile";

/**
 * Save a partnership profile to localStorage.
 */
export function saveProfile(profile: BridgeProfile): void {
  if (typeof window === "undefined") return;
  try {
    const serialized = JSON.stringify(profile);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error("Failed to save profile to localStorage:", error);
  }
}

/**
 * Retrieve the saved partnership profile from localStorage.
 * Returns null if no profile exists or if running on the server.
 */
export function getProfile(): BridgeProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return null;
    return JSON.parse(serialized) as BridgeProfile;
  } catch (error) {
    console.error("Failed to read profile from localStorage:", error);
    return null;
  }
}

/**
 * Remove the saved partnership profile from localStorage.
 */
export function clearProfile(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear profile from localStorage:", error);
  }
}
