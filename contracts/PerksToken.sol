// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PerksToken is ERC20, Ownable {
    address public vault;

    uint256[50] private __gap;

    constructor () ERC20('PerksToken', 'PRKS') Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function setVault(address _vault) external onlyOwner {
        vault = _vault;
    }

    function mint(address account, uint256 value) external onlyOwner {
        _mint(account, value);
    }

    function burn(address account, uint256 value) external  {
        require(msg.sender == vault, "Only vault can burn");
        _burn(account, value);
    }
}
