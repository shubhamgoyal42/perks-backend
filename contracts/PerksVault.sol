// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import {PoolId} from "@uniswap/v4-core/contracts/types/PoolId.sol";
import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolKey.sol";
import {PerksToken} from "./PerksToken.sol";

contract PerksVault is Ownable {
    IERC20 public usdc;
    PerksToken public perksToken;

    mapping(address => uint256) public userUSDCAmount;
    mapping(address => uint256) public storeUsdcAmount;
    mapping(address => bool) public whitelistedStores;
    mapping(address => uint256) public rewardFraction; // base 10e6

    uint256[50] private __gap;

    event StoreAdded(address indexed store, uint256 rewardFraction, int256 latitude, int256 longitude);
    event StoreRemoved(address indexed store);
    event USDCDeposited(address indexed user, uint256 amount);
    event PaidToStore(address indexed store, address indexed user, uint256 amount);

    event PerksEarned(address indexed user, uint256 amount);
    event PerksRedeemed(address indexed user, uint256 amount);

    constructor(
        address _perksToken,
        address _usdc
    ) Ownable(msg.sender) {
        perksToken = PerksToken(_perksToken);
        usdc = IERC20(_usdc);
    }

    function whitelisteStore(address store, uint256 _rewardFraction, int256 latitude, int256 longitude) external onlyOwner {
        whitelistedStores[store] = true;
        rewardFraction[store] = _rewardFraction;

        emit StoreAdded(store, _rewardFraction, latitude, longitude);
    }

    function deleteStore(address store) external onlyOwner {
        whitelistedStores[store] = false;

        emit StoreRemoved(store);
    }

    function depositUSDC(uint256 amount) external {
        usdc.transferFrom(msg.sender, address(this), amount);

        userUSDCAmount[msg.sender] += amount;

        emit USDCDeposited(msg.sender, amount);
    }

    function payToStore(address store, uint256 usdcAmount) external {
        require(whitelistedStores[store], "Store is not whitelisted");
        require(usdcAmount <= userUSDCAmount[msg.sender], "Insufficient USDC balance");

        storeUsdcAmount[store] += usdcAmount;
        userUSDCAmount[msg.sender] -= usdcAmount;

        uint256 perksTokenAmount = usdcAmount * rewardFraction[store] / 10e6;
        perksToken.transferFrom(store, msg.sender, perksTokenAmount);

        emit PaidToStore(store, msg.sender, usdcAmount);
        emit PerksEarned(msg.sender, perksTokenAmount);
    }

    function redeemPerksTokens(uint256 perksAmount, address store) external {
        require(whitelistedStores[store], "Store is not whitelisted");

        perksToken.transferFrom(msg.sender, store, perksAmount);

        emit PerksRedeemed(msg.sender, perksAmount);
    }
}
