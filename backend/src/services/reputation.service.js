export function calculateReputation(metrics) {
  const influenceScore =
    metrics.staking * 0.4 +
    metrics.holders * 0.4 +
    metrics.age * 0.2;

  const trustScore = Math.min(100, influenceScore + 10);

  return { influenceScore, trustScore };
}
