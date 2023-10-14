const { ethers, network } = require("hardhat");

// Optimism:
const daoFactory = "0x0a42106615233D0E6F9811d0cBb7ddC83170Fe5E"
const _ens = "0x6f2CA655f58d5fb94A08460aC19A552EB19909FD"
const _miniMeFactory = "0xb5314953f96e12cab6BdB9eaa79922e657783142"
const _aragonID = "0x44ADB013bE98F04d9E525d033E2D85Ce5E195D8F"
const _formula = "0x29c7e9fff64bde42faa6e8c0567a15290f7d948b"
const _reserveToken = "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1"

const pct = (n) => BigInt(n) * BigInt(10 ** 16);
const wad = (n) => BigInt(n) * BigInt(10 ** 18);

describe("AbcTemplate contract", function () {
  it("Deployment should work", async function () {
    const [owner] = await ethers.getSigners();

    const daiHolder = '0x2de373887b9742162c9a5885ddb5debea8e4486d'
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [daiHolder],
    });
    const signer = await ethers.getSigner(daiHolder);

    const abcTemplate = await ethers.deployContract("AbcTemplate", [
        daoFactory,
        _ens,
        _miniMeFactory,
        _aragonID,
        _formula
    ]);

    const reserveToken = new ethers.Contract(_reserveToken, ["function approve(address spender, uint256 value) public returns (bool)"], signer);

    await reserveToken.approve(await abcTemplate.getAddress(), wad(3n * 10n ** 18n));

    await abcTemplate.connect(signer).newTokenAndInstance(
        "Token Name",
        "TKN",
        "daoname",
        [owner.address],
        [wad(1)],
        [pct(50), pct(15), 7 * 24 * 60 * 60],
        [pct(1), pct(2), _reserveToken, 20e4, wad(3n * 10n ** 18n)],
        { from : daiHolder }
    );

  });
});
