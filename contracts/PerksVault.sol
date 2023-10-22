// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import {PoolId} from "@uniswap/v4-core/contracts/types/PoolId.sol";
import {PoolKey} from "@uniswap/v4-core/contracts/types/PoolKey.sol";
import {PerksToken} from "./PerksToken.sol";
import {PerksNFT} from "./PerksNFT.sol";
import {ERC6551Registry} from "./ERC6551Registry.sol";
import {ERC6551Account} from "./ERC6551Account.sol";
import {IStoreNFT} from "./interfaces/IStoreNFT.sol";


contract PerksVault is Ownable {
    IERC20 public usdc;
    PerksToken public perksToken;

    PerksNFT public perksNFT;
    ERC6551Registry public erc6551Registry;
    ERC6551Account public erc6551Account;

    mapping(address => address) public storeNFTs; // mapping of store to their NFT
    mapping(address => address) public tba; // mapping of user to their TBA
    mapping(address => uint256) public userUSDCAmount;
    mapping(address => uint256) public storeUsdcAmount;
    mapping(address => bool) public whitelistedStores;
    mapping(address => uint256) public rewardFraction; // base 10e6

    uint256[50] private __gap;

    event StoreAdded(address indexed store, address storeNFT, uint256 rewardFraction, int256 latitude, int256 longitude);
    event StoreRemoved(address indexed store);
    event USDCDeposited(address indexed user, uint256 amount);
    event PaidToStore(address indexed store, address indexed user, uint256 amount);

    event PerksEarned(address indexed user, uint256 amount);
    event PerksRedeemed(address indexed user, uint256 amount);

    constructor(
        address _perksToken,
        address _usdc,
        address _perksNFT,
        address _erc6551Registry,
        address payable _erc6551Account
    ) Ownable(msg.sender) {
        perksToken = PerksToken(_perksToken);
        usdc = IERC20(_usdc);
        perksNFT = PerksNFT(_perksNFT);
        erc6551Registry = ERC6551Registry(_erc6551Registry);
        erc6551Account = ERC6551Account(_erc6551Account);
    }

    modifier onlyPerksNFT() {
        require(perksNFT.balanceOf(msg.sender) > 0);
        _;
    }

    function whitelisteStore(address store, address _storeNFT, uint256 _rewardFraction, int256 latitude, int256 longitude) external onlyOwner {
        whitelistedStores[store] = true;
        rewardFraction[store] = _rewardFraction;
        storeNFTs[store] = _storeNFT;

        emit StoreAdded(store, _storeNFT, _rewardFraction, latitude, longitude);
    }

    function deleteStore(address store) external onlyOwner {
        whitelistedStores[store] = false;

        emit StoreRemoved(store);
    }

    function depositUSDC(uint256 amount) external onlyPerksNFT {
        //compute TBA
        if (tba[msg.sender] == address(0)) {
            uint256 tokenId = perksNFT.tokens(msg.sender);
            tba[msg.sender] = erc6551Registry.account(address(erc6551Account), block.chainid, address(perksNFT), tokenId, 0);
        }
        usdc.transferFrom(msg.sender, address(this), amount);

        userUSDCAmount[msg.sender] += amount;

        // @todo: swap this USDC with sDAI to earn interest :)

        emit USDCDeposited(msg.sender, amount);
    }

    function payToStore(address store, uint256 usdcAmount) external onlyPerksNFT {
        require(whitelistedStores[store], "Store is not whitelisted");
        require(usdcAmount <= userUSDCAmount[msg.sender], "Insufficient USDC balance");

        // mint store nft if not minted
        IStoreNFT storeNFT = IStoreNFT(storeNFTs[store]);
        if (storeNFT.balanceOf(tba[msg.sender]) == 0) {
            storeNFT.safeMint(tba[msg.sender]);
        }
        storeUsdcAmount[store] += usdcAmount;
        userUSDCAmount[msg.sender] -= usdcAmount;

        uint256 perksTokenAmount = usdcAmount * rewardFraction[store] / 1e6;
        perksToken.transferFrom(store, tba[msg.sender], perksTokenAmount);

        emit PaidToStore(store, msg.sender, usdcAmount);
        emit PerksEarned(msg.sender, perksTokenAmount);
    }

    function redeemPerksTokens(uint256 perksAmount, address store) external onlyPerksNFT {
        require(whitelistedStores[store], "Store is not whitelisted");

        perksToken.transferFrom(tba[msg.sender], store, perksAmount);

        emit PerksRedeemed(msg.sender, perksAmount);
    }
}
