// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDC is ERC20, Ownable {
    uint256[50] private __gap;

    constructor () ERC20('PerksToken', 'PRKS') Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());  // 1M
    }

    function mint(address account, uint256 value) external onlyOwner {
        _mint(account, value);
    }
}
