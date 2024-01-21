require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

const ETH_FORK_BLOCK_NUMBER = 18963379;

const COMPILERS = [
  {
    version: "0.8.21",
  },
];

const OWNER_PRIVATE_KEY = vars.get("OWNER_PRIVATE_KEY");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: vars.get("ETH_URL"),
        blockNumber: ETH_FORK_BLOCK_NUMBER,
      },
    },
    ethereum: {
      url: vars.get("ETH_URL"),
      accounts: [OWNER_PRIVATE_KEY],
    },
  },
  solidity: {
    compilers: COMPILERS,
  },
  // Below 2 attributes are for contract verification
  etherscan: {
    apiKey: vars.get("ETHERSCAN_API_KEY"),
  },
  sourcify: {
    enabled: true,
  },
};
