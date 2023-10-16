// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {PerksToken} from "./PerksToken.sol";

contract Vault is Ownable {
    IERC20 public USDC;
    IERC20 public sDAI;
    IUniswapV2Router02 public uniswapRouter;
    PerksToken public xpToken;

    mapping(address => uint256) public usdcAmount;
    mapping(address => uint256) public storeUsdcAmount;
    mapping(address => bool) public whitelistedStores;
    mapping(address => uint256) public lastTxTime;

    constructor(
        address _usdc,
        address _sDAI, // 0xD8134205b0328F5676aaeFb3B2a0DC15f4029d8C
        address _uniswapRouter,
        address _xpToken
    ) Ownable(msg.sender) {
        USDC = IERC20(_usdc);
        sDAI = IERC20(_sDAI);
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
        xpToken = PerksToken(_xpToken);
    }

    function setWhitelistedStore(address store, bool status) external onlyOwner {
        whitelistedStores[store] = status;
    }

    function depositUSDC(uint256 amount) external {
        USDC.transferFrom(msg.sender, address(this), amount);

        // Swap USDC for sDAI using Uniswap
        USDC.approve(address(uniswapRouter), amount);
        address[] memory path = new address[](2);
        path[0] = address(USDC);
        path[1] = address(sDAI);
        uniswapRouter.swapExactTokensForTokens(amount, 0, path, address(this), block.timestamp + 15 minutes);

        usdcAmount[msg.sender] += amount;
    }

    function payToStore(address store, uint256 usdcAmount) external {
        require(whitelistedStores[store], "Store is not whitelisted");
        require(usdcAmount <= usdcAmount[msg.sender], "Insufficient USDC balance");

        storeUsdcAmount[store] += usdcAmount;
        usdcAmount[msg.sender] -= usdcAmount;

        lastTxTime[msg.sender] = block.timestamp;
    }

    function redeemXPTokens(uint256 xpAmount, address store) external {
        require(whitelistedStores[store], "Store is not whitelisted");

        if(block.timestamp - lastTxTime[msg.sender] > 180 days) {
            // Burn the XP tokens if last transaction time > 180 days
            // xpToken.burn function should be implemented in the XP token contract
            xpToken.burn(msg.sender, xpAmount);
        } else {
            // Transfer XP tokens back to the store if last transaction time < 180 days
            xpToken.transferFrom(msg.sender, store, xpAmount);
        }
    }

    function burnXPTokens(address user, uint256 xpAmount) external {
        _burnXPToken(user, xpAmount);
    }

    function _burnXPToken(address user, uint256 xpAmount) internal {
        // Burn the XP tokens if last transaction time > 180 days
        // xpToken.burn function should be implemented in the XP token contract
        if(block.timestamp - lastTxTime[msg.sender] > 180 days) {
            // Burn the XP tokens if last transaction time > 180 days
            // xpToken.burn function should be implemented in the XP token contract
            xpToken._burn(account, value);(user, xpAmount);
        }
    }

    function storeWithdrawXPTokens(uint256 amount) external {
        require(whitelistedStores[msg.sender], "Only whitelisted store can withdraw");
        
        // Transfer XP tokens from the contract to the store
        xpToken.transfer(msg.sender, amount);
    }
}
