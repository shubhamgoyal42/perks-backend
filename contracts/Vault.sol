// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import {PoolId} from "@uniswap/v4-core/contracts/types/PoolId.sol";
import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolKey.sol";
import {PerksToken} from "./PerksToken.sol";

contract PerksVault is Ownable {
    IERC20 public USDC;
    IPoolManager public uniswapPoolManager;
    PerksToken public perksToken;
    PoolKey public uniswapPoolKey;

    mapping(address => uint256) public userUSDCAmount;
    mapping(address => uint256) public storeUsdcAmount;
    mapping(address => bool) public whitelistedStores; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! ask CHATGT how to get getAllStores? !!!!!!!!!!!!!!!!!!!!!!!!!!
    mapping(address => uint256) public rewardFraction; // base 10e6

    mapping(address => uint256) public lastTxTime;
    mapping(address => uint256) public lastBurnTime;

    uint256[50] private __gap;

    event StoreAdded(address indexed store, uint256 rewardFraction);
    event StoreRemoved(address indexed store);
    event USDCDeposited(address indexed user, uint256 amount);
    event PaidToStore(address indexed store, address indexed user, uint256 amount);

    event PerksEarned(address indexed user, uint256 amount);
    event PerksRedeemed(address indexed user, uint256 amount);
    event PerksBurnt(address indexed user, uint256 amount);

    constructor(
        address _uniswapPoolManager,
        address _perksToken
    ) Ownable(msg.sender) {
        uniswapPoolManager = IPoolManager(_uniswapPoolManager);
        perksToken = PerksToken(_perksToken);
    }

    function whitelisteStore(address store, uint256 _rewardFraction) external onlyOwner {
        whitelistedStores[store] = true;
        rewardFraction[store] = _rewardFraction;

        emit StoreAdded(store, _rewardFraction);
    }

    function deleteStore(address store) external onlyOwner {
        whitelistedStores[store] = false;

        emit StoreRemoved(store);
    }

    function setUniswapPoolId(PoolKey calldata poolKey) external onlyOwner {
        uniswapPoolKey = poolKey;
    }

    function depositUSDC(uint256 amount) external {
        USDC.transferFrom(msg.sender, address(this), amount);

        // Swap USDC for sDAI using Uniswap
        USDC.approve(address(uniswapPoolManager), amount);
        // @todo
        // uniswapPoolManager.swapExactTokensForTokens(amount, 0, path, address(this), block.timestamp + 15 minutes);
        IPoolManager.SwapParams memory swapParams = IPoolManager.SwapParams({
            zeroForOne: true,
            amountSpecified: int256(amount),
            sqrtPriceLimitX96: 0});
        // IPoolManager.SwapParams
        uniswapPoolManager.swap(uniswapPoolKey, swapParams, bytes(''));

        userUSDCAmount[msg.sender] += amount;

        emit USDCDeposited(msg.sender, amount);
    }

    function payToStore(address store, uint256 usdcAmount) external {
        require(whitelistedStores[store], "Store is not whitelisted");
        require(usdcAmount <= userUSDCAmount[msg.sender], "Insufficient USDC balance");

        storeUsdcAmount[store] += usdcAmount;
        userUSDCAmount[msg.sender] -= usdcAmount;

        lastTxTime[msg.sender] = block.timestamp;

        uint256 perksTokenAmount = usdcAmount * rewardFraction[store] / 10e6;
        perksToken.transferFrom(store, msg.sender, perksTokenAmount);

        emit PaidToStore(store, msg.sender, usdcAmount);
        emit PerksEarned(msg.sender, perksTokenAmount);
    }

    function redeemPerksTokens(uint256 perksAmount, address store) external {
        require(whitelistedStores[store], "Store is not whitelisted");

        if(block.timestamp - lastTxTime[msg.sender] > 90 days) {
            // Burn the perks tokens if last transaction time > 90 days
            burnPerksTokens(msg.sender);
        }

        perksToken.transferFrom(msg.sender, store, perksAmount);

        emit PerksRedeemed(msg.sender, perksAmount);
    }

    function burnPerksTokens(address user) public {
        uint256 amountToBurn = (perksToken.balanceOf(user) * 2) / 10; // 20% of the perks amount
        _burnPerksToken(user, amountToBurn);
    }

    function _burnPerksToken(address user, uint256 perksAmount) internal {
        // Burn the perks tokens if last transaction time > 90 days
        require(lastBurnTime[user] < block.timestamp - 90 days, "Can burn only after 90 days");
        if(block.timestamp - lastTxTime[msg.sender] > 90 days) {
            // Burn the perks tokens if last transaction time > 90 days
            perksToken.burn(user, perksAmount);
            emit PerksBurnt(user, perksAmount);
        }
    }
}
