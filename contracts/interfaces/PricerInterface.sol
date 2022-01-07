// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

interface PricerInterface {
    function getPrice() external view returns (uint256);

    function getHistoricalPrice(uint80 _roundId) external view returns (uint256, uint256);
}
