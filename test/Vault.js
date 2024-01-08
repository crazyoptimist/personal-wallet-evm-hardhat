const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault", function () {
  let owner, newOwner, user1;

  before(async function () {
    [owner, newOwner, user1] = await ethers.getSigners();

    // Deploy Vault contract
    this.vault = await ethers.deployContract(
      "contracts/Vault.sol:Vault",
      owner,
    );
    await this.vault.waitForDeployment();
    this.vaultAddress = await this.vault.getAddress();
  });

  it("can receive ETH, ERC20 tokens", async function () {
    await owner.sendTransaction({
      to: this.vaultAddress,
      value: ethers.parseEther("10"),
    });
    expect(await ethers.provider.getBalance(this.vaultAddress)).to.eq(
      ethers.parseEther("10"),
    );
  });

  it("can withdraw ETH, ERC20 tokens");

  it("can send ETH, ERC20 tokens");
});
