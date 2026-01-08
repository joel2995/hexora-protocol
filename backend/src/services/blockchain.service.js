export async function mintOrUpdateCredentialNFT(
  wallet,
  influenceScore,
  trustScore,
  metrics
) {
  const { accountAgeDays, volatility } = metrics;

  // -------------------------
  // Mint rules
  // -------------------------
  const CAN_MINT =
    trustScore >= 60 &&
    accountAgeDays >= 14 &&
    volatility < 0.7;

  // -------------------------
  // Update rules
  // -------------------------
  const CAN_UPDATE =
    trustScore >= 40; // looser condition for updates

  if (CAN_MINT) {
    console.log(
      `[NFT] Mint / Update Credential for ${wallet}`,
      { influenceScore, trustScore }
    );
  } else if (CAN_UPDATE) {
    console.log(
      `[NFT] Update skipped (conditions not met) for ${wallet}`
    );
  } else {
    console.log(
      `[NFT] No NFT action for ${wallet}`
    );
  }

  // Actual on-chain call will be added after deployment
  return true;
}
