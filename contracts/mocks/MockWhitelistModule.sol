// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import {WhitelistInterface} from "../interfaces/WhitelistInterface.sol";

contract MockWhitelistModule is WhitelistInterface {
    mapping(address => bool) public whitelistedOtoken;
    mapping(bytes32 => bool) private whitelistedProduct;
    mapping(bytes32 => bool) internal whitelistedCollaterals;
    mapping(address => bool) private whitelistedCallee;

    address public addressBook;

    function blacklistCollateral(address[] calldata _collaterals) external {
        whitelistedCollaterals[keccak256(abi.encode(_collaterals))] = false;
    }

    function blacklistOtoken(address _otokenAddress) external {
        whitelistedOtoken[_otokenAddress] = false;
    }

    function blacklistProduct(
        address _underlying,
        address _strike,
        address[] calldata _collaterals,
        bool _isPut
    ) external {
        bytes32 productHash = keccak256(abi.encode(_underlying, _strike, _collaterals, _isPut));
        whitelistedProduct[productHash] = false;
    }

    function whitelistProduct(
        address _underlying,
        address _strike,
        address[] calldata _collaterals,
        bool _isPut
    ) external {
        require(
            whitelistedCollaterals[keccak256(abi.encode(_collaterals))],
            "Whitelist: Collateral is not whitelisted"
        );

        bytes32 productHash = keccak256(abi.encode(_underlying, _strike, _collaterals, _isPut));

        whitelistedProduct[productHash] = true;
    }


    function isWhitelistedProduct(
        address _underlying,
        address _strike,
        address[] calldata _collateral,
        bool _isPut
    ) external view returns (bool) {
        bytes32 productHash = keccak256(abi.encode(_underlying, _strike, _collateral, _isPut));
        return whitelistedProduct[productHash];
    }

    function whitelistOtoken(address _otoken) external {
        whitelistedOtoken[_otoken] = true;
    }

    function isWhitelistedOtoken(address _otoken) external view returns (bool) {
        return whitelistedOtoken[_otoken];
    }

    function isWhitelistedCollaterals(address[] memory _collaterals) external view returns (bool) {
        return whitelistedCollaterals[keccak256(abi.encode(_collaterals))];
    }

    function whitelistCollaterals(address[] calldata _collaterals) external {
        whitelistedCollaterals[keccak256(abi.encode(_collaterals))] = true;
    }

    function isWhitelistedCallee(address _callee) external view returns (bool) {
        return whitelistedCallee[_callee];
    }

    function whitelistCallee(address _callee) external {
        whitelistedCallee[_callee] = true;
    }

    function blacklistCallee(address _callee) external {
        whitelistedCallee[_callee] = false;
    }
}
