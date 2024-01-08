const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const vault = await ethers.deployContract("contracts/Vault.sol:Vault", owner);
  await vault.waitForDeployment();

  const vaultAddress = await vault.getAddress();
  console.log(`Deployed the Vault contract at ${vaultAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
