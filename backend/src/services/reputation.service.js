// ================================
// CONFIGURATION
// ================================

const INFLUENCE_COOLDOWN_MINUTES = 15;
const TRUST_COOLDOWN_HOURS = 24;

// ================================
// COOLDOWN HELPERS (Layer 1)
// ================================

export function canUpdateInfluence(lastUpdate) {
  if (!lastUpdate) return true;

  return (
    Date.now() - lastUpdate.getTime() >
    INFLUENCE_COOLDOWN_MINUTES * 60 * 1000
  );
}

export function canUpdateTrust(lastUpdate) {
  if (!lastUpdate) return true;

  return (
    Date.now() - lastUpdate.getTime() >
    TRUST_COOLDOWN_HOURS * 60 * 60 * 1000
  );
}

// ================================
// L2.2 — ANTI-MANIPULATION DAMPENING
// ================================

function applyInfluenceDampening(
  influenceScore,
  { stakeGrowthRate, holderRetention, volatility }
) {
  let adjustedScore = influenceScore;

  // 🚩 Pump-like behavior:
  // Very fast growth but users don’t stay
  if (stakeGrowthRate > 5 && holderRetention < 0.3) {
    adjustedScore *= 0.7; // reduce by 30%
  }

  // 🚩 Extreme volatility penalty
  if (volatility > 0.8) {
    adjustedScore *= 0.6; // reduce by 40%
  }

  return adjustedScore;
}

// ================================
// CORE REPUTATION MODEL (0–100)
// ================================

export function calculateReputation(metrics) {
  const {
    recentStakeVolume,   // normalized 0–100
    stakeGrowthRate,     // normalized 0–10
    newHolders,          // normalized 0–100
    holderRetention,     // 0–1
    accountAgeDays,      // normalized 0–100
    volatility           // 0–1
  } = metrics;

  // -------------------------------
  // INFLUENCE SCORE (FAST, MOMENTUM)
  // -------------------------------

  let influenceScore =
    recentStakeVolume * 0.30 +
    stakeGrowthRate * 0.25 +
    newHolders * 0.25 +
    (1 - volatility) * 20;

  // Normalize
  influenceScore = Math.min(100, Math.max(0, influenceScore));

  // Apply L2.2 dampening
  influenceScore = applyInfluenceDampening(influenceScore, metrics);

  influenceScore = Math.round(
    Math.min(100, Math.max(0, influenceScore))
  );

  // -------------------------------
  // TRUST SCORE (SLOW, STABLE)
  // -------------------------------

  let trustScore =
    accountAgeDays * 0.20 +
    holderRetention * 40 +
    (1 - volatility) * 25 +
    recentStakeVolume * 0.15;

  trustScore = Math.round(
    Math.min(100, Math.max(0, trustScore))
  );

  return {
    influenceScore,
    trustScore
  };
}

export function applyDecay(score, daysInactive) {
  const decayRate = 0.5; // % per day
  const decayed = score - daysInactive * decayRate;
  return Math.max(0, Math.round(decayed));
}
