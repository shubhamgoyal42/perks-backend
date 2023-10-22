// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PerksNFT is ERC721, Ownable {
    uint256 public latestMintedTokenId;
    mapping(address => uint256) public tokens;

    constructor() ERC721("PerksNFT", "NFT") Ownable(msg.sender) {
        latestMintedTokenId = 0;
    }

    function safeMint(address to) public onlyOwner {
        require(balanceOf(to) == 0, "ERR_already_minted");
        latestMintedTokenId = latestMintedTokenId + 1;
        _safeMint(to, latestMintedTokenId);
        tokens[to] = latestMintedTokenId;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireOwned(tokenId);

        return "https://ipfs.io/ipfs/QmPkAPqDXCWbq4z7uG1PQmK1ztdZG4fvXevtiWPrzt4vs4/perks_nft.png";
    }
}
