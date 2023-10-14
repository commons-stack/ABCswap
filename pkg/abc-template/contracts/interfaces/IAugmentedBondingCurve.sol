pragma solidity ^0.4.24;

import "@aragon/apps-token-manager/contracts/TokenManager.sol";
import "@aragon/apps-vault/contracts/Vault.sol";

interface IAugmentedBondingCurve {
    function initialize(
        TokenManager _tokenManager,
        address _formula,
        Vault _reserve,
        address _beneficiary,
        uint256 _entryTribute,
        uint256 _exitTribute
    ) external;
    function MANAGE_COLLATERAL_TOKEN_ROLE() external returns (bytes32);
    function MAKE_BUY_ORDER_ROLE() external returns (bytes32);
    function MAKE_SELL_ORDER_ROLE() external returns (bytes32);
    function addCollateralToken(
        address _collateral,
        uint256 _virtualSupply,
        uint256 _virtualBalance,
        uint32 _reserveRatio
    ) external;
    function reserve() external view returns (Vault);
}
