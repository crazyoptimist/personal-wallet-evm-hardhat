const { expect } = require("chai");
const { ethers } = require("hardhat");
const networkHelpers = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Vault", function () {
  let deployer, owner, user1;
  const USDC_TOKEN_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const USDC_WHALE_ADDRESS = "0xF977814e90dA44bFA03b6295A0616a897441aceC";
  const INITIAL_VAULT_ETH_BALANCE = ethers.parseEther("10");
  const INITIAL_VAULT_USDC_BALANCE = ethers.parseUnits("1000", 6);
  const ONE_ETH = ethers.parseEther("1");
  const HUNDRED_USDC = ethers.parseUnits("100", 6);

  before(async function () {
    [deployer, owner, user1] = await ethers.getSigners();

    // Deploy Vault contract
    this.vault = await ethers.deployContract(
      "contracts/Vault.sol:Vault",
      deployer,
    );
    await this.vault.waitForDeployment();
    this.vaultAddress = await this.vault.getAddress();

    // Load USDC token contract
    this.usdc = await ethers.getContractAt(
      "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
      USDC_TOKEN_ADDRESS,
    );
  });

  it("can receive ETH, ERC20 tokens", async function () {
    await deployer.sendTransaction({
      to: this.vaultAddress,
      value: INITIAL_VAULT_ETH_BALANCE,
    });
    expect(await ethers.provider.getBalance(this.vaultAddress)).to.eq(
      INITIAL_VAULT_ETH_BALANCE,
    );

    const usdcWhale = await ethers.getImpersonatedSigner(USDC_WHALE_ADDRESS);
    await this.usdc
      .connect(usdcWhale)
      .transfer(this.vaultAddress, INITIAL_VAULT_USDC_BALANCE);
    expect(await this.usdc.balanceOf(this.vaultAddress)).to.eq(
      INITIAL_VAULT_USDC_BALANCE,
    );
  });

  it("can transfer ownership", async function () {
    await this.vault.transferOwnership(owner.address);
    expect(await this.vault.owner()).to.eq(owner.address);
  });

  it("prevents unauthorized action", async function () {
    await expect(this.vault.connect(user1).withdraw()).to.reverted;
  });

  it("can send ETH, ERC20 tokens", async function () {
    // Set user1 initial balance to 1 ETH
    await networkHelpers.setBalance(user1.address, ethers.parseEther("1"));

    // Send 1 ETH to user1
    await this.vault.connect(owner).sendETH(ONE_ETH, user1.address);
    expect(await ethers.provider.getBalance(user1.address)).to.eq(
      ethers.parseEther("2"),
    );

    // Send 100 USDC to user1
    await this.vault
      .connect(owner)
      .sendToken(USDC_TOKEN_ADDRESS, HUNDRED_USDC, user1.address);
    expect(await this.usdc.balanceOf(user1.address)).to.equal(HUNDRED_USDC);
  });

  it("can withdraw ETH, ERC20 tokens", async function () {
    const ownerInitialBalance = await ethers.provider.getBalance(owner.address);
    await this.vault.connect(owner).withdraw();
    await this.vault.connect(owner).withdrawToken(USDC_TOKEN_ADDRESS);

    expect(await ethers.provider.getBalance(owner.address)).to.gt(
      ownerInitialBalance +
        INITIAL_VAULT_ETH_BALANCE -
        ONE_ETH -
        ethers.parseEther("0.01"),
    );
    expect(await this.usdc.balanceOf(owner.address)).to.eq(
      INITIAL_VAULT_USDC_BALANCE - HUNDRED_USDC,
    );
  });

  it("can withdraw ETH to another address", async function () {
    await owner.sendTransaction({
      to: this.vaultAddress,
      value: ONE_ETH,
    });

    await this.vault.connect(owner).withdrawTo(user1.address);

    expect(await ethers.provider.getBalance(user1.address)).to.eq(
      ethers.parseEther("3"),
    );
  });
});
