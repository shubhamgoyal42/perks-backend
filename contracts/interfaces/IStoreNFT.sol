// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IStoreNFT is IERC721 {
    function latestMintedTokenId() external view returns (uint256);
    function perksVault() external view returns (address);
    function baseURI() external view returns (string memory);
    function safeMint(address to) external;
    function tokenURI(uint256 tokenId) external view returns (string memory);
}
