import { ethers } from "hardhat";

async function main() {
  const vault = await ethers.deployContract("contracts/Vault.sol:Vault");
  await vault.waitForDeployment();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
