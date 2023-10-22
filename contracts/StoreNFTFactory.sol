// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StoreNFT.sol";

contract StoreNFTFactory {
    event StoreNFTCreated(address indexed creator, string name, address storeNFT);

    function createStoreNFT(
        string memory _name,
        address _owner,
        address _perksVault,
        string memory _baseURI
    ) public returns (StoreNFT) {
        StoreNFT storeNFT = new StoreNFT(_name, _owner, _perksVault, _baseURI);
        emit StoreNFTCreated(msg.sender, _name, address(storeNFT));
        return storeNFT;
    }
}
