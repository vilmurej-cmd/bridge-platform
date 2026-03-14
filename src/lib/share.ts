import type { BridgeProfile } from "./demo-profile";

/**
 * Encode a partnership profile to a base64 string for URL sharing.
 */
export function encodeProfile(profile: BridgeProfile): string {
  try {
    const json = JSON.stringify(profile);
    if (typeof window !== "undefined") {
      return btoa(unescape(encodeURIComponent(json)));
    }
    return Buffer.from(json, "utf-8").toString("base64");
  } catch (error) {
    console.error("Failed to encode profile:", error);
    return "";
  }
}

/**
 * Decode a base64-encoded partnership profile back to an object.
 */
export function decodeProfile(encoded: string): BridgeProfile | null {
  try {
    let json: string;
    if (typeof window !== "undefined") {
      json = decodeURIComponent(escape(atob(encoded)));
    } else {
      json = Buffer.from(encoded, "base64").toString("utf-8");
    }
    return JSON.parse(json) as BridgeProfile;
  } catch (error) {
    console.error("Failed to decode profile:", error);
    return null;
  }
}

/**
 * Generate a formatted share text for a partnership profile.
 */
export function generateShareText(profile: BridgeProfile): string {
  const lines = [
    `${profile.partnershipName} — A BRIDGE Partnership`,
    "",
    profile.dreamSummary,
    "",
    `AI Partner Role: ${profile.partnerProfile.aiRole}`,
    `Session Plan: ${profile.sessionPlan.frequency}, ${profile.sessionPlan.sessionLength} each`,
    "",
    "First 3 Sessions:",
    ...profile.firstThreeSessions.map(
      (s) => `  ${s.session}. ${s.title} — ${s.focus}`
    ),
    "",
    `Partnership Score: ${profile.partnershipScore.overall}/100`,
    "",
    "---",
    "Built with BRIDGE — Your Dream Deserves a Partner",
    "https://bridge-platform.com",
  ];

  return lines.join("\n");
}
