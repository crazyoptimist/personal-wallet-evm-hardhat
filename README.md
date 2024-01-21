# Smart Wallet

Personal Wallet on EVM

### Run tests

```bash
npm test
```

### Configure Variables

`npm test` command will let you know what configuration variables should be set. Set all the variables until tests are passed.

Doc: [Hardhat Configuration Variables](https://hardhat.org/hardhat-runner/docs/guides/configuration-variables)

### Deploy to Ethereum network

```bash
npx hardhat run scripts/deployVault.js --network ethereum
```

Upon successful deployment, `DEPLOYED_ADDRESS` will be printed to stdout.

### Verify on Etherscan

```bash
npx hardhat verify --network ethereum DEPLOYED_ADDRESS
```
