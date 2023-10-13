const { ethers } = require("hardhat");

async function main() {

    // Gnosis Chain
    // const daoFactory = "0x4037F97fcc94287257E50Bd14C7DA9Cb4Df18250";
    // const ens = "0xaAfCa6b0C89521752E559650206D7c925fD0e530";
    // const miniMeFactory = "0xf7d36d4d46CDA364eDc85E5561450183469484C5";
    // const aragonID = "0x0B3b17F9705783Bb51Ae8272F3245D6414229B36";
    // const formula = "0xA4e28453b4F3fcB251EEbe1aC2798eEE55e2bE6a";



    // Optimism:
    const daoFactory = "0x0a42106615233D0E6F9811d0cBb7ddC83170Fe5E"
    const ens = "0x6f2CA655f58d5fb94A08460aC19A552EB19909FD"
    const miniMeFactory = "0xb5314953f96e12cab6BdB9eaa79922e657783142"
    const aragonID = "0x44ADB013bE98F04d9E525d033E2D85Ce5E195D8F"
    const formula = "0x29c7e9fff64bde42faa6e8c0567a15290f7d948b"

    const template = await ethers.deployContract("AbcTemplate", [daoFactory, ens, miniMeFactory, aragonID, formula]);

    await template.waitForDeployment();

    console.log(
      `Contract deployed at ${template.target}`
    );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});