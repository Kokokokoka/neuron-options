/**
 * SPDX-License-Identifier: UNLICENSED
 */
pragma solidity 0.8.9;

pragma experimental ABIEncoderV2;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {MarginVault} from "../libs/MarginVault.sol";
import {Actions} from "../libs/Actions.sol";
import {AddressBookInterface} from "../interfaces/AddressBookInterface.sol";
import {OtokenInterface} from "../interfaces/OtokenInterface.sol";
import {MarginCalculatorInterface} from "../interfaces/MarginCalculatorInterface.sol";
import {OracleInterface} from "../interfaces/OracleInterface.sol";
import {WhitelistInterface} from "../interfaces/WhitelistInterface.sol";
import {MarginPoolInterface} from "../interfaces/MarginPoolInterface.sol";
import {CalleeInterface} from "../interfaces/CalleeInterface.sol";
import {ArrayAddressUtils} from "../libs/ArrayAddressUtils.sol";
import {FPI} from "../libs/FixedPointInt256.sol";

import "hardhat/console.sol";

/**
 * Controller Error Codes
 * C1: sender is not full pauser
 * C2: sender is not partial pauser
 * C3: callee is not a whitelisted address
 * C4: system is partially paused
 * C5: system is fully paused
 * C6: msg.sender is not authorized to run action
 * C7: invalid addressbook address
 * C8: invalid owner address
 * C9: invalid input
 * C10: fullPauser cannot be set to address zero
 * C11: partialPauser cannot be set to address zero
 * C12: can not run actions for different owners
 * C13: can not run actions on different vaults
 * C14: invalid final vault state
 * C15: can not run actions on inexistent vault
 * C16: cannot deposit long otoken from this address
 * C17: otoken is not whitelisted to be used as collateral
 * C18: otoken used as collateral is already expired
 * C19: can not withdraw an expired otoken
 * C20: cannot deposit collateral from this address
 * C21: asset is not whitelisted to be used as collateral
 * C22: can not withdraw collateral from a vault with an expired short otoken
 * C23: otoken is not whitelisted to be minted
 * C24: can not mint expired otoken
 * C25: cannot burn from this address
 * C26: can not burn expired otoken
 * C27: otoken is not whitelisted to be redeemed
 * C28: can not redeem un-expired otoken
 * C29: asset prices not finalized yet
 * C30: can't settle vault with no otoken
 * C31: can not settle vault with un-expired otoken
 * C32: can not settle undercollateralized vault
 * C33: can not liquidate vault
 * C34: can not leave less than collateral dust
 * C35: invalid vault id
 * C36: cap amount should be greater than zero
 * C37: collateral exceed naked margin cap
 * C38: assets and amounts length must be the same
 * C39: vault is not associated with oToken
 * C40: assets array should be the same as associated oToken collateralAssers array
 * C41: otoken is not associated with vault
 */

/**
 * @title Controller
 * @notice Contract that controls the Gamma Protocol and the interaction of all sub contracts
 */
