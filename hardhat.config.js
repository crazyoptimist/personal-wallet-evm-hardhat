require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const ETH_FORK_BLOCK_NUMBER = 18963379;

const COMPILERS = [
  {
    version: "0.8.21",
  },
];

const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: process.env.ETH_URL,
        blockNumber: ETH_FORK_BLOCK_NUMBER,
      },
    },
    ethereum: {
      url: process.env.ETH_URL,
      accounts: [OWNER_PRIVATE_KEY],
    },
  },
  solidity: {
    compilers: COMPILERS,
  },
  // Below 2 attributes are for contract verification
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  sourcify: {
    enabled: true,
  },
};
