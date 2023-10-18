import hardhat,  { ethers } from "hardhat";

const CHAIN_ID = 80001

async function main() {
    const [admin, nftOwner1] = await ethers.getSigners()
    let tx
    // console.log(admin.address)
    // console.log(nftOwner1.address)

    const perksNFT = await ethers.deployContract("PerksNFT", []);
    console.log('perksNFT', perksNFT.address)

    // const perksNFT = await ethers.getContractAt("PerksNFT", "0x8c1a55B3c6629716571234A1935ad2F593853066")

    tx = await perksNFT.safeMint(nftOwner1.address, 1)
    console.log({tx})

    const registry = await ethers.deployContract("ERC6551Registry", []);
    console.log('registry', registry.address)

    const accountImpl = await ethers.deployContract("ERC6551Account", []);
    console.log('accountImpl', accountImpl.address)

    // return
    // const registry = await ethers.getContractAt("ERC6551Registry", "0x5911C7265d0f16964821D58879e34Cdc7e47Ae7F")
    // const accountImpl = await ethers.getContractAt("ERC6551Account", "0x6C236B327Fa1eaE7808dB029DdF69de19fAB5EfD")

    const tbaAddr = await registry.account(accountImpl.address, CHAIN_ID, perksNFT.address, 1, 0)
    console.log({tbaAddr})

    tx = await registry.createAccount(accountImpl.address, CHAIN_ID, perksNFT.address, 1, 0, [])
    console.log({tx})

    const tba1 = await ethers.getContractAt("ERC6551Account", "0x7704191Ec4053b97a582e6AbD4501c4dC8f79AC7")
    // console.log({tba1})

    const owner = await tba1.owner()
    console.log({owner})
    const token = await tba1.token()
    console.log({token})

}

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


// ----------- MUMBAI -------------
// NFT contract
// 0x5911C7265d0f16964821D58879e34Cdc7e47Ae7F

// NFT id 1
// 0xE671902678F3F1Cd0320EAd6182C8b0D7c04e045
// pk f2b0d0d488b324545d32b0a82e6a0097fffa6c7e0cc794d1e8ad515f5331a1fc

// ERC6551Registry
// 0xE9a87278D42a08c37042624b920c129AF2f2C549

// ERC6551Account
// 0x14D736f560d62EB52f340e1616A32eFf9150b9a2

// precomputed tba address
// 0x7704191Ec4053b97a582e6AbD4501c4dC8f79AC7