contract Controller is OwnableUpgradeable, ReentrancyGuardUpgradeable {
    using MarginVault for MarginVault.Vault;
    using SafeMath for uint256;
    using ArrayAddressUtils for address[];

    AddressBookInterface public addressbook;
    WhitelistInterface public whitelist;
    OracleInterface public oracle;
    MarginCalculatorInterface public calculator;
    MarginPoolInterface public pool;

    ///@dev scale used in MarginCalculator
    uint256 internal constant BASE = 8;

    /// @notice address that has permission to partially pause the system, where system functionality is paused
    /// except redeem and settleVault
    address public partialPauser;

    /// @notice address that has permission to fully pause the system, where all system functionality is paused
    address public fullPauser;

    /// @notice True if all system functionality is paused other than redeem and settle vault
    bool public systemPartiallyPaused;

    /// @notice True if all system functionality is paused
    bool public systemFullyPaused;

    /// @notice True if a call action can only be executed to a whitelisted callee
    bool public callRestricted;

    /// @dev mapping between an owner address and the number of owner address vaults
    mapping(address => uint256) public accountVaultCounter;
    /// @dev mapping between an owner address and a specific vault using a vault id
    mapping(address => mapping(uint256 => MarginVault.Vault)) public vaults;
    /// @dev mapping between an account owner and their approved or unapproved account operators
    mapping(address => mapping(address => bool)) internal operators;

    /******************************************************************** V2.0.0 storage upgrade ******************************************************/

    /// @dev mapping to store the timestamp at which the vault was last updated, will be updated in every action that changes the vault state or when calling sync()
    mapping(address => mapping(uint256 => uint256)) internal vaultLatestUpdate;

    /// @dev mapping to store cap amount for naked margin vault per options collateral asset (scaled by collateral asset decimals)
    // mapping(address => uint256) internal nakedCap;

    /// @dev mapping to store amount of naked margin vaults in pool
    // mapping(address => uint256) internal nakedPoolBalance;

    /// @notice emits an event when an account operator is updated for a specific account owner
    event AccountOperatorUpdated(address indexed accountOwner, address indexed operator, bool isSet);
    /// @notice emits an event when a new vault is opened
    event VaultOpened(address indexed accountOwner, uint256 vaultId);
    /// @notice emits an event when a long oToken is deposited into a vault
    event LongOtokenDeposited(
        address indexed otoken,
        address indexed accountOwner,
        address indexed from,
        uint256 vaultId,
        uint256 amount
    );
    /// @notice emits an event when a long oToken is withdrawn from a vault
    event LongOtokenWithdrawed(
        address indexed otoken,
        address indexed accountOwner,
        address indexed to,
        uint256 vaultId,
        uint256 amount
    );
    /// @notice emits an event when a collateral asset is deposited into a vault
    event CollateralAssetDeposited(
        address indexed asset,
        address indexed accountOwner,
        address indexed from,
        uint256 vaultId,
        uint256 amount
    );
    /// @notice emits an event when a collateral asset is withdrawn from a vault
    event CollateralAssetWithdrawed(
        address indexed asset,
        address indexed accountOwner,
        address indexed to,
        uint256 vaultId,
        uint256 amount
    );
    /// @notice emits an event when a short oToken is minted from a vault
    event ShortOtokenMinted(
        address indexed otoken,
        address indexed accountOwner,
        address indexed to,
        uint256 vaultId,
        uint256 amount
    );
    /// @notice emits an event when a short oToken is burned
    event ShortOtokenBurned(
        address indexed otoken,
        address indexed accountOwner,
        address indexed from,
        uint256 vaultId,
        uint256 amount
    );
    /// @notice emits an event when an oToken is redeemed
    event Redeem(
        address indexed otoken,
        address indexed redeemer,
        address indexed receiver,
        address[] collateralAssets,
        uint256 otokenBurned,
        uint256[] payouts
    );
    /// @notice emits an event when a vault is settled
    event VaultSettled(
        address indexed accountOwner,
        address indexed shortOtoken,
        address to,
        uint256[] payouts,
        uint256 vaultId
    );
    /// @notice emits an event when a vault is liquidated
    event VaultLiquidated(
        address indexed liquidator,
        address indexed receiver,
        address indexed vaultOwner,
        uint256 auctionPrice,
        uint256 auctionStartingRound,
        uint256 collateralPayout,
        uint256 debtAmount,
        uint256 vaultId
    );
    /// @notice emits an event when a call action is executed
    event CallExecuted(address indexed from, address indexed to, bytes data);
    /// @notice emits an event when the fullPauser address changes
    event FullPauserUpdated(address indexed oldFullPauser, address indexed newFullPauser);
    /// @notice emits an event when the partialPauser address changes
    event PartialPauserUpdated(address indexed oldPartialPauser, address indexed newPartialPauser);
    /// @notice emits an event when the system partial paused status changes
    event SystemPartiallyPaused(bool isPaused);
    /// @notice emits an event when the system fully paused status changes
    event SystemFullyPaused(bool isPaused);
    /// @notice emits an event when the call action restriction changes
    event CallRestricted(bool isRestricted);
    /// @notice emits an event when a donation transfer executed
    event Donated(address indexed donator, address indexed asset, uint256 amount);
    /// @notice emits an event when naked cap is updated
    // event NakedCapUpdated(address indexed collateral, uint256 cap);

    /**
     * @notice modifier to check if the system is not partially paused, where only redeem and settleVault is allowed
     */
    modifier notPartiallyPaused() {
        _isNotPartiallyPaused();

        _;
    }

    /**
     * @notice modifier to check if the system is not fully paused, where no functionality is allowed
     */
    modifier notFullyPaused() {
        _isNotFullyPaused();

        _;
    }

    /**
     * @notice modifier to check if sender is the fullPauser address
     */
    modifier onlyFullPauser() {
        require(msg.sender == fullPauser, "C1");

        _;
    }

    /**
     * @notice modifier to check if the sender is the partialPauser address
     */
    modifier onlyPartialPauser() {
        require(msg.sender == partialPauser, "C2");

        _;
    }

    /**
     * @notice modifier to check if the sender is the account owner or an approved account operator
     * @param _sender sender address
     * @param _accountOwner account owner address
     */
    modifier onlyAuthorized(address _sender, address _accountOwner) {
        _isAuthorized(_sender, _accountOwner);

        _;
    }

    /**
     * @notice modifier to check if the called address is a whitelisted callee address
     * @param _callee called address
     */
    modifier onlyWhitelistedCallee(address _callee) {
        if (callRestricted) {
            // require(_isCalleeWhitelisted(_callee), "C3");
            require(whitelist.isWhitelistedCallee(_callee), "C3");
        }

        _;
    }

    /**
     * @dev check if the system is not in a partiallyPaused state
     */
    function _isNotPartiallyPaused() internal view {
        require(!systemPartiallyPaused, "C4");
    }

    /**
     * @dev check if the system is not in an fullyPaused state
     */
    function _isNotFullyPaused() internal view {
        require(!systemFullyPaused, "C5");
    }

    /**
     * @dev check if the sender is an authorized operator
     * @param _sender msg.sender
     * @param _accountOwner owner of a vault
     */
    function _isAuthorized(address _sender, address _accountOwner) internal view {
        require((_sender == _accountOwner) || (operators[_accountOwner][_sender]), "C6");
    }

    /**
     * @notice initalize the deployed contract
     * @param _addressBook addressbook module
     * @param _owner account owner address
     */
    function initialize(address _addressBook, address _owner) external initializer {
        require(_addressBook != address(0), "C7");
        require(_owner != address(0), "C8");

        __Ownable_init();
        transferOwnership(_owner);
        __ReentrancyGuard_init_unchained();

        addressbook = AddressBookInterface(_addressBook);
        _refreshConfigInternal();

        callRestricted = true;
    }

    /**
     * @notice send asset amount to margin pool
     * @dev use donate() instead of direct transfer() to store the balance in assetBalance
     * @param _asset asset address
     * @param _amount amount to donate to pool
     */
    function donate(address _asset, uint256 _amount) external {
        pool.transferToPool(_asset, msg.sender, _amount);

        emit Donated(msg.sender, _asset, _amount);
    }

    /**
     * @notice allows the partialPauser to toggle the systemPartiallyPaused variable and partially pause or partially unpause the system
     * @dev can only be called by the partialPauser
     * @param _partiallyPaused new boolean value to set systemPartiallyPaused to
     */
    function setSystemPartiallyPaused(bool _partiallyPaused) external onlyPartialPauser {
        require(systemPartiallyPaused != _partiallyPaused, "C9");

        systemPartiallyPaused = _partiallyPaused;

        emit SystemPartiallyPaused(systemPartiallyPaused);
    }

    /**
     * @notice allows the fullPauser to toggle the systemFullyPaused variable and fully pause or fully unpause the system
     * @dev can only be called by the fullyPauser
     * @param _fullyPaused new boolean value to set systemFullyPaused to
     */
    function setSystemFullyPaused(bool _fullyPaused) external onlyFullPauser {
        require(systemFullyPaused != _fullyPaused, "C9");

        systemFullyPaused = _fullyPaused;

        emit SystemFullyPaused(systemFullyPaused);
    }

    /**
     * @notice allows the owner to set the fullPauser address
     * @dev can only be called by the owner
     * @param _fullPauser new fullPauser address
     */
    function setFullPauser(address _fullPauser) external onlyOwner {
        require(_fullPauser != address(0), "C10");
        require(fullPauser != _fullPauser, "C9");
        emit FullPauserUpdated(fullPauser, _fullPauser);
        fullPauser = _fullPauser;
    }

    /**
     * @notice allows the owner to set the partialPauser address
     * @dev can only be called by the owner
     * @param _partialPauser new partialPauser address
     */
    function setPartialPauser(address _partialPauser) external onlyOwner {
        require(_partialPauser != address(0), "C11");
        require(partialPauser != _partialPauser, "C9");
        emit PartialPauserUpdated(partialPauser, _partialPauser);
        partialPauser = _partialPauser;
    }

    /**
     * @notice allows the owner to toggle the restriction on whitelisted call actions and only allow whitelisted
     * call addresses or allow any arbitrary call addresses
     * @dev can only be called by the owner
     * @param _isRestricted new call restriction state
     */
    function setCallRestriction(bool _isRestricted) external onlyOwner {
        require(callRestricted != _isRestricted, "C9");

        callRestricted = _isRestricted;

        emit CallRestricted(callRestricted);
    }

    /**
     * @notice allows a user to give or revoke privileges to an operator which can act on their behalf on their vaults
     * @dev can only be updated by the vault owner
     * @param _operator operator that the sender wants to give privileges to or revoke them from
     * @param _isOperator new boolean value that expresses if the sender is giving or revoking privileges for _operator
     */
    function setOperator(address _operator, bool _isOperator) external {
        require(operators[msg.sender][_operator] != _isOperator, "C9");

        operators[msg.sender][_operator] = _isOperator;

        emit AccountOperatorUpdated(msg.sender, _operator, _isOperator);
    }

    /**
     * @dev updates the configuration of the controller. can only be called by the owner
     */
    function refreshConfiguration() external onlyOwner {
        _refreshConfigInternal();
    }

    /**
     * @notice set cap amount for collateral asset used in naked margin
     * @dev can only be called by owner
     * @param _collateral collateral asset address
     * @param _cap cap amount, should be scaled by collateral asset decimals
     */
    // function setNakedCap(address _collateral, uint256 _cap) external onlyOwner {
    //     require(_cap > 0, "C36");

    //     nakedCap[_collateral] = _cap;

    //     emit NakedCapUpdated(_collateral, _cap);
    // }

    /**
     * @notice execute a number of actions on specific vaults
     * @dev can only be called when the system is not fully paused
     * @param _actions array of actions arguments
     */
    function operate(Actions.ActionArgs[] memory _actions) external nonReentrant notFullyPaused {
        (bool vaultUpdated, address vaultOwner, uint256 vaultId) = _runActions(_actions);
        if (vaultUpdated) {
            _verifyFinalState(vaultOwner, vaultId);
            vaultLatestUpdate[vaultOwner][vaultId] = block.timestamp;
        }
    }

    /**
     * @notice sync vault latest update timestamp
     * @dev anyone can update the latest time the vault was touched by calling this function
     * vaultLatestUpdate will sync if the vault is well collateralized
     * @param _owner vault owner address
     * @param _vaultId vault id
     */
    function sync(address _owner, uint256 _vaultId) external nonReentrant notFullyPaused {
        _verifyFinalState(_owner, _vaultId);
        vaultLatestUpdate[_owner][_vaultId] = block.timestamp;
    }

    /**
     * @notice check if a specific address is an operator for an owner account
     * @param _owner account owner address
     * @param _operator account operator address
     * @return True if the _operator is an approved operator for the _owner account
     */
    function isOperator(address _owner, address _operator) external view returns (bool) {
        return operators[_owner][_operator];
    }

    /**
     * @notice return a vault's proceeds pre or post expiry, the amount of collateral that can be removed from a vault
     * @param _owner account owner of the vault
     * @param _vaultId vaultId to return balances for
     * @return amount of collateral that can be taken out
     */
    function getProceed(address _owner, uint256 _vaultId) external view returns (uint256[] memory) {
        (MarginVault.Vault memory vault, ) = getVaultWithDetails(_owner, _vaultId);
        return calculator.getExcessCollateral(vault);
    }

    /**
     * @notice get an oToken's payout/cash value after expiry, in the collateral asset
     * @param _otoken oToken address
     * @param _amount amount of the oToken to calculate the payout for, always represented in 1e8
     * @return amount of collateral to pay out
     */
    // function getPayout(address _otoken, uint256 _amount) public view returns (uint256[] memory) {
    //     // payoutsRaw continats amounts of each of collateral asset in collateral asset decimals to be paid out for 1e8 of the oToken
    //     return calculator.getPayout(_otoken, _amount);
    // }

    /**
     * @dev return if an expired oToken is ready to be settled, only true when price for underlying,
     * strike and collateral assets at this specific expiry is available in our Oracle module
     * @param _otoken oToken
     */
    // function isSettlementAllowed(address _otoken) external view returns (bool) {
    //     (address[] memory collaterals, address underlying, address strike, uint256 expiry) = _getOtokenDetails(_otoken);
    //     return _canSettleAssets(underlying, strike, collaterals, expiry);
    // }

    /**
     * @dev return if underlying, strike, collateral are all allowed to be settled
     * @param _underlying oToken underlying asset
     * @param _strike oToken strike asset
     * @param _collaterals oToken collateral assets
     * @param _expiry otoken expiry timestamp
     * @return True if the oToken has expired AND all oracle prices at the expiry timestamp have been finalized, False if not
     */
    function canSettleAssets(
        address _underlying,
        address _strike,
        address[] memory _collaterals,
        uint256 _expiry
    ) external view returns (bool) {
        return _canSettleAssets(_underlying, _strike, _collaterals, _expiry);
    }

    /**
     * @notice get the number of vaults for a specified account owner
     * @param _accountOwner account owner address
     * @return number of vaults
     */
    // function getAccountVaultCounter(address _accountOwner) external view returns (uint256) {
    //     return accountVaultCounter[_accountOwner];
    // }

    /**
     * @notice check if an oToken has expired
     * @param _otoken oToken address
     * @return True if the otoken has expired, False if not
     */
    // function hasExpired(address _otoken) external view returns (bool) {
    //     return block.timestamp >= OtokenInterface(_otoken).expiryTimestamp();
    // }

    /**
     * @notice return a specific vault
     * @param _owner account owner
     * @param _vaultId vault id of vault to return
     * @return Vault struct that corresponds to the _vaultId of _owner
     */
    function getVault(address _owner, uint256 _vaultId) external view returns (MarginVault.Vault memory) {
        return (vaults[_owner][_vaultId]);
    }

    /**
     * @notice return a specific vault
     * @param _owner account owner
     * @param _vaultId vault id of vault to return
     * @return Vault struct that corresponds to the _vaultId of _owner, vault type and the latest timestamp when the vault was updated
     */
    function getVaultWithDetails(address _owner, uint256 _vaultId)
        public
        view
        returns (MarginVault.Vault memory, uint256)
    {
        return (vaults[_owner][_vaultId], vaultLatestUpdate[_owner][_vaultId]);
    }

    /**
     * @notice get cap amount for collateral asset
     * @param _asset collateral asset address
     * @return cap amount
     */
    // function getNakedCap(address _asset) external view returns (uint256) {
    //     return nakedCap[_asset];
    // }

    /**
     * @notice get amount of collateral deposited in all naked margin vaults
     * @param _asset collateral asset address
     * @return naked pool balance
     */
    // function getNakedPoolBalance(address _asset) external view returns (uint256) {
    //     return nakedPoolBalance[_asset];
    // }

    /**
     * @notice execute a variety of actions
     * @dev for each action in the action array, execute the corresponding action, only one vault can be modified
     * for all actions except SettleVault, Redeem, and Call
     * @param _actions array of type Actions.ActionArgs[], which expresses which actions the user wants to execute
     * @return vaultUpdated, indicates if a vault has changed
     * @return owner, the vault owner if a vault has changed
     * @return vaultId, the vault Id if a vault has changed
     */
    function _runActions(Actions.ActionArgs[] memory _actions)
        internal
        returns (
            bool,
            address,
            uint256
        )
    {
        address vaultOwner;
        uint256 vaultId;
        bool vaultUpdated;

        for (uint256 i = 0; i < _actions.length; i++) {
            Actions.ActionArgs memory action = _actions[i];
            Actions.ActionType actionType = action.actionType;

            // Check to assets and amounts length to be the same
            require(action.assets.length == action.amounts.length, "C38");

            // actions except Settle, Redeem, Liquidate and Call are "Vault-updating actinos"
            // only allow update 1 vault in each operate call
            if (
                (actionType != Actions.ActionType.SettleVault) &&
                (actionType != Actions.ActionType.Redeem) &&
                (actionType != Actions.ActionType.Call)
            ) {
                // check if this action is manipulating the same vault as all other actions, if a vault has already been updated
                if (vaultUpdated) {
                    require(vaultOwner == action.owner, "C12");
                    require(vaultId == action.vaultId, "C13");
                }
                vaultUpdated = true;
                vaultId = action.vaultId;
                vaultOwner = action.owner;
            }

            if (actionType == Actions.ActionType.OpenVault) {
                _openVault(Actions._parseOpenVaultArgs(action));
            } else if (actionType == Actions.ActionType.DepositLongOption) {
                _depositLong(Actions._parseDepositLongArgs(action));
            } else if (actionType == Actions.ActionType.WithdrawLongOption) {
                _withdrawLong(Actions._parseWithdrawArgs(action));
            } else if (actionType == Actions.ActionType.DepositCollateral) {
                _depositCollateral(Actions._parseDepositCollateralArgs(action));
            } else if (actionType == Actions.ActionType.WithdrawCollateral) {
                _withdrawCollateral(Actions._parseWithdrawArgs(action));
            } else if (actionType == Actions.ActionType.MintShortOption) {
                _mintOtoken(Actions._parseMintArgs(action));
            } else if (actionType == Actions.ActionType.BurnShortOption) {
                _burnOtoken(Actions._parseBurnArgs(action));
            } else if (actionType == Actions.ActionType.Redeem) {
                _redeem(Actions._parseRedeemArgs(action));
            } else if (actionType == Actions.ActionType.SettleVault) {
                _settleVault(Actions._parseSettleVaultArgs(action));
            } else if (actionType == Actions.ActionType.Call) {
                _call(Actions._parseCallArgs(action));
            }
        }

        return (vaultUpdated, vaultOwner, vaultId);
    }

    /**
     * @notice verify the vault final state after executing all actions
     * @param _owner account owner address
     * @param _vaultId vault id of the final vault
     */
    function _verifyFinalState(address _owner, uint256 _vaultId) internal view {
        (MarginVault.Vault memory vault, ) = getVaultWithDetails(_owner, _vaultId);
        // TODO verfify vault.usedCollateralAmount + vault.unusedCollateralAmount = vault.collateralAmount

        require(true, "C14");
    }

    /**
     * @notice open a new vault inside an account
     * @dev only the account owner or operator can open a vault, cannot be called when system is partiallyPaused or fullyPaused
     * @param _args OpenVaultArgs structure
     */
    function _openVault(Actions.OpenVaultArgs memory _args)
        internal
        notPartiallyPaused
        onlyAuthorized(msg.sender, _args.owner)
    {
        uint256 vaultId = accountVaultCounter[_args.owner].add(1);

        require(_args.vaultId == vaultId, "C15");

        // TODO add more checks on assets of vault are the same as oToken
        require(whitelist.isWhitelistedOtoken(_args.shortOtoken), "C23");

        OtokenInterface oToken = OtokenInterface(_args.shortOtoken);

        // store new vault
        accountVaultCounter[_args.owner] = vaultId;
        vaults[_args.owner][vaultId].shortOtoken = _args.shortOtoken;
        vaults[_args.owner][vaultId].collateralAssets = oToken.getCollateralAssets();

        uint256 assetsLength = vaults[_args.owner][vaultId].collateralAssets.length;

        vaults[_args.owner][vaultId].collateralAmounts = new uint256[](assetsLength);
        vaults[_args.owner][vaultId].usedCollateralAmounts = new uint256[](assetsLength);
        vaults[_args.owner][vaultId].unusedCollateralAmounts = new uint256[](assetsLength);
        vaults[_args.owner][vaultId].reservedCollateralValues = new uint256[](assetsLength);

        emit VaultOpened(_args.owner, vaultId);
    }

    /**
     * @notice deposit a long oToken into a vault
     * @dev only the account owner or operator can deposit a long oToken, cannot be called when system is partiallyPaused or fullyPaused
     * @param _args DepositArgs structure
     */
    function _depositLong(Actions.DepositLongArgs memory _args)
        internal
        notPartiallyPaused
        onlyAuthorized(msg.sender, _args.owner)
    {
        require(_checkVaultId(_args.owner, _args.vaultId), "C35");
        // only allow vault owner or vault operator to deposit long otoken
        require((_args.from == msg.sender) || (_args.from == _args.owner), "C16");

        require(whitelist.isWhitelistedOtoken(_args.longOtoken), "C17");

        OtokenInterface otoken = OtokenInterface(_args.longOtoken);

        require(block.timestamp < otoken.expiryTimestamp(), "C18");

        vaults[_args.owner][_args.vaultId].addLong(_args.longOtoken, _args.amount);
        pool.transferToPool(_args.longOtoken, _args.from, _args.amount);

        emit LongOtokenDeposited(_args.longOtoken, _args.owner, _args.from, _args.vaultId, _args.amount);
    }

    /**
     * @notice withdraw a long oToken from a vault
     * @dev only the account owner or operator can withdraw a long oToken, cannot be called when system is partiallyPaused or fullyPaused
     * @param _args WithdrawArgs structure
     */
    function _withdrawLong(Actions.WithdrawArgs memory _args)
        internal
        notPartiallyPaused
        onlyAuthorized(msg.sender, _args.owner)
    {
        require(_checkVaultId(_args.owner, _args.vaultId), "C35");

        OtokenInterface otoken = OtokenInterface(_args.asset);

        require(block.timestamp < otoken.expiryTimestamp(), "C19");

        vaults[_args.owner][_args.vaultId].removeLong(_args.asset, _args.amount);

        pool.transferToUser(_args.asset, _args.to, _args.amount);

        emit LongOtokenWithdrawed(_args.asset, _args.owner, _args.to, _args.vaultId, _args.amount);
    }

    /**
     * @notice deposit a collateral asset into a vault
     * @dev only the account owner or operator can deposit collateral, cannot be called when system is partiallyPaused or fullyPaused
     * @param _args DepositArgs structure
     */
    function _depositCollateral(Actions.DepositCollateralArgs memory _args)
        internal
        notPartiallyPaused
        onlyAuthorized(msg.sender, _args.owner)
    {
        require(_checkVaultId(_args.owner, _args.vaultId), "C35");
        // only allow vault owner or vault operator to deposit collateral
        require((_args.from == msg.sender) || (_args.from == _args.owner), "C20");

        require(whitelist.isWhitelistedCollaterals(_args.assets), "C21");

        uint256 collateralsLength = _args.assets.length;
        // TODO use batch transfer to pool
        for (uint256 i = 0; i < collateralsLength; i++) {
            if (_args.amounts[i] > 0) {
                pool.transferToPool(_args.assets[i], _args.from, _args.amounts[i]);
                emit CollateralAssetDeposited(
                    _args.assets[i],
                    _args.owner,
                    _args.from,
                    _args.vaultId,
                    _args.amounts[i]
                );
            }
        }
        vaults[_args.owner][_args.vaultId].addCollaterals(_args.assets, _args.amounts);
    }

    /**
     * @notice withdraw a collateral asset from a vault
     * @dev only the account owner or operator can withdraw collateral, cannot be called when system is partiallyPaused or fullyPaused
     * @param _args WithdrawArgs structure
     */
    function _withdrawCollateral(Actions.WithdrawArgs memory _args)
        internal
        notPartiallyPaused
        onlyAuthorized(msg.sender, _args.owner)
    {
        require(_checkVaultId(_args.owner, _args.vaultId), "C35");

        (MarginVault.Vault memory vault, ) = getVaultWithDetails(_args.owner, _args.vaultId);

        if (vault.shortOtoken != address(0)) {
            OtokenInterface otoken = OtokenInterface(vault.shortOtoken);

            require(block.timestamp < otoken.expiryTimestamp(), "C22");
        }

        vaults[_args.owner][_args.vaultId].removeCollateral(_args.asset, _args.amount, _args.index);

        pool.transferToUser(_args.asset, _args.to, _args.amount);

        emit CollateralAssetWithdrawed(_args.asset, _args.owner, _args.to, _args.vaultId, _args.amount);
    }

    /**
     * @notice mint short oTokens from a vault which creates an obligation that is recorded in the vault
     * @dev only the account owner or operator can mint an oToken, cannot be called when system is partiallyPaused or fullyPaused
     * @param _args MintArgs structure
     */
    // TODO special arg for minting on full collateral in vault, sine its anyway strictly connected to one oToken
    function _mintOtoken(Actions.MintArgs memory _args)
        internal
        notPartiallyPaused
        onlyAuthorized(msg.sender, _args.owner)
    {
        require(_checkVaultId(_args.owner, _args.vaultId), "C35");
        require(whitelist.isWhitelistedOtoken(_args.otoken), "C23");
        require(vaults[_args.owner][_args.vaultId].shortOtoken == _args.otoken, "C41");

        OtokenInterface otoken = OtokenInterface(_args.otoken);

        require(block.timestamp < otoken.expiryTimestamp(), "C24");
        // TODO we do not support collaterizing with long oTokens, either remove long support everywhere or add ability to collaterize with long

        // collateralsValuesRequired - is value of each collateral used for minting oToken in strike asset,
        // in other words -  usedCollateralsAmounts[i] * collateralAssetPriceInStrike[i]
        console.log("getCollateralRequired");
        (
            uint256[] memory collateralsAmountsRequired,
            uint256[] memory collateralsAmountsUsed,
            uint256[] memory collateralsValuesUsed,
            uint256 usedLongAmount
        ) = calculator.getCollateralRequired(vaults[_args.owner][_args.vaultId], _args.amount);

        console.log("mintOtoken");
        otoken.mintOtoken(_args.to, _args.amount, collateralsAmountsUsed, collateralsValuesUsed);

        console.log("addShort");
        vaults[_args.owner][_args.vaultId].addShort(_args.otoken, _args.amount);
        console.log("useCollateralBulk");
        vaults[_args.owner][_args.vaultId].useCollateralBulk(
            collateralsAmountsRequired,
            usedLongAmount,
            collateralsValuesUsed
        );

        emit ShortOtokenMinted(_args.otoken, _args.owner, _args.to, _args.vaultId, _args.amount);
    }

    /**
     * @notice burn oTokens to reduce or remove the minted oToken obligation recorded in a vault
     * @dev only the account owner or operator can burn an oToken, cannot be called when system is partiallyPaused or fullyPaused
     * @param _args MintArgs structure
     */
    function _burnOtoken(Actions.BurnArgs memory _args)
        internal
        notPartiallyPaused
        onlyAuthorized(msg.sender, _args.owner)
    {
        // check that vault id is valid for this vault owner
        require(_checkVaultId(_args.owner, _args.vaultId), "C35");
        // only allow vault owner or vault operator to burn otoken
        // TODO strange vulnerability, one can burn tokens from vault owner if vault owner just minted it and didnt transfer to anyone
        require((_args.from == msg.sender) || (_args.from == _args.owner), "C25");

        OtokenInterface otoken = OtokenInterface(_args.otoken);

        // do not allow burning expired otoken
        require(block.timestamp < otoken.expiryTimestamp(), "C26");

        // burn otoken
        otoken.burnOtoken(_args.from, _args.amount);
        // Cases:
        // New short amount needs less collateral or no at all cause long amount is enough

        // remove otoken from vault
        (FPI.FixedPointInt memory collateralRatio, uint256 newUsedLongAmount) = calculator.getAfterBurnCollateralRatio(
            vaults[_args.owner][_args.vaultId],
            _args.amount
        );
        (uint256[] memory freedCollateralAmounts, uint256[] memory freedCollateralValues) = vaults[_args.owner][
            _args.vaultId
        ].removeShort(_args.otoken, _args.amount, collateralRatio, newUsedLongAmount);

        otoken.reduceCollaterization(freedCollateralAmounts, freedCollateralValues, _args.amount);

        emit ShortOtokenBurned(_args.otoken, _args.owner, _args.from, _args.vaultId, _args.amount);
    }

    /**
     * @notice redeem an oToken after expiry, receiving the payout of the oToken in the collateral asset
     * @dev cannot be called when system is fullyPaused
     * @param _args RedeemArgs structure
     */
    function _redeem(Actions.RedeemArgs memory _args) internal {
        OtokenInterface otoken = OtokenInterface(_args.otoken);

        // check that otoken to redeem is whitelisted
        require(whitelist.isWhitelistedOtoken(_args.otoken), "C27");

        (address[] memory collaterals, address underlying, address strike, uint256 expiry) = _getOtokenDetails(
            address(otoken)
        );

        // only allow redeeming expired otoken
        require(block.timestamp >= expiry, "C28");

        require(_canSettleAssets(underlying, strike, collaterals, expiry), "C29");

        // TODO redeemers payOut is just taken from MarginPool and possibly can overflow used for mint amounts
        // which is not desired behaviour. It can take some elses collateral or unused collateral
        uint256[] memory payout = calculator.getPayout(_args.otoken, _args.amount);

        otoken.burnOtoken(msg.sender, _args.amount);

        address[] memory otokenColalterals = otoken.getCollateralAssets();
        for (uint256 i = 0; i < payout.length; i++) {
            if (payout[i] > 0) {
                // TODO unwrap here for redeemers
                // TODO pool bulk transfer to user
                pool.transferToUser(otokenColalterals[i], _args.receiver, payout[i]);
            }
        }

        emit Redeem(_args.otoken, msg.sender, _args.receiver, collaterals, _args.amount, payout);
    }

    /**
     * @notice settle a vault after expiry, removing the net proceeds/collateral after both long and short oToken payouts have settled
     * @dev deletes a vault of vaultId after net proceeds/collateral is removed, cannot be called when system is fullyPaused
     * @param _args SettleVaultArgs structure
     */
    function _settleVault(Actions.SettleVaultArgs memory _args) internal onlyAuthorized(msg.sender, _args.owner) {
        require(_checkVaultId(_args.owner, _args.vaultId), "C35");

        (MarginVault.Vault memory vault, ) = getVaultWithDetails(_args.owner, _args.vaultId);

        OtokenInterface otoken;

        // new scope to avoid stack too deep error
        // check if there is short or long otoken in vault
        // do not allow settling vault that have no short or long otoken
        // if there is a long otoken, burn it
        // store otoken address outside of this scope
        {
            // TODO remove hasShort since it will be always true since now vault is linked to otoken right on open
            bool hasShort = vault.shortOtoken != address(0);
            bool hasLong = vault.longOtoken != address(0);

            require(hasShort || hasLong, "C30");

            otoken = hasShort ? OtokenInterface(vault.shortOtoken) : OtokenInterface(vault.longOtoken);

            if (hasLong) {
                OtokenInterface longOtoken = OtokenInterface(vault.longOtoken);

                longOtoken.burnOtoken(address(pool), vault.longAmount);
            }
        }

        (address[] memory collaterals, address underlying, address strike, uint256 expiry) = _getOtokenDetails(
            address(otoken)
        );

        // do not allow settling vault with un-expired otoken
        require(block.timestamp >= expiry, "C31");
        require(_canSettleAssets(underlying, strike, collaterals, expiry), "C29");

        // TODO maybe would be easy to check if payouts is array with all zeros so we can have early return without loop. Will it save gas?
        uint256[] memory payouts = calculator.getExcessCollateral(vault);

        // require that vault is valid (has excess collateral) before settling
        // to avoid allowing settling undercollateralized naked margin vault
        // TODO since we removed undercollateralized naked margin vault from the system, this check is no longer needed
        // require(isValidVault, "C32");

        delete vaults[_args.owner][_args.vaultId];

        for (uint256 i = 0; i < collaterals.length; i++) {
            if (payouts[i] != 0) {
                pool.transferToUser(collaterals[i], _args.to, payouts[i]);
            }
        }

        // TODO do something with unused longs amounts
        uint256 vaultId = _args.vaultId;
        address payoutRecipient = _args.to;

        emit VaultSettled(_args.owner, address(otoken), payoutRecipient, payouts, vaultId);
    }

    /**
     * @notice execute arbitrary calls
     * @dev cannot be called when system is partiallyPaused or fullyPaused
     * @param _args Call action
     */
    function _call(Actions.CallArgs memory _args) internal notPartiallyPaused onlyWhitelistedCallee(_args.callee) {
        CalleeInterface(_args.callee).callFunction(payable(msg.sender), _args.data);

        emit CallExecuted(msg.sender, _args.callee, _args.data);
    }

    /**
     * @notice check if a vault id is valid for a given account owner address
     * @param _accountOwner account owner address
     * @param _vaultId vault id to check
     * @return True if the _vaultId is valid, False if not
     */
    function _checkVaultId(address _accountOwner, uint256 _vaultId) internal view returns (bool) {
        return ((_vaultId > 0) && (_vaultId <= accountVaultCounter[_accountOwner]));
    }

    /**
     * @notice return if a callee address is whitelisted or not
     * @param _callee callee address
     * @return True if callee address is whitelisted, False if not
     */
    // function _isCalleeWhitelisted(address _callee) internal view returns (bool) {
    //     return whitelist.isWhitelistedCallee(_callee);
    // }

    /**
     * @dev get otoken detail, from both otoken versions
     */
    function _getOtokenDetails(address _otoken)
        internal
        view
        returns (
            address[] memory,
            address,
            address,
            uint256
        )
    {
        OtokenInterface otoken = OtokenInterface(_otoken);
        (address[] memory collaterals, , , address underlying, address strike, , uint256 expiry, , ) = otoken
            .getOtokenDetails();
        return (collaterals, underlying, strike, expiry);
    }

    /**
     * @dev return if an expired oToken is ready to be settled, only true when price for underlying,
     * strike and collateral assets at this specific expiry is available in our Oracle module
     * @return True if the oToken has expired AND all oracle prices at the expiry timestamp have been finalized, False if not
     */
    function _canSettleAssets(
        address _underlying,
        address _strike,
        address[] memory _collaterals,
        uint256 _expiry
    ) internal view returns (bool) {
        bool canSettle = true;
        for (uint256 i = 0; i < _collaterals.length; i++) {
            canSettle = canSettle && oracle.isDisputePeriodOver(_collaterals[i], _expiry);
            // TODO early return if canSettle false?
        }
        return
            canSettle &&
            oracle.isDisputePeriodOver(_underlying, _expiry) &&
            oracle.isDisputePeriodOver(_strike, _expiry);
    }

    /**
     * @dev updates the internal configuration of the controller
     */
    function _refreshConfigInternal() internal {
        whitelist = WhitelistInterface(addressbook.getWhitelist());
        oracle = OracleInterface(addressbook.getOracle());
        calculator = MarginCalculatorInterface(addressbook.getMarginCalculator());
        pool = MarginPoolInterface(addressbook.getMarginPool());
    }
}
