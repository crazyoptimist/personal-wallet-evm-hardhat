const { ethers } = require("hardhat");

const VAULT_ADDRESS = "0x";
const NEW_OWNER_ADDRESS = "0x";

async function main() {
  const [owner] = await ethers.getSigners();

  const vault = await ethers.getContractAt(
    "contracts/Vault.sol:Vault",
    VAULT_ADDRESS,
  );

  await (
    await vault.connect(owner).transferOwnership(NEW_OWNER_ADDRESS)
  ).wait();

  const newOwner = await vault.owner();

  console.log(`Transferred ownership to ${newOwner}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
