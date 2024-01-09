const { ethers } = require("hardhat");

const VAULT_ADDRESS = "0x";
const AMOUNT_ETH_OUT = ethers.parseEther("0.05");
const DESTINATION = "0x";

async function main() {
  const [owner] = await ethers.getSigners();

  const vault = await ethers.getContractAt(
    "contracts/Vault.sol:Vault",
    VAULT_ADDRESS,
  );

  await (
    await vault.connect(owner).sendETH(AMOUNT_ETH_OUT, DESTINATION)
  ).wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
