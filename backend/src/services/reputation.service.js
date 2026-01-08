// All scores normalized to 0–100

export function calculateReputation(metrics) {
  const {
    recentStakeVolume,      // last N days stake
    stakeGrowthRate,        // % growth
    newHolders,             // recent holders
    holderRetention,        // 0–1
    accountAgeDays,         // days
    volatility              // 0–1 (1 = very volatile)
  } = metrics;

  // ------------------
  // Influence Score (FAST)
  // ------------------
  let influenceScore =
    recentStakeVolume * 0.30 +
    stakeGrowthRate * 0.25 +
    newHolders * 0.25 +
    (1 - volatility) * 20;   // stability bonus

  influenceScore = Math.min(100, Math.max(0, influenceScore));

  // ------------------
  // Trust Score (SLOW)
  // ------------------
  let trustScore =
    accountAgeDays * 0.20 +
    holderRetention * 40 +
    (1 - volatility) * 25 +
    recentStakeVolume * 0.15;

  trustScore = Math.min(100, Math.max(0, trustScore));

  return {
    influenceScore: Math.round(influenceScore),
    trustScore: Math.round(trustScore)
  };
}
