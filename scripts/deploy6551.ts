import hardhat,  { ethers } from "hardhat";

const CHAIN_ID = 80001

async function main() {
    const [admin, nftOwner1] = await ethers.getSigners()
    let tx
    // console.log(admin.address)
    // console.log(nftOwner1.address) // 0xA0066f1949636FB62f6cEC693Eec4A5C3531d791

    // const perksNFT = await ethers.deployContract("PerksNFT", []);
    // console.log('perksNFT', perksNFT.address)

    // const apeCoinNFT = await ethers.deployContract("ApeCoinNFT", []);
    // console.log('apeCoinNFT', apeCoinNFT.address)

    // const tacoBellNFT = await ethers.deployContract("TacoBellNFT", []);
    // console.log('tacoBellNFT', tacoBellNFT.address)

    // const registry = await ethers.deployContract("ERC6551Registry", []);
    // console.log('registry', registry.address)

    // const accountImpl = await ethers.deployContract("ERC6551Account", []);
    // console.log('accountImpl', accountImpl.address)

    const perksNFT = await ethers.getContractAt("PerksNFT", "0xcFeB5760c665F5c1Ac1f7238c97d374b9d4b693D")

    // tx = await perksNFT.safeMint(nftOwner1.address)
    // console.log({tx})

    // const registry = await ethers.getContractAt("ERC6551Registry", "0x832Ad1b36D453076871eFe023FD2Cfff8068b965")
    // const accountImpl = await ethers.getContractAt("ERC6551Account", "0x1C134DB62104fd143294bb3411261b2aFf297145")

    // const tbaAddr = await registry.account(accountImpl.address, CHAIN_ID, perksNFT.address, 1, 0)
    // console.log({tbaAddr})

    // tx = await registry.createAccount(accountImpl.address, CHAIN_ID, perksNFT.address, 1, 0, [])
    // console.log({tx})

    // const apeCoinNFT = await ethers.getContractAt("ApeCoinNFT", "0x2f0Bb138F07df53A2D6cA1C4894E639Ec37E5f05")

    // tx = await apeCoinNFT.safeMint("0xdb7360A1Bcb79EB3F33ecB50d82838c528E424e9")
    // console.log({tx})

    const tacoBellNFT = await ethers.getContractAt("TacoBellNFT", "0x194f589Cb8D28AaB2190d22876de4f0e1B0178e0")

    tx = await tacoBellNFT.safeMint("0xdb7360A1Bcb79EB3F33ecB50d82838c528E424e9")
    console.log({tx})

    // const registry = await ethers.deployContract("ERC6551Registry", []);
    // console.log('registry', registry.address)

    // const accountImpl = await ethers.deployContract("ERC6551Account", []);
    // console.log('accountImpl', accountImpl.address)

    // return
    // const registry = await ethers.getContractAt("ERC6551Registry", "0xaD6CD743a19EE2f7F6D43d9b7E7eA398f05BCD15")
    // const accountImpl = await ethers.getContractAt("ERC6551Account", "0x070b65b46Ae3E1Ed71fcCE77223689E8e22384F0")

    // const tbaAddr = await registry.account(accountImpl.address, CHAIN_ID, perksNFT.address, 1, 0)
    // console.log({tbaAddr})

    // tx = await registry.createAccount(accountImpl.address, CHAIN_ID, perksNFT.address, 1, 0, [])
    // console.log({tx})

    // const tba1 = await ethers.getContractAt("ERC6551Account", "0xdb7360A1Bcb79EB3F33ecB50d82838c528E424e9")
    // // console.log({tba1})

    // const owner = await tba1.owner()
    // console.log({owner})
    // const token = await tba1.token()
    // console.log({token})

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



// -------------------------------
// mumbai
// perksNFT 0xcFeB5760c665F5c1Ac1f7238c97d374b9d4b693D
// apeCoinNFT 0x2f0Bb138F07df53A2D6cA1C4894E639Ec37E5f05
// tacoBellNFT 0x194f589Cb8D28AaB2190d22876de4f0e1B0178e0
// registry 0xaD6CD743a19EE2f7F6D43d9b7E7eA398f05BCD15
// accountImpl 0x070b65b46Ae3E1Ed71fcCE77223689E8e22384F0
// { tbaAddr: '0xdb7360A1Bcb79EB3F33ecB50d82838c528E424e9' }