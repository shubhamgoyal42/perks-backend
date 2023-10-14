import hardhat,  { ethers } from "hardhat";

async function main() {
    const [admin, nftOwner1] = await ethers.getSigners()
    let tx
    // console.log(admin.address)
    // console.log(nftOwner1.address)

    // const perksNFT = await ethers.deployContract("PerksNFT", []);
    // console.log(perksNFT.address)

    const perksNFT = await ethers.getContractAt("PerksNFT", "0x8c1a55B3c6629716571234A1935ad2F593853066")

    // const tx = await perksNFT.safeMint(nftOwner1.address, 1)
    // console.log(tx)

    // const registry = await ethers.deployContract("ERC6551Registry", []);
    // console.log(registry.address)

    // const accountImpl = await ethers.deployContract("ERC6551Account", []);
    // console.log(accountImpl.address)

    const registry = await ethers.getContractAt("ERC6551Registry", "0x5911C7265d0f16964821D58879e34Cdc7e47Ae7F")
    const accountImpl = await ethers.getContractAt("ERC6551Account", "0x6C236B327Fa1eaE7808dB029DdF69de19fAB5EfD")

    // const tbaAddr = await registry.account(accountImpl.address, 11155111, perksNFT.address, 1, 0)
    // console.log({tbaAddr})

    // tx = await registry.createAccount(accountImpl.address, 11155111, perksNFT.address, 1, 0, [])
    // console.log({tx})

    const tba1 = await ethers.getContractAt("ERC6551Account", "0x4Ef36E88D565E750Da610590F5466F06b3Cb6A49")
    // console.log({tba1})

    const owner = await tba1.owner()
    console.log({owner})
    const token = await tba1.token()
    console.log({token})

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// ----------- SEPOLIA -------------
// NFT contract
// 0x8c1a55B3c6629716571234A1935ad2F593853066

// NFT id 1
// 0xE671902678F3F1Cd0320EAd6182C8b0D7c04e045
// pk f2b0d0d488b324545d32b0a82e6a0097fffa6c7e0cc794d1e8ad515f5331a1fc

// ERC6551Registry
// 0x5911C7265d0f16964821D58879e34Cdc7e47Ae7F

// ERC6551Account
// 0x6C236B327Fa1eaE7808dB029DdF69de19fAB5EfD

// precomputed tba address
// 0x4Ef36E88D565E750Da610590F5466F06b3Cb6A49
