// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import {ERC20Upgradeable} from "../packages/oz/upgradeability/ERC20Upgradeable.sol";

contract MockCToken is ERC20Upgradeable {
    uint256 public exchangeRateStored;

    constructor(string memory _name, string memory _symbol) {
        __ERC20_init_unchained(_name, _symbol);
        _setupDecimals(8);
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function setExchangeRate(uint256 _exchangeRateStored) external {
        exchangeRateStored = _exchangeRateStored;
    }
}
