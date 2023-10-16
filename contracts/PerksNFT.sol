// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PerksNFT is ERC721, Ownable {
    constructor() ERC721("PerksNFT", "NFT") Ownable(msg.sender) {}

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        require(balanceOf(to) == 0, "ERR_already_minted");
        _safeMint(to, tokenId);
    }
}
