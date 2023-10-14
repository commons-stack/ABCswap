pragma solidity 0.4.24;

import "@aragon/templates-shared/contracts/TokenCache.sol";
import "@aragon/os/contracts/common/SafeERC20.sol";
import "./AbcBaseTemplate.sol";

contract AbcTemplate is AbcBaseTemplate, TokenCache {
    using SafeERC20 for ERC20;

    string private constant ERROR_EMPTY_HOLDERS = "ABC_EMPTY_HOLDERS";
    string private constant ERROR_BAD_HOLDERS_STAKES_LEN = "ABC_BAD_HOLDERS_STAKES_LEN";
    string private constant ERROR_BAD_VOTE_SETTINGS = "ABC_BAD_VOTE_SETTINGS";
    string private constant ERROR_BAD_ABC_SETTINGS = "ABC_BAD_ABC_SETTINGS";
    string private constant ERROR_FUNDS_NOT_TRANSFERRED = "ABC_FUNDS_NOT_TRANSFERRED";

    bool private constant TOKEN_TRANSFERABLE = true;
    uint8 private constant TOKEN_DECIMALS = uint8(18);
    uint256 private constant TOKEN_MAX_PER_ACCOUNT = uint256(0);
    uint64 private constant DEFAULT_FINANCE_PERIOD = uint64(30 days);

    constructor(
        DAOFactory _daoFactory,
        ENS _ens,
        MiniMeTokenFactory _miniMeFactory,
        IFIFSResolvingRegistrar _aragonID,
        address _abcFormula
    ) public BaseTemplate(_daoFactory, _ens, _miniMeFactory, _aragonID) AbcBaseTemplate(_abcFormula) {
        _ensureAragonIdIsValid(_aragonID);
        _ensureMiniMeFactoryIsValid(_miniMeFactory);
    }

    /**
     * @dev Create a new MiniMe token and deploy a ABC DAO.
     * @param _tokenName String with the name for the token used by share holders in the organization
     * @param _tokenSymbol String with the symbol for the token used by share holders in the organization
     * @param _id String with the name for org, will assign `[id].aragonid.eth`
     * @param _holders Array of token holder addresses
     * @param _stakes Array of token stakes for holders (token has 18 decimals, multiply token amount `* 10^18`)
     * @param _votingSettings Array of [supportRequired, minAcceptanceQuorum, voteDuration] to set up the voting app of the organization
     * @param _abcSettings Array of [uint256 entryTribute, uint256 exitTribute, address collateralToken, uint32 reserveRatio, uint256 initialBalance]
     */
    function newTokenAndInstance(
        string _tokenName,
        string _tokenSymbol,
        string _id,
        address[] _holders,
        uint256[] _stakes,
        uint64[3] _votingSettings,
        uint256[5] _abcSettings
    ) external {
        newToken(_tokenName, _tokenSymbol);
        newInstance(_id, _holders, _stakes, _votingSettings, _abcSettings);
    }

    /**
     * @dev Create a new MiniMe token and cache it for the user
     * @param _name String with the name for the token used by share holders in the organization
     * @param _symbol String with the symbol for the token used by share holders in the organization
     */
    function newToken(string memory _name, string memory _symbol) public returns (MiniMeToken) {
        MiniMeToken token = _createToken(_name, _symbol, TOKEN_DECIMALS);
        _cacheToken(token, msg.sender);
        return token;
    }

    /**
     * @dev Deploy a ABC DAO using a previously cached MiniMe token
     * @param _id String with the name for org, will assign `[id].aragonid.eth`
     * @param _holders Array of token holder addresses
     * @param _stakes Array of token stakes for holders (token has 18 decimals, multiply token amount `* 10^18`)
     * @param _votingSettings Array of [supportRequired, minAcceptanceQuorum, voteDuration] to set up the voting app of the organization
     * @param _abcSettings Array of [uint256 entryTribute, uint256 exitTribute, address collateralToken, uint32 reserveRatio, uint256 initialBalance]
     *          for the Augmented Bonding Curve app.
     */
    function newInstance(
        string memory _id,
        address[] memory _holders,
        uint256[] memory _stakes,
        uint64[3] memory _votingSettings,
        uint256[5] memory _abcSettings
    ) public {
        _validateId(_id);
        _ensureAbcSettings(_holders, _stakes, _votingSettings, _abcSettings);

        (Kernel dao, ACL acl) = _createDAO();
        (TokenManager tokenManager, Voting voting,, Agent agent) =
            _unwrapApps(_setupApps(dao, acl, _holders, _stakes, _votingSettings));
        IAugmentedBondingCurve abc = _setupAbcApps(dao, acl, tokenManager, agent, _abcSettings);
        _setupAbcPermissions(acl, abc, tokenManager, voting);
        _transferRootPermissionsFromTemplateAndFinalizeDAO(dao, voting);
        _registerID(_id, dao);
    }

    function _setupApps(
        Kernel _dao,
        ACL _acl,
        address[] memory _holders,
        uint256[] memory _stakes,
        uint64[3] memory _votingSettings
    ) internal returns (address[4] memory) {
        MiniMeToken token = _popTokenCache(msg.sender);
        Agent agent = _installDefaultAgentApp(_dao);
        Finance finance = _installFinanceApp(_dao, agent, DEFAULT_FINANCE_PERIOD);
        TokenManager tokenManager = _installTokenManagerApp(_dao, token, TOKEN_TRANSFERABLE, TOKEN_MAX_PER_ACCOUNT);
        Voting voting = _installVotingApp(_dao, token, _votingSettings);

        _mintTokens(_acl, tokenManager, _holders, _stakes);
        _setupPermissions(_acl, agent, voting, finance, tokenManager);

        return [address(tokenManager), address(voting), address(finance), address(agent)];
    }

    function _setupAbcApps(
        Kernel _dao,
        ACL _acl,
        TokenManager _tokenManager,
        Agent _agent,
        uint256[5] memory _abcSettings
    ) internal returns (IAugmentedBondingCurve) {
        (
            uint256 entryTribute,
            uint256 exitTribute,
            address collateralToken,
            uint32 reserveRatio,
            uint256 initialBalance
        ) = _unwrapAbcSettings(_abcSettings);

        Vault reserve =
            Vault(_installNonDefaultApp(_dao, VAULT_APP_ID, abi.encodeWithSelector(Vault(0).initialize.selector)));
        IAugmentedBondingCurve abc = _installAbcApp(_dao, _tokenManager, reserve, _agent, entryTribute, exitTribute);
        _configureAbcApp(_acl, abc, collateralToken, reserveRatio);
        if (initialBalance > 0) {
            require(
                ERC20(collateralToken).safeTransferFrom(msg.sender, address(reserve), initialBalance),
                ERROR_FUNDS_NOT_TRANSFERRED
            );
        }
        return abc;
    }

    function _setupPermissions(ACL _acl, Agent _agent, Voting _voting, Finance _finance, TokenManager _tokenManager)
        internal
    {
        _createAgentPermissions(_acl, _agent, _voting, _voting);
        _createVaultPermissions(_acl, _agent, _finance, _voting);
        _createFinancePermissions(_acl, _finance, _voting, _voting);
        _createFinanceCreatePaymentsPermission(_acl, _finance, _voting, _voting);
        _createEvmScriptsRegistryPermissions(_acl, _voting, _voting);
        _createVotingPermissions(_acl, _voting, _voting, _tokenManager, _voting);
        _createTokenManagerPermissions(_acl, _tokenManager, _voting, address(this));
    }

    function _setupAbcPermissions(ACL _acl, IAugmentedBondingCurve _abc, TokenManager _tokenManager, Voting _voting)
        internal
    {
        _createAbcAndReservePermissions(_acl, _abc, _voting, _voting);
        _acl.grantPermission(_abc, _tokenManager, _tokenManager.MINT_ROLE());
        _acl.grantPermission(_abc, _tokenManager, _tokenManager.BURN_ROLE());
        _acl.setPermissionManager(_voting, _tokenManager, _tokenManager.MINT_ROLE());
        _acl.setPermissionManager(_voting, _tokenManager, _tokenManager.BURN_ROLE());
    }

    function _ensureAbcSettings(
        address[] memory _holders,
        uint256[] memory _stakes,
        uint64[3] memory _votingSettings,
        uint256[5] memory _abcSettings
    ) private pure {
        require(_holders.length > 0, ERROR_EMPTY_HOLDERS);
        require(_holders.length == _stakes.length, ERROR_BAD_HOLDERS_STAKES_LEN);
        require(_votingSettings.length == 3, ERROR_BAD_VOTE_SETTINGS);
        require(_abcSettings.length == 5, ERROR_BAD_ABC_SETTINGS);
    }

    function _unwrapApps(address[4] memory _apps) private pure returns (TokenManager, Voting, Finance, Agent) {
        return (TokenManager(_apps[0]), Voting(_apps[1]), Finance(_apps[2]), Agent(_apps[3]));
    }
}
