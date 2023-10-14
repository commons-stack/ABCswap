require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.4.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000
      }
    }
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://opt-mainnet.g.alchemy.com/v2/<API-KEY>"
      }
    },
    gnosis: {
      url: "https://rpc.gnosischain.com/",
    },
    optimism: {
      url: "https://opt-mainnet.g.alchemy.com/v2/<API-KEY>"
    }
  },
  etherscan: {
    apiKey: "<API-KEY>"
  }
};
