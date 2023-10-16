// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import {PerksToken} from "./PerksToken.sol";

contract PerksVault is Ownable {
    IERC20 public USDC;
    IERC20 public sDAI;
    IPoolManager public uniswapPoolManager;
    PerksToken public xpToken;

    mapping(address => uint256) public userUSDCAmount;
    mapping(address => uint256) public storeUsdcAmount;
    mapping(address => bool) public whitelistedStores;
    mapping(address => uint256) public rewardFraction; // base 10e6

    mapping(address => uint256) public lastTxTime;
    mapping(address => uint256) public lastBurnTime;

    constructor(
        address _usdc,
        address _sDAI, // 0xD8134205b0328F5676aaeFb3B2a0DC15f4029d8C
        address _uniswapPoolManager,
        address _xpToken
    ) Ownable(msg.sender) {
        USDC = IERC20(_usdc);
        sDAI = IERC20(_sDAI);
        uniswapPoolManager = IPoolManager(_uniswapPoolManager);
        xpToken = PerksToken(_xpToken);
    }

    function setWhitelistedStore(address store, bool status) external onlyOwner {
        whitelistedStores[store] = status;
    }

    function depositUSDC(uint256 amount) external {
        USDC.transferFrom(msg.sender, address(this), amount);

        // Swap USDC for sDAI using Uniswap
        USDC.approve(address(uniswapPoolManager), amount);
        address[] memory path = new address[](2);
        path[0] = address(USDC);
        path[1] = address(sDAI);
        uniswapPoolManager.swapExactTokensForTokens(amount, 0, path, address(this), block.timestamp + 15 minutes);

        userUSDCAmount[msg.sender] += amount;
    }

    function payToStore(address store, uint256 usdcAmount) external {
        require(whitelistedStores[store], "Store is not whitelisted");
        require(usdcAmount <= userUSDCAmount[msg.sender], "Insufficient USDC balance");

        storeUsdcAmount[store] += usdcAmount;
        userUSDCAmount[msg.sender] -= usdcAmount;

        lastTxTime[msg.sender] = block.timestamp;

        perksTokenAmount = usdcAmount * rewardFraction[store] / 10e6;
        xpToken.transferFrom(store, msg.sender, perksTokenAmount);
    }

    function redeemXPTokens(uint256 xpAmount, address store) external {
        require(whitelistedStores[store], "Store is not whitelisted");

        if(block.timestamp - lastTxTime[msg.sender] > 90 days) {
            // Burn the XP tokens if last transaction time > 90 days
            // xpToken.burn function should be implemented in the XP token contract
            burnXPTokens(msg.sender);
        }

        xpToken.transferFrom(msg.sender, store, xpAmount);
    }

    function burnXPTokens(address user) public {
        amountToBurn = (xpToken.balanceOf(user) * 2) / 10; // 20% of the perks amount
        _burnXPToken(user, amountToBurn);
    }

    function _burnXPToken(address user, uint256 xpAmount) internal {
        // Burn the XP tokens if last transaction time > 90 days
        // xpToken.burn function should be implemented in the XP token contract
        require(lastBurnTime[user] < block.timestamp - 90 days, "Can burn only after 90 days");
        if(block.timestamp - lastTxTime[msg.sender] > 90 days) {
            // Burn the XP tokens if last transaction time > 90 days
            // xpToken.burn function should be implemented in the XP token contract
            xpToken._burn(account, value);(user, xpAmount);
        }
    }
}
