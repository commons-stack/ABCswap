pragma solidity 0.4.24;

import "@aragon/os/contracts/common/IsContract.sol";
import "@aragon/os/contracts/acl/ACL.sol";
import "@aragon/os/contracts/kernel/Kernel.sol";
import "@aragon/os/contracts/common/Uint256Helpers.sol";
import "@aragon/apps-token-manager/contracts/TokenManager.sol";
import "@aragon/apps-vault/contracts/Vault.sol";
import "@aragon/templates-shared/contracts/BaseTemplate.sol";
import "./interfaces/IAugmentedBondingCurve.sol";

contract AbcBaseTemplate is BaseTemplate {
    using Uint256Helpers for uint256;

    /* Hardcoded constant to save gas
    * bytes32 constant internal ABC_APP_ID = keccak256(abi.encodePacked(apmNamehash("open"), keccak256("augmented-bonding-curve")));  // augmented-bonding-curve.open.aragonpm.eth
    */
    bytes32 internal constant ABC_APP_ID = 0x952fcbadf8d7288f1a8b47ed7ee931702318b527558093398674db0c93e3a75b;
    uint256 private constant VIRTUAL_SUPPLY = 0;
    uint256 private constant VIRTUAL_BALANCE = 0;
    string private constant ERROR_FORMULA_IS_NOT_CONTRACT = "TEMPLATE_FORMULA_IS_NOT_CONTRACT";
    string private constant ERROR_CANNOT_CAST_VALUE_TO_TYPE = "TEMPLATE_CANNOT_CAST_VALUE_TO_TYPE";
    address private formula;

    constructor(address _formula) public {
        require(isContract(_formula), ERROR_FORMULA_IS_NOT_CONTRACT);
        formula = _formula;
    }

    function _installAbcApp(
        Kernel _dao,
        TokenManager _tokenManager,
        Vault _reserve,
        address _beneficiary,
        uint256 _entryTribute,
        uint256 _exitTribute
    ) internal returns (IAugmentedBondingCurve) {
        bytes memory initializeData = abi.encodeWithSelector(
            IAugmentedBondingCurve(0).initialize.selector,
            _tokenManager,
            formula,
            _reserve,
            _beneficiary,
            _entryTribute,
            _exitTribute
        );
        return IAugmentedBondingCurve(_installNonDefaultApp(_dao, ABC_APP_ID, initializeData));
    }

    function _configureAbcApp(ACL _acl, IAugmentedBondingCurve _abc, address _collateralToken, uint32 _reserveRatio)
        internal
    {
        _createPermissionForTemplate(_acl, _abc, _abc.MANAGE_COLLATERAL_TOKEN_ROLE());
        _abc.addCollateralToken(_collateralToken, VIRTUAL_SUPPLY, VIRTUAL_BALANCE, _reserveRatio);
        _removePermissionFromTemplate(_acl, _abc, _abc.MANAGE_COLLATERAL_TOKEN_ROLE());
    }

    function _createAbcAndReservePermissions(
        ACL _acl,
        IAugmentedBondingCurve _abc,
        address _collateralManager,
        address _permissionsManager
    ) internal {
        Vault _reserve = _abc.reserve();
        _acl.createPermission(_collateralManager, _abc, _abc.MANAGE_COLLATERAL_TOKEN_ROLE(), _permissionsManager);
        _acl.createPermission(_acl.ANY_ENTITY(), _abc, _abc.MAKE_BUY_ORDER_ROLE(), _permissionsManager);
        _acl.createPermission(_acl.ANY_ENTITY(), _abc, _abc.MAKE_SELL_ORDER_ROLE(), _permissionsManager);
        _acl.createPermission(_abc, _reserve, _reserve.TRANSFER_ROLE(), _permissionsManager);
    }

    function _unwrapAbcSettings(uint256[5] memory _abcSettings)
        internal
        pure
        returns (
            uint256 entryTribute,
            uint256 exitTribute,
            address collateralToken,
            uint32 reserveRatio,
            uint256 initialBalance
        )
    {
        entryTribute = _abcSettings[0];
        exitTribute = _abcSettings[1];
        collateralToken = _toAddress(_abcSettings[2]);
        reserveRatio = _toUint32(_abcSettings[3]);
        initialBalance = _abcSettings[4];
    }

    /* HELPERS */

    function _toAddress(uint256 _value) private pure returns (address) {
        require(_value <= uint160(-1), ERROR_CANNOT_CAST_VALUE_TO_TYPE);
        return address(_value);
    }

    function _toUint32(uint256 _value) private pure returns (uint32) {
        require(_value <= uint32(-1), ERROR_CANNOT_CAST_VALUE_TO_TYPE);
        return uint32(_value);
    }
}
