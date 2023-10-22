// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {PerksVault} from "./PerksVault.sol";

contract StoreNFT is ERC721, Ownable {
    uint256 public latestMintedTokenId;
    PerksVault public perksVault;
    string public baseURI;

    constructor(
        string memory _name,
        address _owner,
        address _perksVault,
        string memory _baseURI
    ) ERC721(_name, "NFT") Ownable(_owner) {
        latestMintedTokenId = 0;
        perksVault = PerksVault(_perksVault);
        baseURI = _baseURI;
    }

    function safeMint(address to) public {
        require(msg.sender == address(perksVault), "ERR_only_vault");
        require(balanceOf(to) == 0, "ERR_already_minted");

        latestMintedTokenId = latestMintedTokenId + 1;
        _safeMint(to, latestMintedTokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireOwned(tokenId);

        return baseURI;
    }
}
