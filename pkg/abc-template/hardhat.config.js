require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_ID = 'ln15qqnK7vEODFKXum9YOeFOFZxUfkIh' //process.env.ALCHEMY_ID;

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
        url: `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`
      }
    },
    gnosis: {
      url: "https://rpc.gnosischain.com/",
    },
    optimism: {
      url: `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`
    }
  },
  // etherscan: {
  //   apiKey: "<API-KEY>"
  // }
};
