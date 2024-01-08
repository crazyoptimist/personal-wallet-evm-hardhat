# Smart Wallet

Personal Wallet on EVM

### Deploy to Ethereum network

```bash
npx hardhat run scripts/deployVault.js --network ethereum
```

Upon successful deployment, `DEPLOYED_ADDRESS` will be printed to stdout.

### Verify on Etherscan

```bash
npx hardhat verify --network ethereum DEPLOYED_ADDRESS
```
